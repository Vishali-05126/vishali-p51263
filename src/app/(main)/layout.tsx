"use client"
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  BarChart3,
  User,
  Zap,
  MessageSquare,
  Brain,
  BookOpen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/progress", label: "Stats", icon: BarChart3 },
    { href: "/analysis", label: "Scan", icon: Zap },
    { href: "/mental-readiness", label: "Mindset", icon: Brain },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/team", label: "Team", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Logo className="size-8 text-primary" />
              <span className="text-2xl font-semibold font-headline tracking-wider">PlaySafe</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{children: item.label}}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex justify-center group-data-[collapsible=icon]:hidden">
              <span className="text-xs text-muted-foreground">© 2024 PlaySafe</span>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
