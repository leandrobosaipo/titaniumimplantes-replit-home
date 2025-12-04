import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
    <section
      className="relative w-full pt-16 pb-16 px-6 md:pt-24 md:pb-24 md:px-12"
      style={{
        backgroundColor: "#F4F5F7",
      }}
      data-testid="section-contato"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Grid 2 colunas no desktop, 1 coluna no mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 items-center">
          {/* Coluna Esquerda: Título e Descrição */}
          <div className="flex flex-col">
            {/* Título */}
            <h2
              className="text-[#0d70dc] text-[32px] md:text-[42px] mb-6"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: "420px",
                marginBottom: "24px",
              }}
              data-testid="text-contato-title"
            >
              {c.titulo}
            </h2>

            {/* Descrição */}
            <p
              className="text-[#1A1A1A] text-[18px]"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: "420px",
              }}
              data-testid="text-contato-desc"
            >
              {c.descricao}
            </p>
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="w-full">
            <div
              className="bg-white rounded-[24px] p-10 shadow-lg w-full"
              data-testid="form-container"
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
                    render={({ field }) => (
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
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-colors focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0"
                            data-testid="input-nome"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Campo Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
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
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-colors focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Campo Telefone */}
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
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
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-colors focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0"
                            data-testid="input-telefone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Campo Mensagem */}
                  <FormField
                    control={form.control}
                    name="mensagem"
                    render={({ field }) => (
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
                              height: "160px",
                              backgroundColor: "#F1F4F9",
                              border: "none",
                              borderRadius: "8px",
                              padding: "16px",
                              fontSize: "16px",
                              color: "#1A1A1A",
                              fontFamily: "Lato, sans-serif",
                              resize: "vertical",
                            }}
                            className="placeholder:text-[#A0AEC0] hover:bg-[#E8EDF5] transition-colors focus-visible:ring-2 focus-visible:ring-[#0d70dc] focus-visible:ring-offset-0"
                            data-testid="textarea-mensagem"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Botão Enviar */}
                  <div className="flex justify-center md:justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: isSubmitting ? "#A0AEC0" : "#0d70dc",
                        color: "#FFFFFF",
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 600,
                        fontSize: "16px",
                        borderRadius: "999px",
                        padding: "12px 32px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                      className="hover:bg-[#0d70dc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="button-enviar"
                    >
                      {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

