import Image from "next/image";
import { cn } from "@/lib/utils";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";

type ImagePanelProps = {
  alt: string;
  className?: string;
  fallbackLabel: string;
  fallbackNote: string;
  imageClassName?: string;
  minHeightClassName?: string;
  priority?: boolean;
  sizes?: string;
  src?: string;
};

export function ImagePanel({
  alt,
  className,
  fallbackLabel,
  fallbackNote,
  imageClassName,
  minHeightClassName = "min-h-[320px]",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  src,
}: ImagePanelProps) {
  if (!src) {
    return (
      <PhotoPlaceholder
        className={className}
        label={fallbackLabel}
        minHeightClassName={minHeightClassName}
        note={fallbackNote}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative isolate min-h-[320px] overflow-hidden rounded-[30px] bg-blue-gray shadow-[var(--shadow-soft)] ring-1 ring-border/50",
        minHeightClassName,
        className,
      )}
    >
      <Image
        alt={alt}
        className={cn("object-cover", imageClassName)}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(6,75,63,0.48))]" />
    </div>
  );
}
