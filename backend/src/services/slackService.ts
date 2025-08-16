import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL_ID;

const client = new WebClient(token);

export async function notifyNewTicket(ticket: any) {
  if (!token || !channel) return;
  await client.chat.postMessage({
    channel,
    text: `🎫 *Novo ticket criado*\n*${ticket.title}*\nStatus: ${ticket.status} | Prioridade: ${ticket.priority}`
  });
}

export async function notifyTicketUpdate(ticket: any) {
  if (!token || !channel) return;
  await client.chat.postMessage({
    channel,
    text: `🔄 *Ticket atualizado*\n*${ticket.title}*\nStatus: ${ticket.status} | Prioridade: ${ticket.priority}`
  });
}
