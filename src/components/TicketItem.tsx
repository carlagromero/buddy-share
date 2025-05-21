import React from "react";
import { Ticket } from "../types";
import { useTickets } from "../context/TicketsContext";
import { AlertTriangle, Ticket as TicketIcon, X } from "lucide-react";
import { getAvatarSrc } from "../utils/helpers";

interface TicketItemProps {
  ticket: Ticket;
  isSelectable?: boolean;
  isEditable?: boolean;
}

const TicketItem: React.FC<TicketItemProps> = ({
  ticket,
  isSelectable = true,
  isEditable = false,
}) => {
  const {
    toggleTicketSelection,
    assignments,
    getBuddyById,
    clearAssignments,
    setComboBoxForTicket,
  } = useTickets();

  const assignedBuddy = ticket.assigned || assignments[ticket.id]?.buddyId;
  const buddy = assignedBuddy ? getBuddyById(assignedBuddy) : undefined;
  const isComboBoxSelected = assignments[ticket.id]?.isComboBox ?? false;

  return (
    <div
      className={`relative border rounded-lg p-4 mb-2 transition-all border-gray-200 hover:border-gray-300 ${
        isSelectable ? "cursor-pointer" : ""
      }`}
      onClick={() => isSelectable && toggleTicketSelection(ticket.id)}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">Section {ticket.section}</span>
              {ticket.isCombo && (isEditable || isComboBoxSelected) && (
                <div className="flex items-center bg-blue-50 text-sm text-primary gap-1 px-1 rounded">
                  <TicketIcon size={16} />
                  <span>{ticket.comboSize} events</span>
                </div>
              )}
            </div>
            <span className="text-gray-600 text-sm">
              Row {ticket.row}, Seat {ticket.seat}
            </span>
          </div>
        </div>

        {buddy && (
          <div className="flex items-center">
            {isEditable && (
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
              src={buddy.avatar || getAvatarSrc(buddy.name || '')}
              alt={buddy.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{buddy.name}</span>
          </div>
        )}
      </div>

      {buddy && isEditable && ticket.isCombo && (
        <label className="mt-3 flex items-center gap-2 cursor-pointer text-primary text-sm">
          <input
            type="checkbox"
            className="sr-only"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setComboBoxForTicket(ticket.id, e.target.checked)}
          />
          <div
            className={`h-5 w-5 rounded flex items-center justify-center transition-colors border ${
              isComboBoxSelected
                ? "bg-primary border-primary"
                : "bg-white border-gray-300"
            }`}
          >
            <svg
              className={`h-4 w-4 text-white ${
                isComboBoxSelected ? "block" : "hidden"
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
          <span>Transfer entire season tickets</span>
        </label>
      )}

      {!isEditable && isComboBoxSelected && (
        <div className="mt-2 flex items-center gap-2 text-primary text-sm">
          <AlertTriangle size={16} />{" "}
          <span>You’re about to transfer all season tickets</span>
        </div>
      )}
    </div>
  );
};

export default TicketItem;
