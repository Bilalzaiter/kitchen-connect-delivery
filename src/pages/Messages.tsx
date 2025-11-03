import { useState } from 'react';
import { ConversationList } from '@/components/messaging/ConversationList';
import { ChatInterface } from '@/components/messaging/ChatInterface';
import { Card } from '@/components/ui/card';

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
        <Card className="lg:col-span-1 h-full">
          <ConversationList
            onSelectConversation={setSelectedConversation}
            selectedId={selectedConversation || undefined}
          />
        </Card>
        
        <Card className="lg:col-span-2 h-full">
          {selectedConversation ? (
            <ChatInterface conversationId={selectedConversation} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
