import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  metadata?: any;
  lastMessage?: {
    content: string;
    created_at: string;
  };
}

interface ConversationListProps {
  onSelectConversation: (conversationId: string) => void;
  selectedId?: string;
}

export function ConversationList({ onSelectConversation, selectedId }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();

    const channel = supabase
      .channel('conversations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, () => {
        loadConversations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          title,
          status,
          created_at,
          updated_at,
          metadata
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Load last message for each conversation
      const conversationsWithMessages = await Promise.all(
        (data || []).map(async (conv) => {
          const { data: messages } = await supabase
            .from('messages')
            .select('content, created_at')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            ...conv,
            lastMessage: messages || undefined
          } as Conversation;
        })
      );

      setConversations(conversationsWithMessages);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-4">
        {conversations.map((conversation) => (
          <Card
            key={conversation.id}
            className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
              selectedId === conversation.id ? 'bg-accent' : ''
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>
                  {conversation.title.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold truncate">{conversation.title}</h4>
                  {conversation.lastMessage && (
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(conversation.lastMessage.created_at), { addSuffix: true })}
                    </span>
                  )}
                </div>
                
                {conversation.lastMessage && (
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage.content}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                    {conversation.status}
                  </Badge>
                  {conversation.metadata?.whatsapp_number && (
                    <Badge variant="outline">WhatsApp</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {conversations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No conversations yet
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
