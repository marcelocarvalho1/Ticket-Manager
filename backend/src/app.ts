import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/tickets", ticketRoutes);

export default app;
