import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
);

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const toggle = React.useCallback(() => setOpen((o) => !o), []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { open, setOpen, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className={cn(
            "w-64 bg-sidebar text-sidebar-foreground p-0 [&>button]:hidden",
            className
          )}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200",
        open ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn("h-8 w-8 flex items-center justify-center", className)}
      {...props}
    >
      <PanelLeft className="w-4 h-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2 flex-1", className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-2", className)} {...props} />;
}

export function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full", className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-col", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("flex flex-col", className)} {...props} />;
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
}
export function SidebarMenuButton({ className, asChild, isActive, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? ("span" as any) : "button";
  return (
    <Comp
      className={cn(
        "flex items-center gap-4 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSub({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("ml-4 flex flex-col", className)} {...props} />;
}

export function SidebarMenuSubItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("flex", className)} {...props} />;
}

interface SidebarMenuSubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  isActive?: boolean;
}
export function SidebarMenuSubButton({ className, asChild, isActive, ...props }: SidebarMenuSubButtonProps) {
  const Comp = asChild ? ("span" as any) : "a";
  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-sidebar-accent",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
};
