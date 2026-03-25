import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  children, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]',
    secondary: 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]',
    outline: 'border-2 border-card-border text-text hover:bg-slate-800/10 hover:text-primary',
    ghost: 'text-slate-400 hover:text-primary hover:bg-slate-800/10',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as any)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <span className={cn(isLoading ? 'opacity-0' : 'opacity-100')}>{children}</span>
    </motion.button>
  );
};

// --- Card ---
interface CardProps extends HTMLMotionProps<'div'> {
  glass?: boolean;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, glass = true, hover = true, glow = false, children, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { 
        y: -8, 
        scale: 1.01,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: { duration: 0.3, ease: 'easeOut' } 
      } : {}}
      className={cn(
        'relative overflow-hidden transition-all duration-500',
        glass ? 'glass-card p-6' : 'bg-bg border border-card-border rounded-3xl p-6',
        glow && 'shadow-[0_0_40px_rgba(99,102,241,0.15)] border-primary/30',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; className?: string; variant?: 'indigo' | 'purple' | 'cyan' | 'green' | 'red' | 'amber' | 'blue' | 'glass' }> = ({ children, className, variant = 'indigo' }) => {
  const variants = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 text-white'
  };

  return (
    <span className={cn('px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border', variants[variant], className)}>
      {children}
    </span>
  );
};

// --- ProgressBar ---
export const ProgressBar: React.FC<{ value: number; color?: string; className?: string; showLabel?: boolean; glow?: boolean }> = ({ value, color = 'bg-indigo-500', className, showLabel, glow = false }) => {
  return (
    <div className={cn('w-full space-y-2', className)}>
      {showLabel && (
        <div className="flex justify-between label-text">
          <span>Progress</span>
          <span className="text-primary">{value}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-slate-800/20 rounded-full overflow-hidden p-[1px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'h-full rounded-full relative transition-all duration-500',
            color,
            glow && 'shadow-[0_0_15px_rgba(99,102,241,0.5)]'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
};

// --- CircularProgress ---
export const CircularProgress: React.FC<{ value: number; size?: number; strokeWidth?: number; color?: string; className?: string; glow?: boolean }> = ({ 
  value, 
  size = 100, 
  strokeWidth = 8, 
  color = 'text-indigo-500', 
  className,
  glow = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-slate-800/20 stroke-current"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn('stroke-current transition-all duration-500', color)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          style={{ filter: glow ? `drop-shadow(0 0 8px currentColor)` : 'none' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black tracking-tighter">{value}%</span>
      </div>
    </div>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="label-text">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
            {icon}
          </div>
        )}
        <input 
          className={cn(
            'input-field',
            icon && 'pl-11',
            className
          )} 
          {...props} 
        />
      </div>
    </div>
  );
};

// --- Skeleton ---
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('bg-slate-800/20 animate-pulse rounded-xl', className)} />
);
