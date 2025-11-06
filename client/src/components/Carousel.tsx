import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import slide1 from "@assets/home-topo_1762428378908.jpeg";
import slide2 from "@assets/home-slide_1762428378908.jpeg";

interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
}

const slides: CarouselSlide[] = [
  {
    id: "1",
    image: slide1,
    title: "Parceria com a Globus",
    subtitle: "Referência mundial em soluções para cirurgias de coluna",
    buttonText: "Conheça nosso portfólio",
    buttonLink: "/produtos",
  },
  {
    id: "2",
    image: slide2,
    title: "Qualidade certificada e tecnologia de ponta",
    subtitle: "Para sua prática médica",
    buttonText: "Conheça nosso portfólio",
    buttonLink: "/produtos",
  },
  {
    id: "3",
    image: slide1,
    title: "Excelência em Materiais Cirúrgicos",
    subtitle: "Comprometimento com a saúde e inovação",
    buttonText: "Conheça nosso portfólio",
    buttonLink: "/produtos",
  },
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-muted" data-testid="section-carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          data-testid={`carousel-slide-${index}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-2xl text-primary-foreground">
                <h2 
                  className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
                  data-testid={`carousel-title-${index}`}
                >
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 opacity-95" data-testid={`carousel-subtitle-${index}`}>
                  {slide.subtitle}
                </p>
                {slide.buttonText && slide.buttonLink && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8"
                    data-testid={`button-carousel-cta-${index}`}
                  >
                    <a href={slide.buttonLink}>{slide.buttonText}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        size="icon"
        variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/30 w-12 h-12"
        onClick={prevSlide}
        data-testid="button-carousel-prev"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/30 w-12 h-12"
        onClick={nextSlide}
        data-testid="button-carousel-next"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary-foreground w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/75"
            }`}
            data-testid={`button-carousel-dot-${index}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
