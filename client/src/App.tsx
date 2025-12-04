import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import QuemSomos from "@/pages/QuemSomos";
import Produtos from "@/pages/Produtos";
import CanalDenuncia from "@/pages/CanalDenuncia";
import LGPD from "@/pages/LGPD";
import Contato from "@/pages/Contato";
import Compliance from "@/pages/Compliance";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quem-somos" component={QuemSomos} />
      <Route path="/produtos" component={Produtos} />
      <Route path="/canal-de-denuncia" component={CanalDenuncia} />
      <Route path="/lgpd" component={LGPD} />
      <Route path="/contato" component={Contato} />
      <Route path="/compliance" component={Compliance} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
