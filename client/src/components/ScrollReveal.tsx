import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-in" | "fade-in-up" | "slide-up";
  delay?: number;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          // Desconectar após aparecer uma vez para melhor performance
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold]);

  const animationClasses = {
    "fade-in": isVisible ? "animate-fade-in opacity-100" : "opacity-0",
    "fade-in-up": isVisible
      ? "animate-fade-in-up opacity-100 translate-y-0"
      : "opacity-0 translate-y-4",
    "slide-up": isVisible
      ? "animate-slide-up opacity-100 translate-y-0"
      : "opacity-0 translate-y-8",
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-500 ${animationClasses[animation]} ${className}`}
    >
      {children}
    </div>
  );
}

