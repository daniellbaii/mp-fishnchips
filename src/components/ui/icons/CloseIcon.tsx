interface CloseIconProps {
  className?: string;
}

export default function CloseIcon({ className = "h-6 w-6" }: CloseIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  );
}