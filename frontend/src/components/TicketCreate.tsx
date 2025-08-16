import { createTicket, Ticket } from "../api/ticketService";
import { TicketForm } from "./TicketForm";

interface TicketCreateProps {
  onTicketCreated: (ticket: Ticket) => void;
}

export const TicketCreate = ({ onTicketCreated }: TicketCreateProps) => {
  const handleCreate = async (data: Omit<Ticket, "_id" | "createdAt">) => {
    const newTicket = await createTicket(data);
    onTicketCreated(newTicket);
  };

  return <TicketForm onSubmit={handleCreate} />;
};

