import React from "react";
import { useTickets } from "../context/TicketsContext";
import { Users } from "lucide-react";

const ContactsView: React.FC = () => {
  const { buddies, groups } = useTickets();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Buddies</h2>
      </div>

      <div className="grid gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <Users size={18} className="text-gray-500 mr-2" />
                <h3 className="font-medium text-gray-800">{group.name}</h3>
              </div>
              <span className="text-sm text-gray-500">
                {group.buddies.length} contact
                {group.buddies.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="divide-y divide-gray-200">
              {buddies
                .filter((buddy) => group.buddies.includes(buddy.id))
                .map((buddy) => (
                  <div
                    key={buddy.id}
                    className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <img
                        src={buddy.avatar}
                        alt={buddy.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-800">
                          {buddy.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {buddy.relationship}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsView;
