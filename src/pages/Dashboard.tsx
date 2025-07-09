
import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardActions,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, MapPin } from "lucide-react";

const Dashboard = () => {
  const upcomingCourses = [
    {
      id: 1,
      date: "mardi 24 décembre",
      type: "Cours individuel",
      time: "09:00 - 10:00",
    },
    {
      id: 2,
      date: "mercredi 18 décembre", 
      type: "Stage",
      time: "04:00 - 06:00",
    },
    {
      id: 3,
      date: "mercredi 11 décembre",
      type: "Cours individuel", 
      time: "06:00 - 08:00",
    },
  ];

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
          {upcomingCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className="material-surface hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-on-surface mb-1">
                      {course.date}
                    </CardTitle>
                    <CardDescription className="text-on-surface-variant">
                      Cours programmé
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-primary-m3/10">
                    <Edit className="w-4 h-4 text-primary-m3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-m3" />
                      <span className="font-medium text-on-surface">{course.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-secondary-m3" />
                      <span className="text-on-surface-variant">{course.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardActions className="justify-end">
                <Button className="material-button-outlined">Modifier</Button>
              </CardActions>
            </Card>
          ))}
        </div>

        {upcomingCourses.length === 0 && (
          <Card className="material-surface text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
              <CardTitle className="text-2xl font-semibold text-on-surface mb-2">
                Aucun cours planifié
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
