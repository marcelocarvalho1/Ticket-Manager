import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import { notifyNewTicket, notifyTicketUpdate } from "../services/slackService";

export async function createTicket(req: Request, res: Response) {
  try {
    const ticket = await Ticket.create(req.body);
    await notifyNewTicket(ticket);
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erro ao criar ticket" });
  }
}

export async function listTickets(_req: Request, res: Response) {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar tickets" });
  }
}

export async function getTicket(req: Request, res: Response) {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket não encontrado" });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
}

export async function updateTicketStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  if (!["open", "in_progress", "resolved"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) return res.status(404).json({ error: "Ticket não encontrado" });

    await notifyTicketUpdate(ticket); // opcional: notifica no Slack
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar status do ticket" });
  }
}

export async function deleteTicket(req: Request, res: Response) {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket não encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: "Erro ao excluir ticket" });
  }
}
