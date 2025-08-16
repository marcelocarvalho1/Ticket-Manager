import { Router } from "express";
import { createTicket, listTickets, getTicket, updateTicketStatus, deleteTicket } from "../controllers/ticketController";


const router = Router();

router.get("/", listTickets);
router.post("/", createTicket);
router.get("/:id", getTicket);
router.put("/:id", updateTicketStatus);
router.delete("/:id", deleteTicket);

export default router;
