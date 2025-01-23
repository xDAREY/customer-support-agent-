'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Smile, Paperclip, Send } from 'lucide-react'

export default function ChatPage() {
  const [message, setMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sending message logic here
    setMessage('')
  }

  return (
    <Layout>
      <div className="flex h-full">
        <div className="w-1/4 border-r">
          {/* Chat list */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Ongoing Chats</h2>
            {/* Add list of ongoing chats here */}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">john.doe@example.com • Order #12345</p>
          </div>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Add chat messages here */}
          </div>
          {/* Chat input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 mx-2"
              />
              <Button type="submit">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

