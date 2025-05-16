import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Shuffle } from "lucide-react";
import BuddyItem from "../components/BuddyItem";
import { useTickets } from "../context/TicketsContext";

const BuddyAssignmentView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const {
    events,
    buddies,
    selectedTickets,
    getTicketsForEvent,
    autoAssignTickets,
    clearAssignments,
  } = useTickets();

  const [assignMode, setAssignMode] = useState<"manual" | "auto">("manual");

  const event = events.find((e) => e.id === eventId);
  const allTickets = eventId ? getTicketsForEvent(eventId) : [];
  const selectedTicketObjects = allTickets.filter((t) =>
    selectedTickets.includes(t.id)
  );

  const handleToggleAssignMode = () => {
    if (assignMode === "manual") {
      setAssignMode("auto");
      autoAssignTickets();
    } else {
      setAssignMode("manual");
      clearAssignments();
    }
  };

  const handleContinue = () => {
    if (eventId) {
      navigate(`/preview/${eventId}`);
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Assign Tickets</h2>
        <p className="text-gray-600">
          Choose who gets which ticket for {event.team} vs. {event.opponent}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Assignment Mode</h3>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="manual"
                checked={assignMode === "manual"}
                onChange={() => handleToggleAssignMode()}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="manual" className="ml-2 text-sm text-gray-700">
                Manual Assignment
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="auto"
                checked={assignMode === "auto"}
                onChange={() => handleToggleAssignMode()}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="auto" className="ml-2 text-sm text-gray-700">
                Auto Assignment
              </label>
            </div>

            {assignMode === "manual" && (
              <button
                onClick={autoAssignTickets}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Shuffle size={16} className="mr-1" />
                Suggest
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedTicketObjects.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            No tickets selected. Please go back and select tickets to share.
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Frequently Shared With</h3>
          <div className="bg-white rounded-lg shadow-sm p-4">
            {buddies.map((buddy) => (
              <BuddyItem
                key={buddy.id}
                buddy={buddy}
                availableTickets={selectedTicketObjects}
              />
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex justify-end">
          <button
            onClick={handleContinue}
            disabled={selectedTickets.length === 0}
            className={`flex items-center justify-center px-6 py-2 rounded-md font-medium ${
              selectedTickets.length > 0
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            Preview & Share
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuddyAssignmentView;
