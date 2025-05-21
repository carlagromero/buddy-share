import { useRef, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown";
import { EllipsisVertical, Check, X } from "lucide-react";
import { BuddyContactCard } from "./BuddyContactCard";
import { useTickets } from "@/context/TicketsContext";
import type { Group } from "@/types";
import { cn } from "@/lib/utils";
import { flushSync } from "react-dom";

export function BuddyContactList({ group }: { group: Group }) {
  const { buddies, createGroup } = useTickets();
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [name, setName] = useState(group.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const groupBuddies = group.buddies.filter((buddyId) => buddies.find((b) => b.id === buddyId && b.isActive))

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div
        className={cn(
          "px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between",
          mode === "edit" && "pl-2"
        )}
      >
        <div className="flex items-center gap-1">
          {mode === 'view' ? (
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-gray-800">{group.name}</h3>
              <span className="text-xs text-gray-500">
                ({groupBuddies.length} contact
                {groupBuddies.length !== 1 ? "s" : ""})
              </span>
            </div>
          ) : (
            <input 
              ref={inputRef}
              type="text"
              className='w-full px-2 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-600 outline-none'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
        {mode === 'view' ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="size-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                flushSync(() => {
                  setMode("edit")
                })
                inputRef.current?.select()
              }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Check
              className="size-4 text-gray-600"
              onClick={() => {
                setMode("view")
                createGroup({
                  name: name,
                  buddies: []
                }, group.name)
              }}
            />
            <X
              className="size-4 text-gray-600"
              onClick={() => {
                setMode("view")
                setName(group.name)
              }}
            />
          </div>
        )}
      </div>

      <div className="divide-y divide-gray-200">
        {buddies
          .filter(
            (buddy) =>
              buddy.isActive && groupBuddies.includes(buddy.id)
          )
          .map((buddy) => (
            <BuddyContactCard key={buddy.id} buddy={buddy} mode={mode} />
          ))}
      </div>
    </div>
  )
}