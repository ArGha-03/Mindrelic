import { AllIcon } from "../icons/AllIcon";
import { CollapseIcon } from "../icons/ColapseIcon";
import { Logo } from "../icons/Logo";
import { TweetIcon } from "../icons/TweetIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedType: "youtube" | "twitter" | "all";
  setSelectedType: React.Dispatch<React.SetStateAction<"youtube" | "twitter" | "all">>;
}

export const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  selectedType,
  setSelectedType,
}: SidebarProps) => {
  return (
    <nav
      aria-label="Primary sidebar navigation"
      className={`
        fixed top-0 left-0 h-screen border-r-2 border-gray-200 bg-white flex flex-col
        transition-width duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "sm:w-64 w-40"}
        
        z-50
      `}
    >
      <div className="flex items-center justify-between p-4 text-purple-600 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Logo />
          {!isCollapsed && (
            <div className="text-2xl text-black font-bold select-none">Mindly</div>
          )}
        </div>

        <button
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1 rounded hover:bg-gray-200 focus:outline-none"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <CollapseIcon isCollapsed={isCollapsed} />
        </button>
      </div>

      <div className="pt-8 flex flex-col space-y-1 flex-1 overflow-auto">
        <SidebarItem
          icon={<YoutubeIcon />}
          text="Youtube"
          active={selectedType === "youtube"}
          onClick={() => setSelectedType("youtube")}
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={<TweetIcon />}
          text="Twitter"
          active={selectedType === "twitter"}
          onClick={() => setSelectedType("twitter")}
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={
            <AllIcon/>
          }
          text="All"
          active={selectedType === "all"}
          onClick={() => setSelectedType("all")}
          collapsed={isCollapsed}
        />
      </div>
    </nav>
  );
};
