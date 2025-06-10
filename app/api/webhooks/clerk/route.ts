import { verifyWebhook } from '@clerk/nextjs/webhooks';
import type { WebhookEvent, UserJSON } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const evt = (await verifyWebhook(req)) as WebhookEvent;

    if (evt.type !== 'user.created' && evt.type !== 'user.updated') {
      return new Response('Event not handled', { status: 200 });
    }

    const user = evt.data;
    if (!('public_metadata' in user)) {
      return new Response('Invalid user data structure', { status: 400 });
    }

    const { id, email_addresses, first_name, last_name, public_metadata } = user as UserJSON;

    const email = email_addresses?.[0]?.email_address || '';
    const name = `${first_name || ''} ${last_name || ''}`.trim();
    const role = (public_metadata?.role as string)?.toUpperCase() || 'USER';

    if (evt.type === 'user.created') {
      await prisma.user.create({
        data: {
          clerkId: id,
          email,
          name,
          role,
        },
      });

      console.log(`Created user ${id}: ${email} as ${role}`);
      return new Response('User created and saved to DB', { status: 200 });
    }

    if (evt.type === 'user.updated') {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email,
          name,
          role,
        },
      });

      console.log(`Updated user ${id}: ${email} as ${role}`);
      return new Response('User updated in DB', { status: 200 });
    }

    return new Response('Unhandled user event', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err instanceof Error ? err.message : err);
    return new Response('Webhook error', { status: 500 });
  }
}
