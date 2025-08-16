import { useEffect, useState } from "react";
import TicketBoard from "../components/TicketBoard";
import { listTickets, Ticket } from "../api/ticketService";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    listTickets().then(setTickets);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      <TicketBoard tickets={tickets} setTickets={setTickets} />
    </div>
  );
}
