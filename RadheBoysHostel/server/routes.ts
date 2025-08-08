import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertResidentSchema, insertInquirySchema, insertPaymentSchema } from "@shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact form submission
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(400).json({ message: "Invalid inquiry data" });
    }
  });

  // Protected admin routes
  app.get("/api/residents", authenticateToken, async (req, res) => {
    try {
      const residents = await storage.getAllResidents();
      res.json(residents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch residents" });
    }
  });

  app.post("/api/residents", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertResidentSchema.parse(req.body);
      const resident = await storage.createResident(validatedData);
      res.status(201).json(resident);
    } catch (error) {
      res.status(400).json({ message: "Invalid resident data" });
    }
  });

  app.put("/api/residents/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertResidentSchema.partial().parse(req.body);
      const resident = await storage.updateResident(id, validatedData);
      
      if (!resident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      
      res.json(resident);
    } catch (error) {
      res.status(400).json({ message: "Invalid resident data" });
    }
  });

  app.delete("/api/residents/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteResident(id);
      
      if (!success) {
        return res.status(404).json({ message: "Resident not found" });
      }
      
      res.json({ message: "Resident deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resident" });
    }
  });

  app.get("/api/inquiries", authenticateToken, async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.put("/api/inquiries/:id/handled", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markInquiryHandled(id);
      
      if (!success) {
        return res.status(404).json({ message: "Inquiry not found" });
      }
      
      res.json({ message: "Inquiry marked as handled" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update inquiry" });
    }
  });

  app.get("/api/payments", authenticateToken, async (req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  app.post("/api/payments", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ message: "Invalid payment data" });
    }
  });

  app.put("/api/payments/:id/status", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, paidDate } = req.body;
      const payment = await storage.updatePaymentStatus(id, status, paidDate ? new Date(paidDate) : undefined);
      
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update payment status" });
    }
  });

  app.get("/api/room-status", authenticateToken, async (req, res) => {
    try {
      const roomStatus = await storage.getAllRoomStatus();
      res.json(roomStatus);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch room status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
