import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from 'morgan';

// Εισαγωγή Routes
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import systemRoutes from "./routes/systemRoutes";
import slotRoutes from "./routes/slotRoutes";

// Εισαγωγή Middlewares & Services
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { initScheduler } from "./services/scheduler";
import { initCronJobs } from './utils/cronJobs';
// ...

dotenv.config();

const app = express();

// 1. Global Middlewares
app.use(cors()); // Για να μπορεί το React να μιλάει με το Backend
app.use(express.json()); // Για να διαβάζει JSON στο body
app.use(requestLogger); // Για να βλέπεις τι συμβαίνει στο terminal
app.use(morgan('dev'));
// 2. Ενεργοποίηση Scheduler (Κυριακή 12:00)
initScheduler();

// 3. Σύνδεση Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/slots", slotRoutes);
// 4. Global Error Handler (Πάντα τελευταίο!)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🥊 COMBO GYM API is live on port ${PORT}`);
  initCronJobs();
});
