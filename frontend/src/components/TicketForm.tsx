import { useState, FormEvent } from "react";
import { Ticket } from "../api/ticketService";

interface TicketFormProps {
  initialData?: Partial<Ticket>;
  onSubmit: (data: Omit<Ticket, "_id" | "createdAt">) => void;
}

export const TicketForm = ({ initialData, onSubmit }: TicketFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [priority, setPriority] = useState<Ticket["priority"]>(initialData?.priority || "low");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority, createdBy: "user@example.com", status: "open" });
    setTitle("");
    setDescription("");
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required />
      <select value={priority} onChange={e => setPriority(e.target.value as Ticket["priority"])}>
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
};
