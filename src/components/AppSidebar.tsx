
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = !open && !isMobile;

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className="border-r border-surface-variant bg-surface">
      <div className={`p-8 ${isCollapsed ? 'p-4' : 'p-8'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
          <div className="w-10 h-10 bg-primary-m3 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <h2 className="text-xl font-semibold text-sidebar-foreground whitespace-nowrap">Easy Squash</h2>
          )}
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-3">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.subItems ? (
                  <Collapsible 
                    open={openGroups.includes(item.title) && !isCollapsed}
                    onOpenChange={() => !isCollapsed && toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className={`w-full justify-between hover:bg-surface-container py-3 px-4 ${
                          isCollapsed ? 'justify-center px-2' : ''
                        }`}
                      >
                        <div className={`flex items-center ${isCollapsed ? '' : 'gap-4'}`}>
                          <item.icon className="w-5 h-5 text-sidebar-foreground flex-shrink-0" />
                          {!isCollapsed && (
                            <span className="font-medium text-sidebar-foreground whitespace-nowrap">{item.title}</span>
                          )}
                        </div>
                        {!isCollapsed && (
                          <ChevronDown className={`w-4 h-4 transition-transform text-sidebar-foreground ${openGroups.includes(item.title) ? 'rotate-180' : ''}`} />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub className="mt-2 ml-2">
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title} className="mb-1">
                              <SidebarMenuSubButton 
                                asChild 
                                isActive={location.pathname === subItem.url}
                                className="hover:bg-primary-m3/10 py-2 px-4"
                              >
                                <Link to={subItem.url}>
                                  <span className="text-sidebar-foreground whitespace-nowrap">{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className={`hover:bg-surface-container py-3 px-4 ${
                      isCollapsed ? 'justify-center px-2' : ''
                    }`}
                  >
                    <Link to={item.url || "#"}>
                      <item.icon className="w-5 h-5 text-sidebar-foreground flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium text-sidebar-foreground whitespace-nowrap">{item.title}</span>
                      )}
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
