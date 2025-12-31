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

export async function sendSOWNotification(data: SOWEmailData): Promise<boolean> {
  try {
    const { client, fromEmail } = await getResendClient();
    
    const pdfBase64 = data.pdfBuffer.toString('base64');
    
    await client.emails.send({
      from: fromEmail || 'noreply@resend.dev',
      to: 'myskylyfe@gmail.com',
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
    
    console.log(`SOW email sent successfully for project: ${data.projectName}`);
    return true;
  } catch (error) {
    console.error('Failed to send SOW email:', error);
    return false;
  }
}
