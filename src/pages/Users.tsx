import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { api } from "@/api";
import type { User } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    api
      .getUsers()
      .then(setUsers)
      .catch((err: unknown) => {
        setUsers([]);
        toast({
          title: err instanceof Error ? err.message : "Erreur lors du chargement",
          variant: "destructive",
        });
      });
  }, [toast]);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      await api.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast({ title: "Utilisateur supprimé", variant: "success" });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Utilisateurs</h1>
            <p className="text-gray-600 text-lg">Gérez les utilisateurs de la plateforme</p>
          </div>
          <Button
            className="bg-primary-m3 text-white hover:bg-primary-m3/90"
            onClick={() => navigate("/users/new")}
          >
            <Plus className="w-4 h-4 mr-2" /> Nouvel utilisateur
          </Button>
        </div>

        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Liste des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="cursor-pointer" onClick={() => navigate(`/users/${user.id}`)}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell className="font-medium">{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-destructive text-white hover:bg-destructive/90"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {users.length === 0 && (
              <p className="text-center text-black py-6">Aucun utilisateur trouvé</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
