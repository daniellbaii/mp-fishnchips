interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = "h-10 w-10" }: LogoIconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="currentColor">
      <path d="M20 2C15.5 2 12 5.5 12 10c0 2.5 1 4.5 2.5 6L20 38l5.5-22c1.5-1.5 2.5-3.5 2.5-6 0-4.5-3.5-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
      <ellipse cx="20" cy="35" rx="15" ry="3" opacity="0.3"/>
    </svg>
  );
}