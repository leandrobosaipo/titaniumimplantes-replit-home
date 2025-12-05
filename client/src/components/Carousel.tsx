import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { carouselConfig } from "@/data/carousel";
import type { CarouselSlide } from "@/types/carousel";

interface CarouselProps {
  /** Slides customizados (opcional). Se não fornecido, usa a configuração padrão */
  slides?: CarouselSlide[];
  /** Intervalo de autoplay em milissegundos (opcional) */
  autoplayInterval?: number;
}

export function Carousel({ slides: customSlides, autoplayInterval: customInterval }: CarouselProps = {} as CarouselProps) {
  const slides = customSlides || carouselConfig.slides;
  const autoplayInterval = customInterval || carouselConfig.autoplayInterval || 5000;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detectar se é dispositivo touch
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Resetar slide atual se a lista de slides mudar
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoplayInterval]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const pauseAndResume = () => {
    setIsAutoPlaying(false);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsAutoPlaying(false);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Retomar autoplay após um pequeno delay quando o mouse sair
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 1000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseAndResume();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAndResume();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAndResume();
  };

  // Se não houver slides, não renderizar nada
  if (slides.length === 0) {
    return null;
  }

  // Verificar se há conteúdo de texto em algum slide
  const hasTextContent = slides.some(slide => slide.title || slide.subtitle || slide.buttonText);

  return (
    <section
      className="relative w-full h-[350px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden bg-muted group mt-[70px] lg:mt-[130px]"
      data-testid="section-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsHovered(false), 2000);
      }}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const hasSlideContent = slide.title || slide.subtitle || slide.buttonText;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            data-testid={`carousel-slide-${index}`}
          >
            {/* Imagem Mobile - visível apenas até breakpoint md */}
            {slide.imageMobile && (
              <img
                src={slide.imageMobile}
                alt={slide.alt || slide.title || slide.subtitle || `Sistema de implantes cirúrgicos Titanium Implantes - Slide ${index + 1}`}
                className="w-full h-full object-contain block md:hidden"
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "auto"}
              />
            )}
            
            {/* Imagem Desktop - visível a partir de breakpoint md */}
            <img
              src={slide.image}
              alt={slide.alt || slide.title || slide.subtitle || `Sistema de implantes cirúrgicos Titanium Implantes - Slide ${index + 1}`}
              className={`w-full h-full object-cover ${slide.imageMobile ? "hidden md:block" : ""}`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "auto"}
            />

            {/* Container de conteúdo apenas se houver texto */}
            {hasSlideContent && (
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="max-w-2xl text-white">
                    {slide.title && (
                      <h2
                        className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                        data-testid={`carousel-title-${index}`}
                      >
                        {slide.title}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p className="text-lg md:text-xl mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" data-testid={`carousel-subtitle-${index}`}>
                        {slide.subtitle}
                      </p>
                    )}
                    {slide.buttonText && slide.buttonLink && (
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 pointer-events-auto"
                        data-testid={`button-carousel-cta-${index}`}
                      >
                        <a href={slide.buttonLink}>{slide.buttonText}</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Botão Anterior */}
      <Button
        size="icon"
        variant="ghost"
        className={`carousel-nav-button absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm text-primary-foreground hover:bg-background/90 active:bg-background w-10 h-10 sm:w-12 sm:h-12 transition-opacity duration-300 z-[60] ${(isHovered || isTouchDevice) ? 'carousel-nav-visible' : 'carousel-nav-hidden'
          }`}
        onClick={prevSlide}
        data-testid="button-carousel-prev"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      {/* Botão Próximo */}
      <Button
        size="icon"
        variant="ghost"
        className={`carousel-nav-button absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm text-primary-foreground hover:bg-background/90 active:bg-background w-10 h-10 sm:w-12 sm:h-12 transition-opacity duration-300 z-[60] ${(isHovered || isTouchDevice) ? 'carousel-nav-visible' : 'carousel-nav-hidden'
          }`}
        onClick={nextSlide}
        data-testid="button-carousel-next"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      {/* Dots de navegação */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity duration-300 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100"
        style={{
          opacity: isHovered ? 1 : undefined,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all touch-manipulation ${index === currentSlide
                ? "bg-primary-foreground w-6 sm:w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/75 active:bg-primary-foreground"
              }`}
            data-testid={`button-carousel-dot-${index}`}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
