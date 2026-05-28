import { navLinks } from "@/constants/navLinks";
import { Link } from "react-router-dom";
import {
  Sidebar as Side,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export default function Sidebar() {
  return (
    <Side side="left" variant="inset" className="md:hidden">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-4">
            {navLinks.map(({ label, to }, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link to={to}>{label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Side>
  );
}
