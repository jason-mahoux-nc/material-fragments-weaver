
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Trophy, Euro } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";

const TournamentCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    participationFee: "",
    withMeal: false,
    mealPrice: "",
    mealContent: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createTournament(formData);
    toast({
      title: "Tournoi créé avec succès",
      description: "Votre nouveau tournoi a été enregistré",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-on-surface mb-2">
            Création d'un tournoi
          </h1>
          <p className="text-on-surface-variant text-lg">
            Organisez votre prochain tournoi de squash
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="material-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Trophy className="w-6 h-6 text-primary-m3" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-on-surface font-medium">
                    Nom du tournoi *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="material-input"
                    placeholder="ex: Tournoi de printemps"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-on-surface font-medium">
                    Date du tournoi *
                  </Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="material-input"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 w-5 h-5 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-on-surface font-medium">
                    Heure de début *
                  </Label>
                  <div className="relative">
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      className="material-input"
                      required
                    />
                    <Clock className="absolute right-3 top-3 w-5 h-5 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="participationFee" className="text-on-surface font-medium">
                    Prix de la participation *
                  </Label>
                  <div className="relative">
                    <Input
                      id="participationFee"
                      type="number"
                      value={formData.participationFee}
                      onChange={(e) => handleInputChange("participationFee", e.target.value)}
                      className="material-input pl-10"
                      placeholder="0.00"
                      required
                    />
                    <Euro className="absolute left-3 top-3 w-5 h-5 text-on-surface-variant" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="material-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                🍽️ Options de restauration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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

              {formData.withMeal && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="mealPrice" className="text-on-surface font-medium">
                      Prix du repas
                    </Label>
                    <div className="relative">
                      <Input
                        id="mealPrice"
                        type="number"
                        value={formData.mealPrice}
                        onChange={(e) => handleInputChange("mealPrice", e.target.value)}
                        className="material-input pl-10"
                        placeholder="0.00"
                      />
                      <Euro className="absolute left-3 top-3 w-5 h-5 text-on-surface-variant" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mealContent" className="text-on-surface font-medium">
                      Contenu du repas
                    </Label>
                    <Textarea
                      id="mealContent"
                      value={formData.mealContent}
                      onChange={(e) => handleInputChange("mealContent", e.target.value)}
                      className="material-input"
                      placeholder="Décrivez le menu proposé..."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 pt-6">
            <Button type="button" className="material-button-outlined px-8">
              Annuler
            </Button>
            <Button type="submit" className="material-button px-8">
              Créer le tournoi
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TournamentCreate;
