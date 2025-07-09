
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Users, Clock, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";
import { RichTextEditor } from "@/components/RichTextEditor";

const SessionCreate = () => {
  const [openSections, setOpenSections] = useState<string[]>(["planning"]);
  const [planningData, setPlanningData] = useState({ date: "", time: "", duration: "" });
  const [contentData, setContentData] = useState({ theme: "", description: "" });
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [newPlayer, setNewPlayer] = useState({ firstName: "", lastName: "", phoneNumber: "", email: "" });
  const { toast } = useToast();

  useEffect(() => {
    api
      .getUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(item => item !== section)
        : [...prev, section]
    );
  };

  const handlePlanningChange = (field: string, value: string) => {
    setPlanningData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (field: string, value: string) => {
    setContentData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPlayer = (player: any) => {
    if (!selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers(prev => [...prev, player]);
    }
  };

  const handleRemovePlayer = (id: string) => {
    setSelectedPlayers(prev => prev.filter(p => p.id !== id));
  };

  const handleCreatePlayer = async () => {
    const created = await api.createUser(newPlayer);
    setUsers(prev => [...prev, created]);
    setSelectedPlayers(prev => [...prev, created]);
    setNewPlayer({ firstName: "", lastName: "", phoneNumber: "", email: "" });
  };

  const handleCreateSession = async () => {
    if (!planningData.date || !planningData.time || !planningData.duration || !contentData.theme || !contentData.description) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const durationMatch = planningData.duration.match(/(\d+)h(?:(\d+))?/);
    const hours = durationMatch ? parseInt(durationMatch[1]) : 0;
    const minutes = durationMatch && durationMatch[2] ? parseInt(durationMatch[2]) : 0;

    const start = new Date(`${planningData.date}T${planningData.time}`);
    const end = new Date(start.getTime() + hours * 3600000 + minutes * 60000);

    await api.createSeance({
      date: planningData.date,
      startHour: start.toISOString(),
      endHour: end.toISOString(),
      theme: contentData.theme,
      playersId: selectedPlayers.map(p => p.id),
      seanceType: 'COLLECTIVE',
    });

    toast({
      title: "Séance créée avec succès",
      description: "Votre nouvelle séance a été programmée",
      variant: "success",
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
                    {section.id === "planning" && (
                      <div className="p-6 bg-surface-container rounded-lg space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date *</Label>
                          <Input id="date" type="date" value={planningData.date} onChange={e => handlePlanningChange('date', e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Heure *</Label>
                          <Input id="time" type="time" value={planningData.time} onChange={e => handlePlanningChange('time', e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration">Durée *</Label>
                          <Input id="duration" placeholder="1h30" value={planningData.duration} onChange={e => handlePlanningChange('duration', e.target.value)} required />
                        </div>
                      </div>
                    )}
                    {section.id === "content" && (
                      <div className="p-6 bg-surface-container rounded-lg space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="theme">Thème *</Label>
                          <Input id="theme" value={contentData.theme} onChange={e => handleContentChange('theme', e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label>Description *</Label>
                          <RichTextEditor value={contentData.description} onChange={value => handleContentChange('description', value)} />
                        </div>
                      </div>
                    )}
                    {section.id === "players" && (
                      <div className="p-6 bg-surface-container rounded-lg space-y-4">
                        <Input placeholder="Rechercher un joueur" value={search} onChange={e => setSearch(e.target.value)} />
                        <div className="space-y-2 max-h-40 overflow-auto">
                          {users
                            .filter(u => `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()))
                            .map(u => (
                              <div key={u.id} className="flex justify-between items-center bg-surface-container-low p-2 rounded-md">
                                <span>{u.firstName} {u.lastName}</span>
                                <Button type="button" size="sm" onClick={() => handleAddPlayer(u)}>
                                  Ajouter
                                </Button>
                              </div>
                            ))}
                          {users.filter(u => `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button type="button" variant="outline" size="sm" className="w-full flex items-center gap-2">
                                  <Plus className="w-4 h-4" /> Créer un joueur
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Nouveau joueur</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Prénom *</Label>
                                    <Input value={newPlayer.firstName} onChange={e => setNewPlayer(prev => ({ ...prev, firstName: e.target.value }))} required />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Nom *</Label>
                                    <Input value={newPlayer.lastName} onChange={e => setNewPlayer(prev => ({ ...prev, lastName: e.target.value }))} required />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Téléphone</Label>
                                    <Input value={newPlayer.phoneNumber} onChange={e => setNewPlayer(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input type="email" value={newPlayer.email} onChange={e => setNewPlayer(prev => ({ ...prev, email: e.target.value }))} />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={handleCreatePlayer}>Créer</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>

                        <div className="space-y-2">
                          {selectedPlayers.map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-surface-container-low p-2 rounded-md">
                              <span>{p.firstName} {p.lastName}</span>
                              <Button type="button" variant="ghost" size="sm" onClick={() => handleRemovePlayer(p.id)}>❌</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
