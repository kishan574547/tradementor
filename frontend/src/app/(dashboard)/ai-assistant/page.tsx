'use client';

import { useEffect, useState, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { chatApi, type ChatMessage } from '@/lib/api';
import { Bot, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatApi.history().then(setMessages).catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages((m) => [...m, { id: 'temp', role: 'user', content: userMsg, createdAt: new Date().toISOString() }]);
    setLoading(true);
    try {
      const { reply } = await chatApi.send(userMsg);
      setMessages((m) => [...m.filter((x) => x.id !== 'temp'), { id: 'u', role: 'user', content: userMsg, createdAt: new Date().toISOString() }, reply]);
    } catch {
      setMessages((m) => [...m, { id: 'err', role: 'assistant', content: 'Unable to connect to AI service.', createdAt: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader title="AI Trading Assistant" description="Ask questions about markets, strategies, and risk management" />
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <Bot className="h-12 w-12 mx-auto mb-4 text-neon-blue opacity-50" />
              <p>Ask me about trading strategies, technical analysis, or portfolio management.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <motion.div
              key={`${m.id}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-neon-blue/20 text-white border border-neon-blue/30' : 'bg-white/5 text-white/90 border border-white/10'}`}>
                {m.content}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </CardContent>
        <div className="border-t border-white/10 p-4 flex gap-2">
          <Input
            placeholder="Ask TradeMentor AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <Button onClick={send} disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
