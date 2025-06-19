
import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardActions,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Euro, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/api";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getTournaments()
      .then(setTournaments)
      .catch(() => setTournaments([]));
  }, []);

  const handleDelete = async (id: string) => {
    await api.deleteTournament(id);
    setTournaments((prev) => prev.filter((t) => t.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Inscrit":
        return "bg-green-100 text-green-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Ouvert":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Mes prochains tournois
            </h1>
            <p className="text-gray-600 text-lg">
              Suivez vos inscriptions et découvrez de nouveaux tournois
            </p>
          </div>
          <Link to="/tournament/create">
            <Button className="bg-primary-m3 hover:bg-primary-m3/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Créer un tournoi
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament, index) => (
            <Card
              key={tournament.id}
              className="hover:shadow-lg transition-shadow duration-200 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/participants?tournamentId=${tournament.id}`)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold text-black">
                    {tournament.name}
                  </CardTitle>
                  <Badge className={getStatusColor('Ouvert')}>
                    Ouvert
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 h-full">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(tournament.date).toLocaleDateString('fr-FR')} à {tournament.startHour}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{tournament.inscriptions?.length ?? 0} participants</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Euro className="w-5 h-5" />
                  <span>{tournament.price}€</span>
                </div>
              </CardContent>
              <CardActions className="flex gap-2">
                <Link to={`/participants?tournamentId=${tournament.id}`} className="flex-1" onClick={e => e.stopPropagation()}>
                  <Button variant="outline" className="w-full text-black border-black hover:bg-gray-100">
                    Voir détails
                  </Button>
                </Link>
                <Button
                  className="flex-1 bg-destructive text-white"
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete(tournament.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>

        {tournaments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                Aucun tournoi à venir
              </h3>
              <p className="text-gray-600 mb-6">
                Créez votre premier tournoi ou inscrivez-vous à un tournoi existant
              </p>
              <Link to="/tournament/create">
                <Button className="bg-primary-m3 hover:bg-primary-m3/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un tournoi
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Tournaments;
