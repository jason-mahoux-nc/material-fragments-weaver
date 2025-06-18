
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
import { Calendar, Clock, Users, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Sessions = () => {
  // Données d'exemple pour les séances
  const upcomingSessions = [
    {
      id: 1,
      title: "Entraînement technique",
      date: "2024-03-12",
      time: "18:00",
      duration: "1h30",
      participants: 8,
      maxParticipants: 10,
      court: "Court 1",
      type: "Entraînement"
    },
    {
      id: 2,
      title: "Séance cardio",
      date: "2024-03-14",
      time: "19:30",
      duration: "1h",
      participants: 6,
      maxParticipants: 8,
      court: "Court 2",
      type: "Fitness"
    },
    {
      id: 3,
      title: "Match amical",
      date: "2024-03-16",
      time: "14:00",
      duration: "2h",
      participants: 12,
      maxParticipants: 16,
      court: "Courts 1-2",
      type: "Match"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Entraînement":
        return "bg-blue-100 text-blue-800";
      case "Fitness":
        return "bg-green-100 text-green-800";
      case "Match":
        return "bg-orange-100 text-orange-800";
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
              Mes prochaines séances
            </h1>
            <p className="text-gray-600 text-lg">
              Gérez vos séances d'entraînement et matchs à venir
            </p>
          </div>
          <Link to="/session/create">
            <Button className="bg-primary-m3 hover:bg-primary-m3/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Créer une séance
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingSessions.map((session, index) => (
            <Card 
              key={session.id} 
              className="hover:shadow-lg transition-shadow duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold text-black">
                    {session.title}
                  </CardTitle>
                  <Badge className={getTypeColor(session.type)}>
                    {session.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 h-full">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(session.date).toLocaleDateString('fr-FR')}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{session.time} - {session.duration}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{session.participants}/{session.maxParticipants} participants</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{session.court}</span>
                </div>
              </CardContent>
              <CardActions className="flex gap-2">
                <Button variant="outline" className="flex-1 text-black border-black hover:bg-gray-100">
                  Modifier
                </Button>
                <Button className="flex-1 bg-primary-m3 hover:bg-primary-m3/90 text-white">
                  Voir détails
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>

        {upcomingSessions.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                Aucune séance planifiée
              </h3>
              <p className="text-gray-600 mb-6">
                Créez votre première séance d'entraînement ou planifiez un match
              </p>
              <Link to="/session/create">
                <Button className="bg-primary-m3 hover:bg-primary-m3/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une séance
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Sessions;
