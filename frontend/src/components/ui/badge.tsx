interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'primary', size = 'md' }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full font-medium';
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' };
  const variants = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
  };
  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </span>
  );
}
