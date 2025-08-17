import { useState } from "react";
import { TicketCreate } from "../components/TicketCreate";
import { Ticket } from "../api/ticketService";
import { useNavigate } from "react-router-dom";

export default function NewTicket() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const handleTicketCreated = (ticket: Ticket) => {
    setTickets(prev => [ticket, ...prev]);
    navigate("/"); 
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Novo Ticket</h1>
      <TicketCreate onTicketCreated={handleTicketCreated} />
    </div>
  );
}