
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Phone, CreditCard, Trash2, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "@/api";

const Participants = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialTournamentId = searchParams.get("tournamentId") || "";
  const [tournamentId, setTournamentId] = useState<string>(initialTournamentId);
  const [participants, setParticipants] = useState<unknown[]>([]);
  const [tournaments, setTournaments] = useState<unknown[]>([]);

  useEffect(() => {
    api
      .getTournaments()
      .then(setTournaments)
      .catch(() => setTournaments([]));
  }, []);

  useEffect(() => {
    if (!tournamentId) return;
    api
      .getParticipants(tournamentId)
      .then(setParticipants)
      .catch(() => setParticipants([]));
  }, [tournamentId]);

  const handleValidatePayment = async (inscriptionId: string) => {
    await api.updateInscriptionPayment(inscriptionId);
    toast({
      title: "Paiement validé",
      description: "Le paiement a été confirmé avec succès",
    });
    setParticipants((prev) =>
      prev.map((p) => (p.id === inscriptionId ? { ...p, hasPaid: true } : p))
    );
  };

  const handleDeleteParticipant = async (inscriptionId: string) => {
    await api.deleteInscription(inscriptionId);
    toast({
      title: "Participant supprimé",
      description: "Le participant a été retiré du tournoi",
      variant: "destructive",
    });
    setParticipants((prev) => prev.filter((p) => p.id !== inscriptionId));
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Liste des participants
            </h1>
            <p className="text-black text-lg">
              Gérez les inscriptions aux tournois
            </p>
          </div>
        </div>

        <Card className="material-surface">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-2xl text-black">
                <Trophy className="w-6 h-6 text-primary" />
                Tournoi sélectionné
              </CardTitle>
              <Select value={tournamentId} onValueChange={setTournamentId}>
                <SelectTrigger className="w-64 border-border bg-background text-black">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  {tournaments.map(t => (
                    <SelectItem key={t.id} value={t.id} className="text-black hover:bg-accent">
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-2 font-semibold text-black">Prénom</th>
                    <th className="text-left py-4 px-2 font-semibold text-black">Nom</th>
                    <th className="text-left py-4 px-2 font-semibold text-black">Téléphone</th>
                    <th className="text-center py-4 px-2 font-semibold text-black">Avec repas ?</th>
                    <th className="text-center py-4 px-2 font-semibold text-black">Paiement</th>
                    <th className="text-right py-4 px-2 font-semibold text-black">Prix total</th>
                    <th className="text-center py-4 px-2 font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => (
                    <tr key={participant.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-2 text-black">{participant.user.firstName}</td>
                      <td className="py-4 px-2 text-black font-medium">{participant.user.lastName}</td>
                      <td className="py-4 px-2 text-black">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {participant.user.phoneNumber}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        {participant.takeEat ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-2 text-center">
                        {participant.hasPaid ? (
                          <Badge className="bg-green-100 text-black border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Validé
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-destructive/20 text-black border-destructive/30">
                            <X className="w-3 h-3 mr-1" />
                            En attente
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-2 text-right font-semibold text-black">
                        {participant.totalPrice.toFixed(1)} €
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            className="bg-primary text-white hover:bg-primary/90 text-xs px-3"
                            onClick={() => handleValidatePayment(participant.id)}
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Valider
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="bg-destructive text-white hover:bg-destructive/90 text-xs px-3"
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
                <Trophy className="w-16 h-16 text-black mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">
                  Aucun participant inscrit
                </h3>
                <p className="text-black">
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
