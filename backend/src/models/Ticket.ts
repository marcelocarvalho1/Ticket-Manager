import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITicket extends Document {
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdBy: string;
  assignedTo?: string | null;
}

const ticketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    createdBy: { type: String, required: true },
    assignedTo: { type: String }
  },
  { timestamps: true }
);

const Ticket: Model<ITicket> = mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);
export default Ticket;
