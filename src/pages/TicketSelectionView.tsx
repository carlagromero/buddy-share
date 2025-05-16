import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import TicketItem from "../components/TicketItem";
import { useTickets } from "../context/TicketsContext";

const TicketSelectionView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const {
    events,
    setSelectedEventId,
    getTicketsForEvent,
    buddies,
    assignTicket,
    assignments,
    // getBuddyById
  } = useTickets();

  const [selectedBuddyId, setSelectedBuddyId] = useState<string | null>(null);

  const event = events.find((e) => e.id === eventId);
  const tickets = eventId ? getTicketsForEvent(eventId) : [];

  // Group tickets by section
  const ticketsBySection = tickets.reduce<Record<string, typeof tickets>>(
    (acc, ticket) => {
      if (!acc[ticket.section]) {
        acc[ticket.section] = [];
      }
      acc[ticket.section].push(ticket);
      return acc;
    },
    {}
  );

  useEffect(() => {
    if (eventId) {
      setSelectedEventId(eventId);
    }
  }, [eventId, setSelectedEventId]);

  const handleBuddyClick = (buddyId: string) => {
    // Don't allow selecting a buddy who already has a ticket
    if (Object.values(assignments).includes(buddyId)) {
      return;
    }
    setSelectedBuddyId(buddyId === selectedBuddyId ? null : buddyId);
  };

  const handleTicketClick = (ticketId: string) => {
    if (!selectedBuddyId) {
      alert("Please select a contact first");
      return;
    }

    // Don't allow assigning if ticket is already assigned
    if (assignments[ticketId]) {
      return;
    }

    // Assign to selected buddy
    assignTicket(ticketId, selectedBuddyId);
    // Clear selection after assignment
    setSelectedBuddyId(null);
  };

  const handleContinue = () => {
    if (Object.keys(assignments).length > 0 && eventId) {
      navigate(`/preview/${eventId}`);
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {event.team} vs. {event.opponent}
        </h2>
        <p className="text-gray-600">
          Select a contact and assign them a ticket
        </p>
      </div>

      {/* Contacts Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Users size={20} className="text-gray-500 mr-2" />
          <h3 className="font-medium text-lg">Select a Contact</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {buddies.map((buddy) => {
            const hasTicket = Object.values(assignments).includes(buddy.id);
            const assignedTicketId = Object.entries(assignments).find(
              ([, id]) => id === buddy.id
            )?.[0];
            const assignedTicket = assignedTicketId
              ? tickets.find((t) => t.id === assignedTicketId)
              : undefined;

            return (
              <button
                key={buddy.id}
                onClick={() => handleBuddyClick(buddy.id)}
                disabled={hasTicket}
                className={`flex items-center p-3 rounded-lg border transition-all ${
                  selectedBuddyId === buddy.id
                    ? "border-green-500 bg-green-50"
                    : hasTicket
                    ? "border-gray-200 bg-gray-50 opacity-75 cursor-not-allowed"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <img
                  src={buddy.avatar}
                  alt={buddy.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3 text-left">
                  <h4 className="font-medium text-gray-800">{buddy.name}</h4>
                  {hasTicket && assignedTicket ? (
                    <p className="text-sm text-green-600">
                      Section {assignedTicket.section}, Seat{" "}
                      {assignedTicket.seat}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {buddy.relationship}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tickets Section */}
      <div className="mb-8">
        <h3 className="font-medium text-lg mb-4">Available Tickets</h3>
        {Object.entries(ticketsBySection).map(([section, sectionTickets]) => (
          <div key={section} className="mb-8">
            <h4 className="font-medium mb-3">Section {section}</h4>
            <div className="bg-white rounded-lg shadow-sm p-4">
              {sectionTickets.map((ticket) => {
                const isAssigned = assignments[ticket.id];
                // const assignedBuddy = isAssigned ? getBuddyById(assignments[ticket.id]) : undefined;

                return (
                  <div
                    key={ticket.id}
                    onClick={() => !isAssigned && handleTicketClick(ticket.id)}
                    className={`cursor-pointer ${
                      isAssigned ? "opacity-75" : ""
                    }`}
                  >
                    <TicketItem
                      ticket={{
                        ...ticket,
                        assigned: assignments[ticket.id],
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              {Object.keys(assignments).length} ticket
              {Object.keys(assignments).length === 1 ? "" : "s"} assigned
            </p>
          </div>

          <button
            onClick={handleContinue}
            disabled={Object.keys(assignments).length === 0}
            className={`flex items-center justify-center px-6 py-2 rounded-md font-medium ${
              Object.keys(assignments).length > 0
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

export default TicketSelectionView;
