import React from "react";
import { CheckCircle } from "lucide-react";
import { Ticket } from "../types";
import { useTickets } from "../context/TicketsContext";

interface TicketItemProps {
  ticket: Ticket;
  isSelectable?: boolean;
}

const TicketItem: React.FC<TicketItemProps> = ({
  ticket,
  isSelectable = true,
}) => {
  const { selectedTickets, toggleTicketSelection, assignments, getBuddyById } =
    useTickets();

  const isSelected = selectedTickets.includes(ticket.id);
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

        {buddy ? (
          <div className="flex items-center">
            <img
              src={buddy.avatar}
              alt={buddy.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{buddy.name}</span>
          </div>
        ) : isSelected ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : null}
      </div>

      {/* {isSelected && isSelectable && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
          ✓
        </div>
      )} */}
    </div>
  );
};

export default TicketItem;
