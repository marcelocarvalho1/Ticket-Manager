// src/components/TicketBoard.tsx
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Ticket, updateTicketStatus } from "../api/ticketService";

interface TicketBoardProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

interface TicketItemProps {
  ticket: Ticket;
  moveTicket: (id: string, status: Ticket["status"]) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, moveTicket }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TICKET",
    item: { id: ticket._id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: 8,
        margin: "8px 0",
        backgroundColor: isDragging ? "#ddd" : "#eee",
        borderRadius: 4,
        cursor: "grab",
      }}
    >
      <strong>{ticket.title}</strong>
      <p>{ticket.description}</p>
    </div>
  );
};

export default function TicketBoard({ tickets, setTickets }: TicketBoardProps) {
  const columns = [
    { id: "open", title: "A Fazer" },
    { id: "in_progress", title: "Em Progresso" },
    { id: "resolved", title: "Concluído" },
  ];

  const moveTicket = async (id: string, status: Ticket["status"]) => {
    try {
      const updated = await updateTicketStatus(id, status);
      setTickets((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Erro ao atualizar ticket:", err);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: 16 }}>
        {columns.map((col) => {
          const [, drop] = useDrop({
            accept: "TICKET",
            drop: (item: { id: string }) => moveTicket(item.id, col.id as Ticket["status"]),
          });

          return (
            <div
              ref={drop}
              key={col.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: 8,
                width: 250,
                minHeight: 400,
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{col.title}</h3>
              {tickets
                .filter((t) => t.status === col.id)
                .map((t) => (
                  <TicketItem key={t._id} ticket={t} moveTicket={moveTicket} />
                ))}
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
}
