import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30',
        success: 'bg-neon-green/20 text-neon-green border border-neon-green/30',
        destructive: 'bg-red-500/20 text-red-400 border border-red-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
        secondary: 'bg-white/10 text-white/80 border border-white/10',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
