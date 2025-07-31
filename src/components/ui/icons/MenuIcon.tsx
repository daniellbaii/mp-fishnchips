interface MenuIconProps {
  className?: string;
}

export default function MenuIcon({ className = "h-6 w-6" }: MenuIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  );
}