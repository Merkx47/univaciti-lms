import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Waitlist endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistEntrySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid email address",
          details: result.error.flatten() 
        });
      }

      // Check if already on waitlist
      const existing = await storage.getWaitlistByEmail(result.data.email);
      if (existing) {
        return res.status(200).json({ 
          message: "You're already on the waitlist!",
          entry: existing 
        });
      }

      const entry = await storage.addToWaitlist(result.data);
      res.status(201).json({ 
        message: "Successfully joined the waitlist!",
        entry 
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  // Get waitlist count (for stats)
  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const waitlist = await storage.getAllWaitlist();
      res.json({ count: waitlist.length });
    } catch (error) {
      console.error("Waitlist count error:", error);
      res.status(500).json({ error: "Failed to get waitlist count" });
    }
  });

  return httpServer;
}
