import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle, Ticket } from "lucide-react";
import TicketItem from "../components/TicketItem";
import { useTickets } from "../context/TicketsContext";

const TicketSelectionView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    events,
    setSelectedEventId,
    getTicketsForEvent,
    buddies,
    assignTicket,
    assignments,
    groups,
    resetState,
    modeView,
    setModeView,
  } = useTickets();

  const [selectedBuddyId, setSelectedBuddyId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [groupBuddies, setGroupBuddies] = useState<string[]>([]);

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
      setModeView("groups");
    }
  }, [eventId, setModeView, setSelectedEventId]);

  useEffect(() => {
    navigate(location.pathname, {
      replace: true,
      state: {
        ...location.state,
        fromAssignComplete: Object.keys(assignments).length > 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignments]);

  const handleBuddyClick = (id: string) => {
    if (modeView === "groups") {
      setSelectedGroupId(id === selectedGroupId ? null : id);
      setGroupBuddies(groups.find((group) => group.id === id)?.buddies ?? []);
    } else {
      setSelectedBuddyId(id === selectedBuddyId ? null : id);
    }
  };

  const handleTicketClick = (ticketId: string) => {
    if (modeView === "individuals") {
      if (!selectedBuddyId) {
        return;
      }

      // Assign to selected buddy
      assignTicket(ticketId, selectedBuddyId);
      // Clear selection after assignment
      setSelectedBuddyId(null);
    } else {
      if (!selectedGroupId || groupBuddies.length === 0) {
        return;
      }

      // Assign the ticket to the first buddy in the group
      assignTicket(ticketId, groupBuddies[0]);
      // Remove the first buddy from the list
      setGroupBuddies((prevState) => {
        const newState = prevState.slice(1);
        if (!newState.length) setSelectedGroupId(null);
        return newState;
      });
    }
  };

  const handleContinue = () => {
    if (Object.keys(assignments).length > 0 && eventId) {
      navigate(`/preview/${eventId}`);
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  const ticketsAssigned = Object.entries(assignments).reduce(
    (acc, [ticketId, { buddyId, isComboBox }]) => {
      if (!buddyId) return acc;

      const ticket = tickets.find((t) => t.id === ticketId);
      return acc + (isComboBox ? ticket?.comboSize || 0 : 1);
    },
    0
  );

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {event.team} vs. {event.opponent}
        </h2>
        <p className="text-gray-600">
          Select a{" "}
          <span className="font-semibold">
            {modeView === "groups" ? "group" : "contact"}
          </span>{" "}
          to assign {modeView === "groups" ? "tickets" : "a ticket"}
        </p>

        <div className="flex items-center mt-4">
          <button
            onClick={() => {
              setModeView(modeView === "groups" ? "individuals" : "groups");
              resetState();
              setSelectedGroupId(null);
              setSelectedGroupId(null);
              setGroupBuddies([]);
            }}
            className="relative inline-flex h-12 w-48 items-center rounded-md border border-gray-300 bg-white p-1"
          >
            <span
              className={`flex h-full w-1/2 cursor-pointer items-center justify-center rounded-l-md font-medium transition-colors ${
                modeView === "groups"
                  ? "bg-green-600 text-white"
                  : "text-gray-700"
              }`}
            >
              Groups
            </span>

            <span
              className={`flex h-full w-1/2 cursor-pointer items-center justify-center rounded-r-md font-medium transition-colors ${
                modeView === "groups"
                  ? "text-gray-700"
                  : "bg-green-600 text-white"
              }`}
            >
              Individuals
            </span>
          </button>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mb-8">
        {modeView === "groups" ? (
          // Groups
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groups
              .filter((group) =>
                group.buddies.some((buddyId) =>
                  buddies.some((b) => b.id === buddyId && b.isActive)
                )
              )
              .map((group) => {
                const isGroupAssigned = group.buddies.every((buddyId) =>
                  Object.values(assignments)
                    .map((value) => value.buddyId)
                    .includes(buddyId)
                );

                return (
                  <button
                    disabled={isGroupAssigned}
                    key={group.id}
                    onClick={() => handleBuddyClick(group.id)}
                    className={`flex items-center p-3 rounded-lg border transition-all relative ${
                      selectedBuddyId === group.id ||
                      (selectedGroupId === group.id && groupBuddies.length > 0)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex flex-wrap -space-x-3 justify-end">
                      {group.buddies.slice(0, 4).map((buddyId) => {
                        const item = buddies.find((b) => b.id === buddyId);
                        if (!item || !item.isActive) return null;

                        return (
                          <img
                            key={item.id}
                            src={item.avatar}
                            alt={item.name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        );
                      })}
                    </div>

                    <div className="ml-3 text-left">
                      <h4 className="font-medium text-gray-800">
                        {group.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {group.buddies
                          .map((buddyId) =>
                            buddies.find(
                              (item) => item.id === buddyId && item.isActive
                            )
                          )
                          .filter(Boolean)
                          .map((b) => b!.name)
                          .join(", ")}
                      </p>
                    </div>

                    {isGroupAssigned && (
                      <CheckCircle
                        className="absolute top-2 right-2 text-green-500"
                        size={18}
                      />
                    )}
                  </button>
                );
              })}
          </div>
        ) : (
          // Individuals
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {buddies
              .filter((buddy) => buddy.id && buddy.isActive)
              .map((buddy) => {
                const hasTicket = Object.values(assignments).some(
                  (value) => value.buddyId === buddy.id
                );

                const assignedTicketId = Object.entries(assignments).find(
                  ([, value]) => value.buddyId === buddy.id
                )?.[0];
                const assignedTicket = assignedTicketId
                  ? tickets.find((t) => t.id === assignedTicketId)
                  : undefined;

                return (
                  <button
                    key={buddy.id}
                    onClick={() => handleBuddyClick(buddy.id)}
                    className={`flex items-center p-3 rounded-lg border transition-all ${
                      selectedBuddyId === buddy.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3 text-left">
                      <h4 className="font-medium text-gray-800">
                        {buddy.name}
                      </h4>
                      {hasTicket && assignedTicket ? (
                        <p className="text-sm text-green-600">
                          Sec {assignedTicket.section}, Seat{" "}
                          {assignedTicket.seat}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          {buddy.phone}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {/* Tickets Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Ticket size={20} className="text-gray-500 mr-2" />
          <h3 className="font-medium text-lg">My Tickets</h3>
        </div>
        {Object.entries(ticketsBySection).map(([section, sectionTickets]) => (
          <div key={section} className="mb-8">
            <h4 className="font-medium mb-3">Section {section}</h4>
            <div className="bg-white rounded-lg shadow-sm p-4">
              {sectionTickets.map((ticket) => {
                const isAssigned = assignments[ticket.id]?.buddyId ?? false;

                return (
                  <div
                    key={ticket.id}
                    onClick={() => !isAssigned && handleTicketClick(ticket.id)}
                    className="cursor-pointer"
                  >
                    <TicketItem
                      ticket={{
                        ...ticket,
                        assigned: isAssigned,
                      }}
                      isSelectable={!!(selectedGroupId || selectedBuddyId)}
                      isEditable
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
              {ticketsAssigned} ticket
              {ticketsAssigned === 1 ? "" : "s"} assigned
            </p>
          </div>

          <button
            onClick={handleContinue}
            disabled={!ticketsAssigned}
            className={`flex items-center justify-center px-6 py-2 rounded-md font-medium ${
              ticketsAssigned
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
