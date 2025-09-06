import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Save } from "lucide-react";
import { api } from "@/api";
import type { User } from "@/types";
import { useToast } from "@/hooks/use-toast";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!id) return;
    api.getUser(id).then(setFormData).catch(() => {
      toast({ title: "Utilisateur introuvable", variant: "destructive" });
    });
  }, [id, toast]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!id) return;
    await api.updateUser(id, formData);
    toast({ title: "Utilisateur mis à jour", variant: "success" });
    navigate("/users");
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await api.deleteUser(id);
    toast({ title: "Utilisateur supprimé", variant: "success" });
    navigate("/users");
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Fiche utilisateur</h1>
        </div>
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Modifier l'utilisateur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-black font-medium">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="bg-background border-border text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-black font-medium">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="bg-background border-border text-black"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-background border-border text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-black font-medium">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="bg-background border-border text-black"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="destructive"
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Supprimer
              </Button>
              <Button
                className="bg-primary-m3 text-white hover:bg-primary-m3/90"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" /> Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDetail;
