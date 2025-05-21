import React from "react";
import { useTickets } from "../context/TicketsContext";
import { Pencil, Send, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { BuddyContactCard } from "../components/BuddyContactCard";

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
            className="flex items-center px-3 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors"
          >
            <Users  className="size-4 mr-2" />
            Create Group
          </Link>
          <Link
            to="/contacts/invite"
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Send className="size-4 mr-2" />
            Invite
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {groups
          .map((group) =>{ 
            const groupBuddies = group.buddies.filter((buddyId) => buddies.find((b) => b.id === buddyId && b.isActive))
            return (
              <div
                key={group.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium text-gray-800">{group.name}</h3>
                    <Link to={{ pathname: '/contacts/add-group', search: `?name=${group.name}`}}>
                      <Pencil className="size-4 text-gray-500" />
                    </Link>
                  </div>
                  <span className="text-sm text-gray-500">
                    {groupBuddies.length} contact
                    {groupBuddies.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="divide-y divide-gray-200">
                  {buddies
                    .filter(
                      (buddy) =>
                        buddy.isActive && groupBuddies.includes(buddy.id)
                    )
                    .map((buddy) => (
                      <BuddyContactCard key={buddy.id} buddy={buddy} />
                    ))}
                </div>
              </div>
            )
          })}
      </div>

      {/* Buddies that are not in any group */}
      {standaloneBuddies.length > 0 && (
        <div className="grid gap-6 mt-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="font-medium text-gray-800">Buddies</h3>
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
                <BuddyContactCard key={buddy.id} buddy={buddy} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsView;
