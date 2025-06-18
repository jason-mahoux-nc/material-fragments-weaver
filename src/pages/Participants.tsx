
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Phone, Medal, CreditCard, Trash2, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Participants = () => {
  const { toast } = useToast();

  const participants = [
    {
      id: 1,
      firstName: "Jason",
      lastName: "Mahoux", 
      phone: "0782691310",
      ranking: "B2",
      withMeal: false,
      paymentStatus: "pending",
      totalPrice: 10.0
    }
  ];

  const handleValidatePayment = (participantId: number) => {
    toast({
      title: "Paiement validé",
      description: "Le paiement a été confirmé avec succès",
    });
  };

  const handleDeleteParticipant = (participantId: number) => {
    toast({
      title: "Participant supprimé",
      description: "Le participant a été retiré du tournoi",
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Liste des participants
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez les inscriptions aux tournois
            </p>
          </div>
        </div>

        <Card className="material-surface">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                <Trophy className="w-6 h-6 text-primary" />
                Tournoi sélectionné
              </CardTitle>
              <Select defaultValue="squash-night">
                <SelectTrigger className="w-64 border-border bg-background text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  <SelectItem value="squash-night" className="text-foreground hover:bg-accent">Squash night</SelectItem>
                  <SelectItem value="spring-tournament" className="text-foreground hover:bg-accent">Tournoi de printemps</SelectItem>
                  <SelectItem value="summer-cup" className="text-foreground hover:bg-accent">Coupe d'été</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-2 font-semibold text-foreground">Prénom</th>
                    <th className="text-left py-4 px-2 font-semibold text-foreground">Nom</th>
                    <th className="text-left py-4 px-2 font-semibold text-foreground">Téléphone</th>
                    <th className="text-left py-4 px-2 font-semibold text-foreground">Classement</th>
                    <th className="text-center py-4 px-2 font-semibold text-foreground">Avec repas ?</th>
                    <th className="text-center py-4 px-2 font-semibold text-foreground">Paiement</th>
                    <th className="text-right py-4 px-2 font-semibold text-foreground">Prix total</th>
                    <th className="text-center py-4 px-2 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => (
                    <tr key={participant.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-2 text-foreground">{participant.firstName}</td>
                      <td className="py-4 px-2 text-foreground font-medium">{participant.lastName}</td>
                      <td className="py-4 px-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {participant.phone}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                          <Medal className="w-3 h-3 mr-1" />
                          {participant.ranking}
                        </Badge>
                      </td>
                      <td className="py-4 px-2 text-center">
                        {participant.withMeal ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-2 text-center">
                        {participant.paymentStatus === "pending" ? (
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            <X className="w-3 h-3 mr-1" />
                            En attente
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Validé
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-2 text-right font-semibold text-foreground">
                        {participant.totalPrice.toFixed(1)} €
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3"
                            onClick={() => handleValidatePayment(participant.id)}
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Valider
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs px-3"
                            onClick={() => handleDeleteParticipant(participant.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {participants.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Aucun participant inscrit
                </h3>
                <p className="text-muted-foreground">
                  Les participants apparaîtront ici une fois inscrits
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Participants;
