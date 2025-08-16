const API_BASE = import.meta.env.VITE_API_BASE_URL; // http://localhost:4000

export interface Ticket {
  _id?: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "resolved";
  createdBy: string;
  createdAt?: string;
}

export const listTickets = async (): Promise<Ticket[]> => {
  const res = await fetch(`${API_BASE}/tickets`);
  return res.json();
};


export const createTicket = async (ticket: Omit<Ticket, "_id" | "createdAt">): Promise<Ticket> => {
  console.log("POST para:", `${API_BASE}/tickets`, ticket);
  const res = await fetch(`${API_BASE}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  return res.json();
};


export const updateTicketStatus = async (id: string, status: Ticket["status"]) => {
  const res = await fetch(`${API_BASE}/tickets/${id}`, {
    method: "PUT", // PUT porque o backend usa router.put("/:id", updateTicket)
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

