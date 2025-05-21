import React from "react";
import { Link } from "react-router-dom";
import { Share2, Send } from "lucide-react";
import { Event } from "../types";
import { useTickets } from "../context/TicketsContext";
import { formatDate } from "../utils/helpers";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { setSelectedEventId } = useTickets();

  const handleBuddyShareClick = () => {
    setSelectedEventId(event.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
      <div className="h-40 overflow-hidden relative">
        <img
          src={event.imageUrl}
          alt={`${event.team} vs ${event.opponent}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold">
            {event.team} vs {event.opponent}
          </h3>
          <p className="text-white/90 text-sm">
            {formatDate(event.date)} • {event.time}
          </p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 mb-2">{event.venue}</p>

        <div className="flex space-x-2 mt-4">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            <Send size={18} className="mr-2" />
            Transfer
          </button>

          <Link
            to={`/tickets/${event.id}`}
            className="flex items-center justify-center px-4 py-2 bg-green-600 rounded-md text-white font-medium hover:bg-green-700 transition-colors"
            onClick={handleBuddyShareClick}
          >
            <Share2 size={18} className="mr-2" />
            BuddyShare
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
