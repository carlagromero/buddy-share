import React from "react";
import { useTickets } from "../context/TicketsContext";
import { Send, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { BuddyContactCard } from "../components/BuddyContactCard";
import { BuddyContactList } from "@/components/BuddyContactList";

const ContactsView: React.FC = () => {
  const { buddies, groups } = useTickets();

  const standaloneBuddies = buddies.filter(buddy =>
    buddy.isActive && !groups.some(group => group.buddies.includes(buddy.id))
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Buddies</h2>
        <div className="flex items-center gap-1">
          <Link
            to="/contacts/add-group"
            className="flex items-center px-3 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
          >
            <Users  className="size-4 mr-2" />
            Create Group
          </Link>
          <Link
            to="/contacts/invite"
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary transition-colors"
          >
            <Send size={18} className="mr-2" />
            Invite
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {groups
          .map((group) => <BuddyContactList key={group.id} group={group} />)}
      </div>

      {/* Buddies that are not in any group */}
      {standaloneBuddies.length > 0 && (
        <div className="grid gap-6 mt-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="font-medium text-gray-800">Buddies</h3>
                <span className="text-xs text-gray-500">
                  (Unassigned)
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {standaloneBuddies
                .map((buddy) => (
                  <BuddyContactCard key={buddy.id} buddy={buddy} isStandalone/>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Pending invitations section */}
      <div className="grid gap-6 mt-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <Send size={18} className="text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-800">Pending invites</h3>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {buddies
              .filter((buddy) => !buddy.isActive)
              .map((buddy) => (
                <BuddyContactCard key={buddy.id} buddy={buddy} mode="edit"/>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsView;
