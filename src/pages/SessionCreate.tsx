
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Users, Clock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

const SessionCreate = () => {
  const [openSections, setOpenSections] = useState<string[]>(["planning"]);
  const { toast } = useToast();

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(item => item !== section)
        : [...prev, section]
    );
  };

  const handleCreateSession = () => {
    toast({
      title: "Séance créée avec succès",
      description: "Votre nouvelle séance a été programmée",
    });
  };

  const sections = [
    {
      id: "planning",
      title: "Planification de la séance",
      icon: Calendar,
      description: "Définissez la date, l'heure et la durée"
    },
    {
      id: "content", 
      title: "Contenu de la séance",
      icon: Clock,
      description: "Configurez les exercices et objectifs"
    },
    {
      id: "players",
      title: "Choix des joueurs", 
      icon: Users,
      description: "Sélectionnez les participants"
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-on-surface mb-2">
            Création d'une séance
          </h1>
          <p className="text-on-surface-variant text-lg">
            Configurez votre nouvelle séance d'entraînement
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <Collapsible 
              key={section.id}
              open={openSections.includes(section.id)}
              onOpenChange={() => toggleSection(section.id)}
            >
              <Card className="material-surface animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-surface-container transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-m3/10 rounded-full flex items-center justify-center">
                          <section.icon className="w-6 h-6 text-primary-m3" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-semibold text-on-surface">
                            {section.title}
                          </CardTitle>
                          <p className="text-on-surface-variant mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`w-6 h-6 text-on-surface-variant transition-transform duration-200 ${
                          openSections.includes(section.id) ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="p-6 bg-surface-container rounded-lg">
                      <p className="text-on-surface-variant">
                        Contenu de la section {section.title.toLowerCase()}...
                      </p>
                      {/* Add specific form fields for each section here */}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button 
            className="material-button px-12 py-4 text-lg"
            onClick={handleCreateSession}
          >
            Créer la séance
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SessionCreate;
