
import {
  Calendar,
  Trophy,
  Users,
  UserPlus,
  Settings,
  Home,
  Menu,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Gestion des tournois",
    icon: Trophy,
    subItems: [
      { title: "Création de tournois", url: "/tournament/create" },
      { title: "Tableau des tournois", url: "/tournaments" },
      { title: "Liste des inscrits", url: "/participants" },
      { title: "Formulaire d'inscription", url: "/registration" },
    ]
  },
  {
    title: "Gestion des séances",
    icon: Calendar,
    subItems: [
      { title: "Création de séances", url: "/session/create" },
      { title: "Mes séances", url: "/sessions" },
    ]
  },
  {
    title: "Paramètres",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [openGroups, setOpenGroups] = useState<string[]>(["Gestion des tournois", "Gestion des séances"]);
  const location = useLocation();

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className="border-r border-surface-variant bg-surface">
      <div className="p-6 border-b border-surface-variant">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-m3 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-on-surface">Easy Squash</h2>
        </div>
      </div>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.subItems ? (
                  <Collapsible 
                    open={openGroups.includes(item.title)}
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full justify-between hover:bg-surface-container">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openGroups.includes(item.title) ? 'rotate-180' : ''}`} />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              asChild 
                              isActive={location.pathname === subItem.url}
                              className="hover:bg-primary-m3/10"
                            >
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-surface-container"
                  >
                    <Link to={item.url || "#"}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
