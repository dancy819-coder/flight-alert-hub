import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { NotFound } from "@/components/NotFound";
import { AuthProvider } from "@/lib/auth-context";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import ResetPassword from "@/pages/ResetPassword";
import AppDashboard from "@/pages/AppDashboard";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<AppDashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AppErrorBoundary>
    </QueryClientProvider>
  );
}
