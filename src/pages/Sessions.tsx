
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
import { Calendar, Clock, Users, MapPin, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/api";
import type { Session as SessionType } from "@/types";

const Sessions = () => {
  const [sessions, setSessions] = useState<SessionType[]>([]);

  useEffect(() => {
    api
      .getSeances()
      .then(setSessions)
      .catch(() => setSessions([]));
  }, []);

  const handleDelete = async (id: string) => {
    await api.deleteSeance(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "INDIVIDUAL":
        return "bg-blue-100 text-blue-800";
      case "COLLECTIVE":
        return "bg-green-100 text-green-800";
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
          {sessions.map((session, index) => (
            <Card
              key={session.id}
              className="hover:shadow-lg transition-shadow duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold text-black">
                    {session.theme}
                  </CardTitle>
                  <Badge className={getTypeColor(session.seanceType)}>
                    {session.seanceType}
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
                  <span>
                    {(() => {
                      const start = new Date(`${session.date}T${session.hour}`);
                      const end = new Date(start.getTime() + session.durationInMinutes * 60000);
                      return `${start.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})} - ${end.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`;
                    })()}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{session.players?.length ?? 0} participants</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{session.court || '-'}</span>
                </div>
              </CardContent>
              <CardActions className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 text-black border-black hover:bg-gray-100"
                >
                  <Link to={`/sessions/${session.id}`}>Modifier</Link>
                </Button>
                <Button
                  className="flex-1 bg-destructive text-white"
                  onClick={() => handleDelete(session.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>

        {sessions.length === 0 && (
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
