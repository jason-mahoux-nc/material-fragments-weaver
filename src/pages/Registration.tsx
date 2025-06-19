
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Phone, Calendar, Euro, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";

const Registration = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "0123456789",
    tournamentId: "",
    withEat: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tournaments, setTournaments] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    api
      .getTournaments()
      .then((list) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTournaments(list as any[]);
        if (list.length > 0 && !formData.tournamentId) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setFormData((prev) => ({ ...prev, tournamentId: (list as any[])[0].id }));
        }
      })
      .catch(() => setTournaments([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createInscription(formData);
    toast({
      title: "Inscription enregistrée",
      description: "Votre inscription a été prise en compte avec succès",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedTournament = tournaments.find(t => t.id === formData.tournamentId);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Formulaire d'inscription
          </h1>
          <p className="text-muted-foreground text-lg">
            Inscrivez-vous au tournoi de votre choix
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                <UserPlus className="w-6 h-6 text-primary" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground font-medium">
                    Nom *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    placeholder="Votre nom de famille"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground font-medium">
                    Prénom *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-foreground font-medium">
                  Téléphone *
                </Label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground pl-10"
                    placeholder="0123456789"
                    required
                  />
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                🏆 Détails du tournoi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tournamentId" className="text-foreground font-medium">
                  Tournoi
                </Label>
                <Select value={formData.tournamentId} onValueChange={(value) => handleInputChange("tournamentId", value)}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border">
                    {tournaments.map((t) => (
                      <SelectItem key={t.id} value={t.id} className="text-foreground hover:bg-accent">
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTournament && (
                <div className="bg-muted/30 rounded-lg p-6 space-y-4 border border-border">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">
                      Date du tournoi: {new Date(selectedTournament.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">Heure de début: {selectedTournament.startHour}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Euro className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Prix total: {selectedTournament.price} euros</span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="withEat"
                  checked={formData.withEat}
                  onCheckedChange={(checked) => handleInputChange("withEat", checked as boolean)}
                />
                <Label htmlFor="withEat" className="text-foreground font-medium">
                  Avec repas ?
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 pt-6">
            <Button type="button" variant="outline" className="border-border text-foreground hover:bg-accent px-8">
              Annuler
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Enregistrer mon inscription
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Registration;
