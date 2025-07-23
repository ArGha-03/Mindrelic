import { useRef, useState, useEffect } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const CreateContentModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<"youtube" | "twitter">("youtube");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on ESC key
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const addContent = async () => {
    setError(null);
    setLoading(true);

    const title = titleRef.current?.value.trim();
    const link = linkRef.current?.value.trim();

    if (!title || !link) {
      setError("Title and Link are required.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, type },
        {
          headers: { Authorization: localStorage.getItem("token") ?? "" },
        }
      );
      onClose();
    } catch (err) {
      setError("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded"
          onClick={onClose}
          disabled={loading}
        >
          <CloseIcon />
        </button>

        <h2 id="modal-title" className="text-xl font-semibold mb-4 text-gray-800">
          Add Content
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
        )}

        <Input
          label="Title"
          placeholder="Enter the Title"
          reference={titleRef}
          type="text"
          required
          disabled={loading}
        />
        <Input
          label="Link"
          placeholder="Enter the Link"
          reference={linkRef}
          type="url"
          required
          disabled={loading}
        />

        <div className="flex space-x-4 mt-4">
          <Button
            text="YouTube"
            variant={type === "youtube" ? "primary" : "secondary"}
            onClick={() => setType("youtube")}
            aria-pressed={type === "youtube"}
            fullWidth
          />
          <Button
            text="Twitter"
            variant={type === "twitter" ? "primary" : "secondary"}
            onClick={() => setType("twitter")}
            aria-pressed={type === "twitter"}
            fullWidth
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={addContent}
            variant="primary"
            text={loading ? "Submitting..." : "Submit"}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};
