import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('VITE_SUPABASE_PUBLISHABLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = await req.json();
    
    // Log webhook event
    await supabase.from('webhook_logs').insert({
      source: 'whatsapp',
      event_type: payload.type || 'unknown',
      payload: payload,
      status: 'received'
    });

    // Process incoming message
    if (payload.type === 'message' && payload.message) {
      const { from, text, conversationId } = payload.message;
      
      // Find or create conversation
      let conversation = null;
      if (conversationId) {
        const { data } = await supabase
          .from('conversations')
          .select('*')
          .eq('id', conversationId)
          .single();
        conversation = data;
      }

      if (!conversation) {
        // Create new conversation
        const { data: newConv } = await supabase
          .from('conversations')
          .insert({
            title: `WhatsApp: ${from}`,
            status: 'active',
            metadata: { whatsapp_number: from }
          })
          .select()
          .single();
        conversation = newConv;
      }

      // Insert message
      await supabase.from('messages').insert({
        conversation_id: conversation.id,
        sender_id: null, // External message
        content: text,
        type: 'text',
        metadata: { from, source: 'whatsapp' }
      });

      await supabase.from('webhook_logs').insert({
        source: 'whatsapp',
        event_type: 'message_processed',
        payload: { conversationId: conversation.id },
        status: 'success'
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
