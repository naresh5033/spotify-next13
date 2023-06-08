"use client";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
import Library from "./Library";
import { useMemo } from "react";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
  const pathname = usePathname(); // from navigation
  const player = usePlayer();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search', // the home path is active evrytime its not search 
      href: '/'
    },
    {
      icon: BiSearch,
      label: 'Search',
      href: '/search',
      active: pathname === '/search' //the search path is active evrytime its on search
    },
  ], [pathname]);

  return ( //the main class will be dynamic depend on whether we open the player or not
    <div 
      className={twMerge(`
        flex 
        h-full
        `,
        player.activeId && 'h-[calc(100%-80px)]' // the player heigh will be 80px up when its playing otherwise its hidden
      )}
    >
      {/* the mobie 1st approach, initially its hidden */}
      <div 
        className="
          hidden 
          md:flex 
          flex-col 
          gap-y-2 
          bg-black 
          h-full 
          w-[300px] 
          p-2
        "
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}
 
export default Sidebar;
