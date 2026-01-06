import { z } from "zod";

/**
 * Valores do formulário de denúncia
 */
export interface DenunciaFormValues {
  anonimo: boolean;
  nome?: string;
  email?: string;
  urgencia: "Baixa" | "Media" | "Alta";
  tipo_denuncia: string;
  data_ocorrencia: string;
  local_ocorrencia: string;
  pessoas_envolvidas?: string;
  descricao_detalhada: string;
  evidencias?: string;
  termos_aceitos: boolean;
}

/**
 * Schema de validação Zod para o formulário de denúncia
 * 
 * Validação condicional:
 * - Se anonimo === false: nome e email são obrigatórios
 * - Se anonimo === true: nome e email são opcionais
 */
export const denunciaSchema = z
  .object({
    anonimo: z.boolean().default(false),
    nome: z.string().optional(),
    email: z.string().optional(),
    urgencia: z.enum(["Baixa", "Media", "Alta"]).default("Media"),
    tipo_denuncia: z.string().min(1, "Selecione o tipo da denúncia"),
    data_ocorrencia: z
      .string()
      .min(1, "Data da ocorrência é obrigatória")
      .refine(
        (date) => {
          const selectedDate = new Date(date);
          const today = new Date();
          today.setHours(23, 59, 59, 999);
          return selectedDate <= today;
        },
        {
          message: "A data não pode ser futura",
        }
      ),
    local_ocorrencia: z.string().min(1, "Local da ocorrência é obrigatório"),
    pessoas_envolvidas: z.string().optional(),
    descricao_detalhada: z
      .string()
      .min(50, "A descrição deve ter no mínimo 50 caracteres"),
    evidencias: z.string().optional(),
    termos_aceitos: z
      .boolean()
      .refine((val) => val === true, {
        message: "Você deve aceitar os termos para continuar",
      }),
  })
  .refine(
    (data) => {
      // Se não for anônimo, nome e email são obrigatórios
      if (!data.anonimo) {
        const nomeValid = data.nome !== undefined && data.nome.trim().length > 0;
        const emailValid =
          data.email !== undefined &&
          data.email.trim().length > 0 &&
          z.string().email().safeParse(data.email).success;
        return nomeValid && emailValid;
      }
      return true;
    },
    {
      message: "Nome e e-mail válido são obrigatórios quando não for anônimo",
      path: ["nome"], // Erro será mostrado no campo nome
    }
  )
  .refine(
    (data) => {
      // Validação específica do email se não for anônimo
      if (!data.anonimo && data.email) {
        return z.string().email().safeParse(data.email).success;
      }
      return true;
    },
    {
      message: "E-mail inválido",
      path: ["email"],
    }
  );

/**
 * Tipos de denúncia organizados por categoria
 */
export const tiposDenuncia = [
  {
    label: "Conduta Pessoal",
    options: [
      { value: "Agressão Fisica", label: "Agressão Física" },
      { value: "Ameaça", label: "Ameaça" },
      { value: "Assédio Moral", label: "Assédio Moral" },
      { value: "Assédio Sexual", label: "Assédio Sexual" },
      {
        value: "Ofensa (Fisica, verbal, moral, ao pudor).",
        label: "Ofensa (Física, verbal, moral, ao pudor)",
      },
      {
        value: "Importunação à privacidade e/ou Tranquilidade",
        label: "Importunação à privacidade e/ou Tranquilidade",
      },
      {
        value: "Discriminação (Sexual, Moral, Religiosa, Racial, Classe Social).",
        label: "Discriminação (Sexual, Moral, Religiosa, Racial, Classe Social)",
      },
      { value: "Relatiação", label: "Retaliação" },
    ],
  },
  {
    label: "Práticas Laborais",
    options: [
      {
        value: "Esvaziamento ou Sobrecarga de Trabalho",
        label: "Esvaziamento ou Sobrecarga de Trabalho",
      },
      {
        value: "Regime Disciplinas (sanção excessiva, ausência de sanção)",
        label: "Regime Disciplinas (sanção excessiva, ausência de sanção)",
      },
    ],
  },
  {
    label: "Fraudes e Desvios",
    options: [
      { value: "Fraude", label: "Fraude" },
      { value: "Furto", label: "Furto" },
      { value: "Roubo", label: "Roubo" },
      {
        value: "Falsidade Declaratória ou Documental",
        label: "Falsidade Declaratória ou Documental",
      },
      { value: "Suborno", label: "Suborno" },
    ],
  },
  {
    label: "Práticas Comerciais Indevidas",
    options: [
      {
        value: "Prática de Doação de Equipamentos ou Instrumental para Obter Vantagem Indevida.",
        label: "Doação de Equipamentos para Vantagem Indevida",
      },
      {
        value: "Prática de Relacionamento Impróprio com Instituições, Associações ou Empresas de Saúde",
        label: "Relacionamento Impróprio com Instituições",
      },
      {
        value: "Recebimento/Oferecimento Indevido de Presentes, Brindes e Hospitalidade",
        label: "Recebimento/Oferecimento Indevido de Presentes",
      },
      {
        value: "Pagamento de Taxa ou Comissionamento Vinculado ao Uso de Material",
        label: "Pagamento de Comissão Vinculado ao Uso de Material",
      },
      {
        value: "Patrocínios Educacionais e Científicos não permitidos.",
        label: "Patrocínios Educacionais não permitidos",
      },
    ],
  },
  {
    label: "Outras Violações",
    options: [
      { value: "Falhas em Controle Interno", label: "Falhas em Controle Interno" },
      { value: "Propriedade Intelectual", label: "Propriedade Intelectual" },
      { value: "Segurança da Informação", label: "Segurança da Informação" },
      { value: "Segurança nas Instalações", label: "Segurança nas Instalações" },
      {
        value: "Uso Indevido da Imagem da Empresa",
        label: "Uso Indevido da Imagem da Empresa",
      },
      {
        value: "Uso Indevido de Bens e/ou Serviços",
        label: "Uso Indevido de Bens e/ou Serviços",
      },
      { value: "Venda ou Uso de Entorpecentes", label: "Venda ou Uso de Entorpecentes" },
      { value: "Outros", label: "Outros" },
    ],
  },
];

