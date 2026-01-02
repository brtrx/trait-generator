import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import SharedProfile from "./pages/SharedProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Use HashRouter only for GitHub Pages to avoid 404 on refresh
  // Use BrowserRouter for Lovable and other environments
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname === 'brtrx.github.io';
  const Router = isGitHubPages ? HashRouter : BrowserRouter;
  const basename = (!isGitHubPages && import.meta.env.PROD) ? "/trait-generator" : "";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router basename={basename}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/editor" element={<Index />} />
            <Route path="/p/:id" element={<SharedProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
