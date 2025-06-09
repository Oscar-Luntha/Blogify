// app/api/webhooks/clerk/route.ts

import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req) as WebhookEvent;

    if (evt.type !== 'user.created') {
      return new Response('Not handled', { status: 200 });
    }

    const user = evt.data;

    const email = user.email_addresses?.[0]?.email_address || '';
    const name = `${user.first_name || ''} ${user.last_name || ''}`.trim();

    await prisma.user.create({
      data: {
        clerkId: user.id,
        email,
        name,
      },
    });

    console.log(`✅ Synced user ${user.id}: ${email}`);
    return new Response('User created and saved to DB', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err instanceof Error ? err.message : err);
    console.error('Full error object:', err);
    return new Response('Webhook error', { status: 500 });
  }
  
}
