import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Shimmer placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}

      {error && (
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
          <span className="text-sm text-slate-400">Image unavailable</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-${objectFit}`}
        style={{
          display: error ? "none" : "block",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 240ms ease",
        }}
      />
    </div>
  );
}
