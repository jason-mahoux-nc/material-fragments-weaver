
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
            <h1 className="text-4xl font-bold text-on-surface mb-2">
              Liste des participants
            </h1>
            <p className="text-on-surface-variant text-lg">
              Gérez les inscriptions aux tournois
            </p>
          </div>
        </div>

        <Card className="material-surface">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Trophy className="w-6 h-6 text-primary-m3" />
                Tournoi sélectionné
              </CardTitle>
              <Select defaultValue="squash-night">
                <SelectTrigger className="w-64 material-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border border-surface-variant">
                  <SelectItem value="squash-night">Squash night</SelectItem>
                  <SelectItem value="spring-tournament">Tournoi de printemps</SelectItem>
                  <SelectItem value="summer-cup">Coupe d'été</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-variant">
                    <th className="text-left py-4 px-2 font-semibold text-on-surface">Prénom</th>
                    <th className="text-left py-4 px-2 font-semibold text-on-surface">Nom</th>
                    <th className="text-left py-4 px-2 font-semibold text-on-surface">Téléphone</th>
                    <th className="text-left py-4 px-2 font-semibold text-on-surface">Classement</th>
                    <th className="text-center py-4 px-2 font-semibold text-on-surface">Avec repas ?</th>
                    <th className="text-center py-4 px-2 font-semibold text-on-surface">Paiement</th>
                    <th className="text-right py-4 px-2 font-semibold text-on-surface">Prix total</th>
                    <th className="text-center py-4 px-2 font-semibold text-on-surface">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => (
                    <tr key={participant.id} className="border-b border-surface-variant/50 hover:bg-surface-container transition-colors">
                      <td className="py-4 px-2 text-on-surface">{participant.firstName}</td>
                      <td className="py-4 px-2 text-on-surface font-medium">{participant.lastName}</td>
                      <td className="py-4 px-2 text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {participant.phone}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="secondary" className="bg-secondary-m3/20 text-secondary-m3">
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
                          <Badge variant="destructive" className="bg-error/20 text-error">
                            <X className="w-3 h-3 mr-1" />
                            En attente
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Validé
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-2 text-right font-semibold text-on-surface">
                        {participant.totalPrice.toFixed(1)} €
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            className="material-button text-xs px-3"
                            onClick={() => handleValidatePayment(participant.id)}
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Valider
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="text-xs px-3"
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
                <Trophy className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-on-surface mb-2">
                  Aucun participant inscrit
                </h3>
                <p className="text-on-surface-variant">
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
