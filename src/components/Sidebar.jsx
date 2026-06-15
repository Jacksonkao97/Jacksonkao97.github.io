import { navLinks } from "@/constants/navLinks";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import {
  Sidebar as Side,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

export default function Sidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Side side="left" variant="inset" className="md:hidden">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-4">
            <Link
              to="/"
              onClick={() => setOpenMobile(false)}
              className="font-display mt-4 ml-2 text-xl"
            >
              jacksonkao.dev
            </Link>
            <Separator />
            {navLinks.map(({ label, to }, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link to={to} onClick={() => setOpenMobile(false)}>
                    {label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Side>
  );
}
