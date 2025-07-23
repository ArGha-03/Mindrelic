import type { ReactElement, KeyboardEvent } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  active?: boolean;
  collapsed?: boolean;
}

export const SidebarItem = ({
  text,
  icon,
  onClick,
  active = false,
  collapsed = false,
}: SidebarItemProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`
        flex items-center cursor-pointer rounded transition duration-150
        ${active ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-200"}
        focus:outline-none
        px-4 py-2
        ${collapsed ? "justify-center px-2" : ""}
      `}
      title={collapsed ? text : undefined}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && <div className="ml-3">{text}</div>}
    </div>
  );
};
