'use client'

import { useState, useRef } from 'react'
import { Layout } from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Smile, Paperclip, Send, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Chat {
  id: string
  userName: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

interface Message {
  id: string
  sender: 'agent' | 'customer'
  content: string
  timestamp: string
}

const mockChats: Chat[] = [
  { id: '1', userName: 'John Doe', lastMessage: 'Hello, I need help with my order', timestamp: '2 min ago', unreadCount: 1 },
  { id: '2', userName: 'Jane Smith', lastMessage: 'Thank you for your assistance', timestamp: '15 min ago', unreadCount: 0 },
  { id: '3', userName: 'Bob Johnson', lastMessage: 'Is my order shipped yet?', timestamp: '1 hour ago', unreadCount: 2 },
]

const mockMessages: Message[] = [
  { id: '1', sender: 'customer', content: 'Hello, I need help with my order', timestamp: '10:00 AM' },
  { id: '2', sender: 'agent', content: 'Of course! I\'d be happy to help. Can you please provide your order number?', timestamp: '10:02 AM' },
  { id: '3', sender: 'customer', content: 'Sure, it\'s #12345', timestamp: '10:05 AM' },
]

export default function ChatPage({ params }: { params: { id: string } }) {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showResolveDialog, setShowResolveDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentChat = chats.find(chat => chat.id === params.id)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: String(messages.length + 1),
        sender: 'agent',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Here you would typically upload the file to your server
      // For now, we'll just add it as a message
      const newMsg: Message = {
        id: String(messages.length + 1),
        sender: 'agent',
        content: `File attached: ${file.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMsg])
    }
  }

  const handleResolveChat = () => {
    // Implement chat resolution logic here
    console.log('Chat resolved:', currentChat?.id)
    setShowResolveDialog(false)
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className={`border-r ${isCollapsed ? 'w-20' : 'w-1/4'} transition-all duration-300 ease-in-out`}>
          <div className="p-4">
            <Button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4 w-full">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
            {chats.map((chat) => (
              <Link href={`/chat/${chat.id}`} key={chat.id}>
                <div className={`flex items-center space-x-4 p-3 ${chat.id === params.id ? 'bg-orange-100' : 'hover:bg-orange-50'} rounded-lg transition-colors mb-2`}>
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.userName}`} />
                    <AvatarFallback>{chat.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{chat.userName}</p>
                        <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          {currentChat && (
            <>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">{currentChat.userName}</h2>
                <p className="text-sm text-gray-500">john.doe@example.com • Order #12345</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'agent' ? 'bg-orange-600 text-white' : 'bg-gray-200'} rounded-lg p-3`}>
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 text-right">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="ghost" size="icon">
                        <Smile className="h-6 w-6" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme="light"
                      />
                    </PopoverContent>
                  </Popover>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-6 w-6" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Send className="h-5 w-5 mr-2" />
                    Send
                  </Button>
                </form>
              </div>
              <div className="p-4 border-t">
                <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="secondary">
                      Resolve Chat
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Resolve Chat</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to resolve this chat? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleResolveChat}>
                        Yes, resolve chat
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

