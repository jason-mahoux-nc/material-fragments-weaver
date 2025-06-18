
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Phone, Calendar, Euro, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Registration = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "0123456789",
    tournament: "squash-night",
    withMeal: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inscription enregistrée",
      description: "Votre inscription a été prise en compte avec succès",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-on-surface mb-2">
            Formulaire d'inscription
          </h1>
          <p className="text-on-surface-variant text-lg">
            Inscrivez-vous au tournoi de votre choix
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="material-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <UserPlus className="w-6 h-6 text-primary-m3" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-on-surface font-medium">
                    Nom *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="material-input"
                    placeholder="Votre nom de famille"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-on-surface font-medium">
                    Prénom *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="material-input"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-on-surface font-medium">
                  Téléphone *
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="material-input pl-10"
                    placeholder="0123456789"
                    required
                  />
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-on-surface-variant" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="material-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                🏆 Détails du tournoi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tournament" className="text-on-surface font-medium">
                  Tournoi
                </Label>
                <Select value={formData.tournament} onValueChange={(value) => handleInputChange("tournament", value)}>
                  <SelectTrigger className="material-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border border-surface-variant">
                    <SelectItem value="squash-night">Squash night</SelectItem>
                    <SelectItem value="spring-tournament">Tournoi de printemps</SelectItem>
                    <SelectItem value="summer-cup">Coupe d'été</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-surface-container rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary-m3" />
                  <span className="font-medium text-on-surface">Date du tournoi: 2024-12-23</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary-m3" />
                  <span className="text-on-surface-variant">Heure de début: 19:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <Euro className="w-5 h-5 text-tertiary" />
                  <span className="font-semibold text-on-surface">Prix total: 10.0 euros</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="withMeal"
                  checked={formData.withMeal}
                  onCheckedChange={(checked) => handleInputChange("withMeal", checked as boolean)}
                />
                <Label htmlFor="withMeal" className="text-on-surface font-medium">
                  Avec repas ?
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 pt-6">
            <Button type="button" className="material-button-outlined px-8">
              Annuler
            </Button>
            <Button type="submit" className="material-button px-8">
              Enregistrer mon inscription
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Registration;
