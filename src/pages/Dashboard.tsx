
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, Trash } from "lucide-react";
import { api } from "@/api";
import type { Activity } from "@/types";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigate = useNavigate();

  const handleDelete = async (
    e: React.MouseEvent,
    activity: Activity
  ): Promise<void> => {
    e.stopPropagation();
    try {
      if (activity.type === "TOURNAMENT") {
        await api.deleteTournament(activity.id);
      } else {
        await api.deleteSeance(activity.id);
      }
      setActivities((prev) => prev.filter((a) => a.id !== activity.id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void (async () => {
      try {
        const data = await api.getActivities();
        setActivities(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-on-surface mb-2">
              Mes prochaines activités
            </h1>
            <p className="text-on-surface-variant text-lg">
              Gérez vos cours et tournois de squash facilement
            </p>
          </div>
        </div>
        <div className="grid gap-6">
          {activities.map((activity, index) => (
            <Card
              key={activity.id}
              className="material-surface hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() =>
                navigate(
                  activity.type === "TOURNAMENT"
                    ? `/participants?tournamentId=${activity.id}`
                    : `/sessions/${activity.id}`
                )
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-on-surface mb-1">
                      {activity.title}
                    </CardTitle>
                    <CardDescription className="text-on-surface-variant">
                      {activity.type === "TOURNAMENT" ? "Tournoi" : "Séance"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-error/10"
                      onClick={(e) => handleDelete(e, activity)}
                    >
                      <Trash className="w-4 h-4 text-error" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-m3" />
                      <span className="font-medium text-on-surface">{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-secondary-m3" />
                      <span className="text-on-surface-variant">{activity.hour}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activities.length === 0 && (
          <Card className="material-surface text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
              <CardTitle className="text-2xl font-semibold text-on-surface mb-2">
                Aucune activité planifiée
              </CardTitle>
              <CardDescription className="text-on-surface-variant mb-6">
                Commencez par créer votre premier cours ou séance
              </CardDescription>
              <Button className="material-button">
                Créer une séance
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
