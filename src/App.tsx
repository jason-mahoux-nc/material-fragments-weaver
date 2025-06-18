
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SessionCreate from "./pages/SessionCreate";
import TournamentCreate from "./pages/TournamentCreate";
import Participants from "./pages/Participants";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Sessions from "./pages/Sessions";
import Tournaments from "./pages/Tournaments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/session/create" element={<SessionCreate />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/tournament/create" element={<TournamentCreate />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
