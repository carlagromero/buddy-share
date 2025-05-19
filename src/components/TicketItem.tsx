import React, { useState } from "react";
import { Ticket } from "../types";
import { useTickets } from "../context/TicketsContext";
import { Ticket as TicketIcon, X } from "lucide-react";

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
  const [isChecked, setIsChecked] = useState(false);

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
        <div className="flex gap-3">
          {ticket.isCombo && (
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={(e) => {
                  e.stopPropagation();
                  setIsChecked(e.target.checked);
                }}
              />
              <div
                className={`h-5 w-5 rounded flex items-center justify-center transition-colors border ${
                  isChecked
                    ? "bg-green-600 border-green-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <svg
                  className={`h-4 w-4 text-white ${
                    isChecked ? "block" : "hidden"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>
          )}
          <div className="flex flex-col">
            <span className="font-medium">Section {ticket.section}</span>
            <span className="text-gray-600 text-sm">
              Row {ticket.row}, Seat {ticket.seat}
            </span>
            {ticket.isCombo && (
              <div className="flex items-center bg-yellow-100 text-sm text-gray-500 gap-2">
                <span>
                  <TicketIcon size={20} />
                </span>
                <span>{ticket.comboSize} tickets</span>
              </div>
            )}
          </div>
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
