import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout>
      <PageSEO
        title="404 - Página Não Encontrada | Titanium Implantes"
        description="A página que você está procurando não foi encontrada."
      />
      <div className="min-h-[60vh] w-full flex items-center justify-center bg-gray-50 py-16">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">404 - Página Não Encontrada</h1>
          </div>

            <p className="mt-4 text-sm text-gray-600 mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>

            <Link href="/">
              <a className="text-blue-600 hover:underline font-semibold">
                Voltar para a página inicial
              </a>
            </Link>
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
}
