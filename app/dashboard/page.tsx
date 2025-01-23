'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

interface Chat {
  id: string
  userName: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

const mockChats: Chat[] = [
  { id: '1', userName: 'John Doe', lastMessage: 'Hello, I need help with my order', timestamp: '2 min ago', unreadCount: 1 },
  { id: '2', userName: 'Jane Smith', lastMessage: 'Thank you for your assistance', timestamp: '15 min ago', unreadCount: 0 },
  { id: '3', userName: 'Bob Johnson', lastMessage: 'Is my order shipped yet?', timestamp: '1 hour ago', unreadCount: 2 },
]

export default function DashboardPage() {
  const [activeChats, setActiveChats] = useState<Chat[]>(mockChats)

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Agent Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Active Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeChats.map((chat) => (
                <Link href={`/chat/${chat.id}`} key={chat.id} className="block">
                  <div className="flex items-center space-x-4 p-3 hover:bg-orange-50 rounded-lg transition-colors">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.userName}`} />
                      <AvatarFallback>{chat.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{chat.userName}</p>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xs text-gray-500">{chat.timestamp}</p>
                      {chat.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

