// Email service using Resend integration
import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getResendClient() {
  const { apiKey } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: connectionSettings.settings.from_email
  };
}

export interface SOWEmailData {
  clientName: string;
  clientEmail: string;
  projectName: string;
  pdfBuffer: Buffer;
}

export interface ContactEmailData {
  name: string;
  email: string;
  organization?: string;
  phone?: string;
  message: string;
}

export async function sendSOWNotification(data: SOWEmailData): Promise<boolean> {
  console.log(`[Email] Starting SOW notification for project: ${data.projectName}`);
  try {
    console.log('[Email] Getting Resend client...');
    const { client, fromEmail } = await getResendClient();
    console.log(`[Email] Got client, fromEmail: ${fromEmail}`);
    
    const pdfBase64 = data.pdfBuffer.toString('base64');
    console.log(`[Email] PDF encoded, size: ${pdfBase64.length} chars`);
    
    const result = await client.emails.send({
      from: fromEmail || 'noreply@resend.dev',
      to: ['myskylyfe@gmail.com', 'g.rogersky@gmail.com'],
      subject: `New SOW Generated: ${data.projectName} - ${data.clientName}`,
      html: `
        <h2>New Statement of Work Generated</h2>
        <p>A new SOW has been generated through the website.</p>
        <h3>Project Details:</h3>
        <ul>
          <li><strong>Project Name:</strong> ${data.projectName}</li>
          <li><strong>Client Name:</strong> ${data.clientName}</li>
          <li><strong>Client Email:</strong> ${data.clientEmail}</li>
        </ul>
        <p>The SOW PDF is attached to this email.</p>
        <hr>
        <p><em>This is an automated notification from Skylyfe Technologies</em></p>
      `,
      attachments: [
        {
          filename: `SOW-${data.projectName.replace(/\s+/g, '-')}.pdf`,
          content: pdfBase64,
        }
      ]
    });
    
    // Check if Resend returned an error in the response
    if (result.error) {
      console.error(`[Email] Resend API error for project: ${data.projectName}`, result.error);
      throw new Error(result.error.message || 'Email delivery failed');
    }
    
    console.log(`[Email] SOW email sent successfully for project: ${data.projectName}`, result);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send SOW email:', error);
    return false;
  }
}

export async function sendContactNotification(data: ContactEmailData): Promise<boolean> {
  try {
    const { client, fromEmail } = await getResendClient();
    
    const result = await client.emails.send({
      from: fromEmail || 'noreply@resend.dev',
      to: ['myskylyfe@gmail.com', 'g.rogersky@gmail.com'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p>Someone has reached out through the website contact form.</p>
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          ${data.organization ? `<li><strong>Organization:</strong> ${data.organization}</li>` : ''}
          ${data.phone ? `<li><strong>Phone:</strong> ${data.phone}</li>` : ''}
        </ul>
        <h3>Message:</h3>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This is an automated notification from Skylyfe Technologies</em></p>
      `,
    });
    
    // Check if Resend returned an error in the response
    if (result.error) {
      console.error(`[Email] Resend API error for contact from: ${data.name}`, result.error);
      throw new Error(result.error.message || 'Email delivery failed');
    }
    
    console.log(`Contact email sent successfully from: ${data.name}`);
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return false;
  }
}
