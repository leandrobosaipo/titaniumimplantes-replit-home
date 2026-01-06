"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Check, Info } from "lucide-react";
import { canalDenunciaPageConfig as c } from "@/data/canalDenunciaPage";
import { denunciaSchema, tiposDenuncia, type DenunciaFormValues } from "@/types/canalDenuncia";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/**
 * Gera código único de acompanhamento
 */
function generateReportCode(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DEN-${timestamp}-${random}`;
}

/**
 * Calcula o progresso do formulário baseado nos campos preenchidos
 */
function calculateProgress(values: Partial<DenunciaFormValues>, isAnonymous: boolean): number {
  const fields = [
    // Campos obrigatórios sempre
    values.tipo_denuncia,
    values.data_ocorrencia,
    values.local_ocorrencia,
    values.descricao_detalhada,
    values.termos_aceitos,
    // Campos condicionais (se não anônimo)
    !isAnonymous ? values.nome : true,
    !isAnonymous ? values.email : true,
    // Campos opcionais (peso menor)
    values.urgencia,
    values.pessoas_envolvidas,
    values.evidencias,
  ];

  const totalFields = isAnonymous ? 8 : 10; // 5 obrigatórios + 2 condicionais + 3 opcionais
  const filledFields = fields.filter((field) => {
    if (typeof field === "boolean") return field === true;
    if (typeof field === "string") return field.trim().length > 0;
    return false;
  }).length;

  return Math.round((filledFields / totalFields) * 100);
}

export function CanalDenunciaFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reportCode, setReportCode] = useState<string>("");

  const form = useForm<DenunciaFormValues>({
    resolver: zodResolver(denunciaSchema),
    defaultValues: {
      anonimo: false,
      nome: "",
      email: "",
      urgencia: "Media",
      tipo_denuncia: "",
      data_ocorrencia: "",
      local_ocorrencia: "",
      pessoas_envolvidas: "",
      descricao_detalhada: "",
      evidencias: "",
      termos_aceitos: false,
    },
  });

  const isAnonymous = form.watch("anonimo");
  const formValues = form.watch();

  // Calcula progresso em tempo real
  const progress = useMemo(
    () => calculateProgress(formValues, isAnonymous),
    [formValues, isAnonymous]
  );

  const onSubmit = async (data: DenunciaFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(c.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anonimo: data.anonimo,
          nome: data.anonimo ? undefined : data.nome,
          email: data.anonimo ? undefined : data.email,
          urgencia: data.urgencia,
          tipo_denuncia: data.tipo_denuncia,
          data_ocorrencia: data.data_ocorrencia,
          local_ocorrencia: data.local_ocorrencia,
          pessoas_envolvidas: data.pessoas_envolvidas || undefined,
          descricao_detalhada: data.descricao_detalhada,
          evidencias: data.evidencias || undefined,
          termos_aceitos: data.termos_aceitos,
          origem: "form_denuncia_titanium",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      // Gerar código de acompanhamento
      const code = generateReportCode();
      setReportCode(code);

      // Mostrar tela de confirmação
      setShowConfirmation(true);
    } catch (error) {
      // Erro
      alert("Ocorreu um erro ao enviar. Tente novamente.");
      console.error("Erro ao enviar denúncia:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setShowConfirmation(false);
    setReportCode("");
  };

  if (showConfirmation) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 md:p-12">
                <div className="text-center space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-green-100 p-3">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold">Denúncia Enviada com Sucesso!</h3>
                  <p className="text-lg">
                    Sua denúncia foi recebida e será analisada pelo nosso Comitê de Ética.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="font-medium mb-2">Código de acompanhamento:</p>
                    <p className="text-xl font-bold">{reportCode}</p>
                  </div>

                  <p className="text-sm text-gray-600">
                    Anote este código para acompanhar o status da sua denúncia. Todas as
                    comunicações relativas a esta denúncia serão tratadas com total
                    confidencialidade.
                  </p>

                  <Button
                    onClick={handleReset}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Registrar nova denúncia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Faça sua Denúncia</h2>
          <Card className="bg-white shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Formulário de Denúncia
              </h3>
              <p className="text-sm text-gray-500">
                Preencha os campos abaixo para enviar sua denúncia. Todos os campos marcados
                com * são obrigatórios.
              </p>
            </div>
            <div className="p-6 pt-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Barra de Progresso */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Checkbox Anônimo */}
                  <FormField
                    control={form.control}
                    name="anonimo"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">
                          Desejo fazer uma denúncia anônima
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <hr className="my-6" />

                  {/* Informações Pessoais - Apenas se não for anônimo */}
                  {!isAnonymous && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Informações Pessoais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Nome Completo <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Seu nome completo"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                E-mail <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="seu.email@exemplo.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Detalhes da Denúncia */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detalhes da Denúncia</h3>

                    {/* Urgência */}
                    <FormField
                      control={form.control}
                      name="urgencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgência da Denúncia</FormLabel>
                          <FormControl>
                            <div className="p-3 border rounded-md">
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Baixa" id="low" />
                                  <Label htmlFor="low" className="text-green-600 cursor-pointer">
                                    Baixa
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Media" id="medium" />
                                  <Label htmlFor="medium" className="text-amber-600 cursor-pointer">
                                    Média
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Alta" id="high" />
                                  <Label htmlFor="high" className="text-red-600 cursor-pointer">
                                    Alta
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </FormControl>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            Alta urgência: Situações que necessitam intervenção imediata.
                          </p>
                        </FormItem>
                      )}
                    />

                    {/* Tipo da Denúncia */}
                    <FormField
                      control={form.control}
                      name="tipo_denuncia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Tipo da Denúncia <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || undefined}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo da denúncia" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tiposDenuncia.map((group, index) => (
                                <SelectGroup key={group.label}>
                                  {index > 0 && <SelectSeparator />}
                                  <SelectLabel>{group.label}</SelectLabel>
                                  {group.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Data da Ocorrência */}
                    <FormField
                      control={form.control}
                      name="data_ocorrencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Data da Ocorrência <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Local da Ocorrência */}
                    <FormField
                      control={form.control}
                      name="local_ocorrencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Local da Ocorrência <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Onde ocorreu o incidente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pessoas Envolvidas */}
                    <FormField
                      control={form.control}
                      name="pessoas_envolvidas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pessoas Envolvidas</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nome das pessoas envolvidas, se souber"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Descrição Detalhada */}
                    <FormField
                      control={form.control}
                      name="descricao_detalhada"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Descrição Detalhada <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="Descreva a situação com o máximo de detalhes possível, incluindo: o quê aconteceu, por quê, quanto (se mensurável) e outras informações relevantes."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Evidências */}
                    <FormField
                      control={form.control}
                      name="evidencias"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Evidências</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Descreva quais evidências existem e onde podem ser encontradas"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Alerta de Segurança */}
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Lembre-se:</p>
                      <p>
                        Todas as denúncias são tratadas com total confidencialidade. Forneça o
                        máximo de detalhes possíveis para que a investigação seja eficaz.
                      </p>
                    </div>
                  </div>

                  {/* Termos e Condições */}
                  <FormField
                    control={form.control}
                    name="termos_aceitos"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="grid gap-1.5 leading-none">
                          <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                            Estou ciente que minhas informações pessoais serão tratadas apenas
                            para apuração desta denúncia e serão descartadas após a finalização,
                            caso não haja outra base legal para tratamento.{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Botão de Enviar */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Denúncia"}
                  </Button>

                  <p className="text-center text-xs text-gray-500">
                    Os campos marcados com <span className="text-red-500">*</span> são
                    obrigatórios
                  </p>
                </form>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

