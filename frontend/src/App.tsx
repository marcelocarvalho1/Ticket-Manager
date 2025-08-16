import { useEffect, useState } from "react";
import { TicketCreate } from "./components/TicketCreate";
import TicketBoard from "./components/TicketBoard";
import { listTickets, Ticket } from "./api/ticketService";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    listTickets().then(setTickets);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gerenciador de Tickets</h1>
      <TicketCreate onTicketCreated={ticket => setTickets(prev => [ticket, ...prev])} />
      <DndProvider backend={HTML5Backend}>
        <TicketBoard tickets={tickets} setTickets={setTickets} />
      </DndProvider>
    </div>
  );
}
