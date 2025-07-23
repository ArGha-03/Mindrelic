import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "youtube" | "twitter" | "all"
  >("all");

  const contents = useContent();

  const filteredContents =
    selectedType === "all"
      ? contents
      : contents.filter((c) => c.type === selectedType);

  let sidebarWidth = sidebarCollapsed ? 64 : 256;
  if(window.innerWidth < 640 && !sidebarCollapsed){
    sidebarWidth = 160
  }

  useEffect(() => {
    if (window.innerWidth < 640) {
      setSidebarCollapsed(true);
    }
  }, [selectedType]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <main
        className={`flex-1 p-6 transition-all duration-300 ease-in-out sm:ml-64 ml-40`}
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div
          role="toolbar"
          aria-label="Dashboard actions"
          className="flex gap-4 justify-end mb-6"
        >
          <Button
            startIcon={<ShareIcon size="md" />}
            variant="secondary"
            text="Share Brain"
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            variant="primary"
            text="Add Content"
            onClick={() => setModalOpen(true)}
          />
        </div>

        {filteredContents.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No content available for {selectedType}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredContents.map(({ type, link, title }, index) => (
              <Card
                key={`${link}-${index}`}
                type={type}
                link={link}
                title={title}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
