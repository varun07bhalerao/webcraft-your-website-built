import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import WizardDetails from "./pages/WizardDetails";
import WizardType from "./pages/WizardType";
import WizardTemplate from "./pages/WizardTemplate";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import Deploy from "./pages/Deploy";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/wizard/:id/details" element={<ProtectedRoute><WizardDetails /></ProtectedRoute>} />
    <Route path="/wizard/:id/type" element={<ProtectedRoute><WizardType /></ProtectedRoute>} />
    <Route path="/wizard/:id/template" element={<ProtectedRoute><WizardTemplate /></ProtectedRoute>} />
    <Route path="/editor/:id" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
    <Route path="/preview/:id" element={<ProtectedRoute><Preview /></ProtectedRoute>} />
    <Route path="/deploy/:id" element={<ProtectedRoute><Deploy /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProjectProvider>
            <AppRoutes />
          </ProjectProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
