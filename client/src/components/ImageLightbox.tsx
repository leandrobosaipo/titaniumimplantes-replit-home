import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt?: string;
};

export function ImageLightbox({ open, onOpenChange, src, alt }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] md:w-[900px] p-0 border-0 bg-transparent shadow-none">
        {/* Título oculto para acessibilidade */}
        <DialogTitle className="sr-only">Imagem</DialogTitle>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-2 md:p-4 bg-black/5">
            <img
              src={src}
              alt={alt || ""}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
