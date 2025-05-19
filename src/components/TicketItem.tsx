import React from "react";
import { Ticket } from "../types";
import { useTickets } from "../context/TicketsContext";
import { X } from "lucide-react";

interface TicketItemProps {
  ticket: Ticket;
  isSelectable?: boolean;
  showClearButton?: boolean;
}

const TicketItem: React.FC<TicketItemProps> = ({
  ticket,
  isSelectable = true,
  showClearButton = false,
}) => {
  const { toggleTicketSelection, assignments, getBuddyById, clearAssignments } =
    useTickets();

  const assignedBuddy = ticket.assigned || assignments[ticket.id];
  const buddy = assignedBuddy ? getBuddyById(assignedBuddy) : undefined;

  return (
    <div
      className={`relative border rounded-lg p-4 mb-2 transition-all border-gray-200 hover:border-gray-300 ${
        isSelectable ? "cursor-pointer" : ""
      }`}
      onClick={() => isSelectable && toggleTicketSelection(ticket.id)}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-medium">Section {ticket.section}</span>
          <span className="text-gray-600 text-sm">
            Row {ticket.row}, Seat {ticket.seat}
          </span>
        </div>

        {buddy && (
          <div className="flex items-center">
            {showClearButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearAssignments(ticket.id);
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Clear selection"
              >
                <X size={18} />
              </button>
            )}
            <img
              src={buddy.avatar}
              alt={buddy.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{buddy.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
