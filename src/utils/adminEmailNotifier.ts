import { FOUNDER_INFO } from '../data/ethiopiaData';

export interface AdminNotificationPayload {
  type: 'booking' | 'custom-trip' | 'contact' | 'community-support' | 'ngo-guidance' | 'coffee-order';
  title: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  details: Record<string, string | number | undefined>;
  notes?: string;
}

export const PRIMARY_ADMIN_EMAIL = 'hindek.ethiopia@gmail.com';
export const SECONDARY_ADMIN_EMAIL = 'bridgeethiopiatravel@gmail.com';

/**
 * Builds standard mailto URL addressed to the founder's personal admin email
 */
export function buildAdminMailto(payload: AdminNotificationPayload): string {
  const subject = encodeURIComponent(`[Bridge Ethiopia] ${payload.title} - ${payload.senderName}`);
  
  const detailLines = Object.entries(payload.details)
    .filter(([_, val]) => val !== undefined && val !== '')
    .map(([key, val]) => `• ${key}: ${val}`)
    .join('\n');

  const bodyContent = [
    `NEW INQUIRY FOR FOUNDER HINDEK (${PRIMARY_ADMIN_EMAIL})`,
    `============================================================`,
    `Inquiry Type: ${payload.type.toUpperCase()}`,
    `Sender: ${payload.senderName}`,
    `Email: ${payload.senderEmail}`,
    `Phone / WhatsApp: ${payload.senderPhone || 'Not provided'}`,
    `Submitted At: ${new Date().toLocaleString('en-US')}`,
    ``,
    `DETAILS:`,
    `------------------------------------------------------------`,
    detailLines,
    payload.notes ? `\nSPECIAL REQUESTS / NOTES:\n${payload.notes}` : '',
    ``,
    `============================================================`,
    `* Please reply directly to ${payload.senderEmail} or call/WhatsApp ${payload.senderPhone || 'the sender'}.`
  ].join('\n');

  const encodedBody = encodeURIComponent(bodyContent);
  return `mailto:${PRIMARY_ADMIN_EMAIL}?cc=${encodeURIComponent(SECONDARY_ADMIN_EMAIL)}&subject=${subject}&body=${encodedBody}`;
}

/**
 * Dispatches notification to backend server and triggers email client link
 */
export async function sendAdminEmailNotification(payload: AdminNotificationPayload): Promise<{ success: boolean; mailto: string }> {
  const mailto = buildAdminMailto(payload);

  try {
    // Send to server backend to record notification securely for Hindek's email logs
    await fetch('/api/notify-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        recipientEmail: PRIMARY_ADMIN_EMAIL,
        secondaryRecipient: SECONDARY_ADMIN_EMAIL,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {
      // Non-blocking fallback
    });
  } catch {}

  return { success: true, mailto };
}
