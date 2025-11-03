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

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    const { conversationId, message, to } = await req.json();
    
    // Get webhook URL from environment or use default
    const webhookUrl = Deno.env.get('WHATSAPP_WEBHOOK_URL');

    if (!webhookUrl) {
      throw new Error('WhatsApp webhook URL not configured');
    }

    // Send to Latenode/n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        message,
        conversationId,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    // Save message to database
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: message,
      type: 'text',
      metadata: { to, source: 'system' }
    });

    // Log webhook call
    await supabase.from('webhook_logs').insert({
      source: 'whatsapp',
      event_type: 'message_sent',
      payload: { conversationId, to, message },
      status: 'success'
    });

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
