export function Logo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-full flex items-center justify-center ${className}`}>
      <img
        src="/logo/ovow-foods-logo.png"
        alt="OVOW Foods"
        className="w-full h-full object-cover rounded-full scale-[1.08]"
      />
    </div>
  );
}
