import Image from "next/image";

export function Logo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-full flex items-center justify-center ${className}`}>
      <Image
        src="/logo/ovow-foods-logo.png"
        alt="OVOW FOODS logo"
        width={112}
        height={112}
        className="w-full h-full object-cover rounded-full scale-[1.08]"
      />
    </div>
  );
}
