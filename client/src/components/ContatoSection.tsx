import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { contatoConfig as c } from "@/data/contato";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Schema de validação Zod
const contatoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  telefone: z.string().min(14, "Telefone inválido"), // (99) 99999-9999 = 14 chars
  mensagem: z.string().min(1, "Mensagem é obrigatória"),
});

type ContatoFormValues = z.infer<typeof contatoSchema>;

// Função helper para aplicar máscara de telefone
function maskPhone(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "");
  // Aplica máscara
  if (numbers.length <= 10) {
    return numbers
      .replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
      .replace(/-$/, "");
  } else {
    return numbers
      .replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
      .replace(/-$/, "");
  }
}

// Componente animado para FormItem com shake quando há erro
const AnimatedFormItem = ({ 
  children, 
  hasError, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { hasError?: boolean }) => {
  return (
    <motion.div
      animate={hasError ? {
        x: [0, -10, 10, -10, 10, 0],
      } : {}}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export function ContatoSection() {
  if (!c.ativo) return null;

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContatoFormValues>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
    },
  });

  const onSubmit = async (data: ContatoFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(c.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          mensagem: data.mensagem,
          origem: "form_contato_titanium_home",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      // Sucesso
      toast({
        title: "Sucesso!",
        description: "Mensagem enviada com sucesso! Entraremos em contato.",
        variant: "default",
      });

      // Limpar formulário
      form.reset();
    } catch (error) {
      // Erro
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contato"
      className="relative w-full pt-12 pb-12 px-6 md:pt-24 md:pb-24 md:px-12 flex flex-col items-center md:block"
      style={{
        backgroundColor: "#F4F5F7",
      }}
      data-testid="section-contato"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto w-full md:max-w-[1280px]">
        {/* Grid 2 colunas no desktop, 1 coluna no mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-12 items-center justify-items-center md:justify-items-start">
          {/* Coluna Esquerda: Título e Descrição */}
          <div className="flex flex-col w-full">
            {/* Título */}
            <h2
              className="text-[28px] md:text-[42px] text-[#0A2473] md:text-[#0d70dc] text-center md:text-left mb-8 md:mb-6"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
              data-testid="text-contato-title"
            >
              {c.titulo}
            </h2>

            {/* Descrição */}
            <p
              className="hidden md:block text-[#1A1A1A] text-[18px]"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: "420px",
              }}
              data-testid="text-contato-desc"
            >
              {c.descricao} Conheça nossos <a href="/produtos" className="text-[#0d70dc] hover:underline font-semibold">produtos e soluções</a> ou saiba mais <a href="/quem-somos" className="text-[#0d70dc] hover:underline font-semibold">sobre a Titanium Implantes</a>.
            </p>
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="w-full flex justify-center md:block">
            <motion.div
              className="bg-white rounded-[24px] p-8 md:p-10 shadow-lg w-full max-w-[480px] md:max-w-none mx-auto"
              data-testid="form-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Campo Nome */}
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field, fieldState }) => (
                      <AnimatedFormItem hasError={!!fieldState.error}>
                        <FormItem>
                        <FormLabel
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#1A1A1A",
                            marginBottom: "8px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          Nome
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Seu nome"
                            style={{
                              height: "48px",
                              backgroundColor: "#F1F4F9",
                              border: "none",
                              borderRadius: "8px",
                              padding: "0 16px",
                              fontSize: "16px",
                              color: "#1A1A1A",
                              fontFamily: "Lato, sans-serif",
                            }}
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0 focus-visible:scale-[1.02] focus-visible:shadow-lg"
                            data-testid="input-nome"
                          />
                        </FormControl>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={fieldState.error ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FormMessage />
                        </motion.div>
                      </FormItem>
                      </AnimatedFormItem>
                    )}
                  />

                  {/* Campo Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <AnimatedFormItem hasError={!!fieldState.error}>
                        <FormItem>
                        <FormLabel
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#1A1A1A",
                            marginBottom: "8px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="seu@email.com"
                            style={{
                              height: "48px",
                              backgroundColor: "#F1F4F9",
                              border: "none",
                              borderRadius: "8px",
                              padding: "0 16px",
                              fontSize: "16px",
                              color: "#1A1A1A",
                              fontFamily: "Lato, sans-serif",
                            }}
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0 focus-visible:scale-[1.02] focus-visible:shadow-lg"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={fieldState.error ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FormMessage />
                        </motion.div>
                      </FormItem>
                      </AnimatedFormItem>
                    )}
                  />

                  {/* Campo Telefone */}
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field, fieldState }) => (
                      <AnimatedFormItem hasError={!!fieldState.error}>
                        <FormItem>
                        <FormLabel
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#1A1A1A",
                            marginBottom: "8px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          Telefone
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="(99) 99999-9999"
                            onChange={(e) => {
                              const masked = maskPhone(e.target.value);
                              field.onChange(masked);
                            }}
                            style={{
                              height: "48px",
                              backgroundColor: "#F1F4F9",
                              border: "none",
                              borderRadius: "8px",
                              padding: "0 16px",
                              fontSize: "16px",
                              color: "#1A1A1A",
                              fontFamily: "Lato, sans-serif",
                            }}
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0 focus-visible:scale-[1.02] focus-visible:shadow-lg"
                            data-testid="input-telefone"
                          />
                        </FormControl>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={fieldState.error ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FormMessage />
                        </motion.div>
                      </FormItem>
                      </AnimatedFormItem>
                    )}
                  />

                  {/* Campo Mensagem */}
                  <FormField
                    control={form.control}
                    name="mensagem"
                    render={({ field, fieldState }) => (
                      <AnimatedFormItem hasError={!!fieldState.error}>
                        <FormItem>
                        <FormLabel
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#1A1A1A",
                            marginBottom: "8px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          Mensagem
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Sua mensagem"
                            style={{
                              minHeight: "140px",
                              backgroundColor: "#F1F4F9",
                              border: "none",
                              borderRadius: "8px",
                              padding: "16px",
                              fontSize: "16px",
                              color: "#1A1A1A",
                              fontFamily: "Lato, sans-serif",
                              resize: "vertical",
                            }}
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0 focus-visible:scale-[1.02] focus-visible:shadow-lg"
                            data-testid="textarea-mensagem"
                          />
                        </FormControl>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={fieldState.error ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FormMessage />
                        </motion.div>
                      </FormItem>
                      </AnimatedFormItem>
                    )}
                  />

                  {/* Botão Enviar */}
                  <div className="flex justify-center md:justify-end w-full md:w-auto mt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: isSubmitting ? "#A0AEC0" : "#1E4DD9",
                          color: "#FFFFFF",
                          fontFamily: "Lato, sans-serif",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          borderRadius: "999px",
                          padding: "14px 32px",
                          minHeight: "48px",
                        }}
                        className="w-full md:w-auto hover:bg-[#1E4DD9] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="button-enviar"
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ENVIANDO...
                          </motion.span>
                        ) : (
                          "ENVIAR"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
