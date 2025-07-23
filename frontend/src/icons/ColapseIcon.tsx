export const CollapseIcon = ({isCollapsed}: { isCollapsed: boolean }) => {
  return (
    <svg
      className={`w-5 h-5 text-purple-600 transform transition-transform duration-300 ${
        isCollapsed ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
};
