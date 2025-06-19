
import { getAuthService } from "@/auth/auth.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const handleLogin = () => {
    try {
      getAuthService().login({ redirectUri: window.location.origin + "/dashboard" });
    } catch (e) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de rediriger vers Keycloak",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-card border border-border shadow-xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">Easy Squash</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Connectez-vous pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleLogin}>
            Se connecter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
