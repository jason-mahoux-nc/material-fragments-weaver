
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-surface">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="bg-surface border-b border-surface-variant p-4 flex items-center justify-between">
            <SidebarTrigger className="hover:bg-surface-container p-2 rounded-lg" />
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-on-surface hover:bg-surface-container"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </header>
          <div className="flex-1 p-6 bg-surface">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
