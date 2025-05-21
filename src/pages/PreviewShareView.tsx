import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";
import TicketItem from "../components/TicketItem";
import SeatMap from "../components/SeatMap";
import { useTickets } from "../context/TicketsContext";

const PreviewShareView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const {
    events,
    selectedTickets,
    getTicketsForEvent,
    assignments,
    completeShare,
  } = useTickets();

  const [isShared, setIsShared] = useState(false);

  const event = events.find((e) => e.id === eventId);
  const allTickets = eventId ? getTicketsForEvent(eventId) : [];
  const selectedTicketObjects = allTickets.filter((t) =>
    selectedTickets.includes(t.id)
  );

  // Group tickets by section
  const ticketsBySection = selectedTicketObjects.reduce<
    Record<string, typeof selectedTicketObjects>
  >((acc, ticket) => {
    if (Object.keys(assignments).includes(ticket.id)) {
      if (!acc[ticket.section]) {
        acc[ticket.section] = [];
      }
      acc[ticket.section].push(ticket);
    }
    return acc;
  }, {});

  const handleShare = () => {
    completeShare();
    setIsShared(true);

    // Simulate redirect after sharing
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  if (isShared) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-secondary rounded-full p-4 mb-4">
          <CheckCircle2 size={48} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          BuddyShare Complete!
        </h2>
        <p className="text-gray-600 mb-6">
          Tickets has been shared and notifications sent.
        </p>
        <p className="text-sm text-gray-500">Redirecting to your events...</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Preview & Share</h2>
        <p className="text-gray-600">
          Review and confirm your ticket assignments for {event.team} vs.{" "}
          {event.opponent}
        </p>
      </div>

      {Object.entries(ticketsBySection).map(([section, tickets]) => (
        <div key={section} className="mb-8">
          <h3 className="font-medium text-lg mb-3">Section {section}</h3>
          <SeatMap tickets={tickets} section={section} />

          <div className="bg-white rounded-lg shadow-sm p-4">
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={{
                  ...ticket,
                  assigned: assignments[ticket.id].buddyId,
                }}
                isSelectable={false}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex justify-end">
          <button
            onClick={handleShare}
            className="flex items-center justify-center px-8 py-3 bg-primary rounded-md text-white font-medium hover:bg-primary transition-colors"
          >
            Share Now
            <Send size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewShareView;
