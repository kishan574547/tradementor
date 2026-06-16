import OpenAI from 'openai';
import type { TechnicalAnalysis } from './indicators.js';
import type { StockQuote } from './marketData.js';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export interface AIRecommendation {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  summary: string;
  risks: string[];
  targets: { support: number; resistance: number };
}

export async function getAIRecommendation(
  quote: StockQuote,
  analysis: TechnicalAnalysis
): Promise<AIRecommendation> {
  const fallback = buildRuleBasedRecommendation(quote, analysis);

  if (!openai) return fallback;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are TradeMentor AI, a professional trading assistant. Respond ONLY with valid JSON matching: { action, confidence, summary, risks, targets: { support, resistance } }',
        },
        {
          role: 'user',
          content: JSON.stringify({ quote, analysis }),
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        symbol: quote.symbol,
        action: parsed.action ?? analysis.signal,
        confidence: parsed.confidence ?? analysis.strength,
        summary: parsed.summary ?? fallback.summary,
        risks: parsed.risks ?? fallback.risks,
        targets: parsed.targets ?? fallback.targets,
      };
    }
  } catch {
    /* use fallback */
  }

  return fallback;
}

function buildRuleBasedRecommendation(
  quote: StockQuote,
  analysis: TechnicalAnalysis
): AIRecommendation {
  const support = Number((quote.price * 0.95).toFixed(2));
  const resistance = Number((quote.price * 1.05).toFixed(2));
  const risks: string[] = [];

  if (analysis.rsi > 70) risks.push('Overbought conditions may lead to pullback');
  if (analysis.rsi < 30) risks.push('Oversold bounce possible but trend may continue');
  if (Math.abs(quote.changePercent) > 3) risks.push('High volatility - use position sizing');
  if (risks.length === 0) risks.push('Standard market risk applies');

  return {
    symbol: quote.symbol,
    action: analysis.signal,
    confidence: analysis.strength,
    summary: `${quote.symbol} at $${quote.price}: ${analysis.signal} signal based on ${analysis.reasons.join('; ')}.`,
    risks,
    targets: { support, resistance },
  };
}

export async function chatWithAI(
  messages: { role: string; content: string }[]
): Promise<string> {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';

  if (!openai) {
    return `TradeMentor AI (offline mode): Based on your question about "${lastUser.slice(0, 80)}", I recommend reviewing RSI/MACD indicators on the Analytics page, maintaining proper risk management (max 2% per trade), and checking the Signals dashboard for current market opportunities.`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are TradeMentor AI, an expert fintech trading assistant. Provide concise, professional trading guidance. Never guarantee profits. Always mention risk.',
        },
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant' | 'system',
          content: m.content,
        })),
      ],
      temperature: 0.5,
      max_tokens: 800,
    });
    return completion.choices[0]?.message?.content ?? 'Unable to generate response.';
  } catch {
    return 'AI service temporarily unavailable. Please try again later.';
  }
}
