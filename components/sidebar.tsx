'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Ticket, User, Settings, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { cn } from "@/lib/utils"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "bg-gray-800 h-full flex flex-col relative transition-all duration-300",
      isCollapsed ? "w-16" : "w-52"
    )}>
      <div className="p-4 flex justify-center">
        <Image
          src="/pettify-logo.png"
          alt="Pettify Logo"
          width={32}
          height={32}
          className="invert"
        />
      </div>
      {!isCollapsed && (
        <div className="relative px-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="w-full pl-10 bg-gray-700 text-white placeholder:text-gray-400 border-gray-700" 
          />
        </div>
      )}
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-700 rounded-lg">
          <MessageSquare className="h-5 w-5 text-white" />
          {!isCollapsed && <span className="font-bold">Dashboard</span>}
        </Link>
        <Link href="/tickets" className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-700 rounded-lg">
          <Ticket className="h-5 w-5 text-white" />
          {!isCollapsed && <span className="font-bold">Tickets</span>}
        </Link>
        <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-700 rounded-lg">
          <User className="h-5 w-5 text-white" />
          {!isCollapsed && <span className="font-bold">Profile</span>}
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-700 rounded-lg">
          <Settings className="h-5 w-5 text-white" />
          {!isCollapsed && <span className="font-bold">Settings</span>}
        </Link>
      </nav>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full border border-gray-700 z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  )
}

