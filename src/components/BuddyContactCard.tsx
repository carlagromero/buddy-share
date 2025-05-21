import { Trash2, UserPlus } from "lucide-react"
import type { Buddy } from "../types"
import { useTickets } from "../context/TicketsContext";
import { useState, useRef, useEffect } from "react";
import BoringAvatar from "boring-avatars";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown";

type BuddyContactCardProps = {
  buddy: Buddy
  isStandalone?: boolean
}

export function BuddyContactCard({ buddy, isStandalone = false }: BuddyContactCardProps) {
  const { removeBuddy, groups, addBuddyToGroup } = useTickets();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!deleteConfirmation) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setDeleteConfirmation(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteConfirmation]);


  return (
    <div
      className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
    >
      <div className="flex items-center">
        {buddy.avatar ? (
          <img
            src={buddy.avatar}
            alt={buddy.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <BoringAvatar
            className="w-10"
            variant='beam'
          />
        )}
        <div className="ml-3">
          <h4 className="font-medium text-gray-800">
            {buddy.name}
          </h4>
          <p className="text-sm text-gray-500">
            {buddy.phone}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {buddy.isActive && isStandalone && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserPlus className="size-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {groups.map(group => (
                <DropdownMenuItem
                  key={group.id}
                  onClick={() => addBuddyToGroup(buddy.id, group.id)}
                >
                  {group.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!isStandalone && (
          <div
            ref={buttonRef}
            className="flex items-center gap-1 relative"
            onClick={() => {
              if(deleteConfirmation) {
                removeBuddy(buddy.id)
                setDeleteConfirmation(false)
              } else {
                setDeleteConfirmation(true)
              }
            }}
          >
            <Trash2
              className="size-4 text-red-600 cursor-pointer"
            />
            <div 
              className={`
                overflow-hidden transition-all duration-200 ease-in-out
                ${deleteConfirmation ? 'opacity-100 max-w-32' : 'opacity-0 max-w-0'}
              `}
            >
              <span className="text-red-600 text-sm font-bold whitespace-nowrap">
                {!buddy.isActive ? 'Revoke invite' : 'Remove Buddy'}
                </span>
              </div>
          </div>
        )}
      </div>
    </div>
  )
}