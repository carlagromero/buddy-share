import React from "react";
import { Ticket } from "../types";
import { useTickets } from "../context/TicketsContext";
import { getAvatarSrc } from "../utils/helpers";
import logo from "../assets/images/seats.png"; // si tenés alias "@" para src

interface SeatMapProps {
  tickets: Ticket[];
  section: string;
}

const SeatMap: React.FC<SeatMapProps> = ({ tickets, section }) => {
  const { assignments, getBuddyById } = useTickets();

  // Group tickets by row
  const ticketsByRow = tickets.reduce<Record<string, Ticket[]>>(
    (acc, ticket) => {
      if (!acc[ticket.row]) {
        acc[ticket.row] = [];
      }
      acc[ticket.row].push(ticket);
      return acc;
    },
    {}
  );

  // Sort rows
  const sortedRows = Object.keys(ticketsByRow).sort();

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-6">
      <div className="w-full flex justify-center mb-6">
        <img src={logo} alt="Logo" className="max-w-[50%]" />
      </div>

      <h3 className="text-center font-bold mb-3">Section {section}</h3>
      {sortedRows.map((row) => (
        <div key={row} className="flex items-center mb-2">
          <span className="w-8 text-xs font-medium text-gray-600">
            Row {row}
          </span>
          <div className="flex-1 flex space-x-1 justify-center -ml-6">
            {ticketsByRow[row]
              .sort((a, b) => parseInt(a.seat) - parseInt(b.seat))
              .map((ticket) => {
                const assignedBuddy = assignments[ticket.id].buddyId;
                const buddy = assignedBuddy
                  ? getBuddyById(assignedBuddy)
                  : undefined;

                return (
                  <div
                    key={ticket.id}
                    className={`relative w-10 h-10 rounded-md flex items-center justify-center shadow-sm
                      ${
                        assignedBuddy
                          ? "bg-green-100 border border-green-500"
                          : "bg-white border border-gray-300"
                      }`}
                  >
                    <span className="text-xs">{ticket.seat}</span>

                    {buddy && (
                      <div className="absolute -bottom-6 w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src={buddy.avatar || getAvatarSrc(buddy.name)}
                          alt={buddy.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
