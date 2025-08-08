import { 
  users, residents, inquiries, payments, roomStatus,
  type User, type InsertUser, type Resident, type InsertResident,
  type Inquiry, type InsertInquiry, type Payment, type InsertPayment,
  type RoomStatus, type InsertRoomStatus
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Resident methods
  getAllResidents(): Promise<Resident[]>;
  getResident(id: number): Promise<Resident | undefined>;
  createResident(resident: InsertResident): Promise<Resident>;
  updateResident(id: number, resident: Partial<InsertResident>): Promise<Resident | undefined>;
  deleteResident(id: number): Promise<boolean>;

  // Inquiry methods
  getAllInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  markInquiryHandled(id: number): Promise<boolean>;

  // Payment methods
  getAllPayments(): Promise<(Payment & { resident: Resident })[]>;
  getPaymentsByResident(residentId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(id: number, status: string, paidDate?: Date): Promise<Payment | undefined>;

  // Room status methods
  getAllRoomStatus(): Promise<RoomStatus[]>;
  updateRoomStatus(roomType: string, totalRooms: number, occupiedRooms: number): Promise<RoomStatus>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Resident methods
  async getAllResidents(): Promise<Resident[]> {
    return await db.select().from(residents).where(eq(residents.isActive, true)).orderBy(desc(residents.createdAt));
  }

  async getResident(id: number): Promise<Resident | undefined> {
    const [resident] = await db.select().from(residents).where(eq(residents.id, id));
    return resident || undefined;
  }

  async createResident(insertResident: InsertResident): Promise<Resident> {
    const [resident] = await db
      .insert(residents)
      .values(insertResident)
      .returning();
    return resident;
  }

  async updateResident(id: number, updateResident: Partial<InsertResident>): Promise<Resident | undefined> {
    const [resident] = await db
      .update(residents)
      .set(updateResident)
      .where(eq(residents.id, id))
      .returning();
    return resident || undefined;
  }

  async deleteResident(id: number): Promise<boolean> {
    const result = await db
      .update(residents)
      .set({ isActive: false })
      .where(eq(residents.id, id));
    return result.rowCount > 0;
  }

  // Inquiry methods
  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async markInquiryHandled(id: number): Promise<boolean> {
    const result = await db
      .update(inquiries)
      .set({ isHandled: true })
      .where(eq(inquiries.id, id));
    return result.rowCount > 0;
  }

  // Payment methods
  async getAllPayments(): Promise<(Payment & { resident: Resident })[]> {
    return await db
      .select()
      .from(payments)
      .leftJoin(residents, eq(payments.residentId, residents.id))
      .orderBy(desc(payments.createdAt))
      .then(results => 
        results.map(result => ({
          ...result.payments,
          resident: result.residents!
        }))
      );
  }

  async getPaymentsByResident(residentId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.residentId, residentId));
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(insertPayment)
      .returning();
    return payment;
  }

  async updatePaymentStatus(id: number, status: string, paidDate?: Date): Promise<Payment | undefined> {
    const [payment] = await db
      .update(payments)
      .set({ status, paidDate })
      .where(eq(payments.id, id))
      .returning();
    return payment || undefined;
  }

  // Room status methods
  async getAllRoomStatus(): Promise<RoomStatus[]> {
    return await db.select().from(roomStatus);
  }

  async updateRoomStatus(roomType: string, totalRooms: number, occupiedRooms: number): Promise<RoomStatus> {
    const [status] = await db
      .insert(roomStatus)
      .values({ roomType, totalRooms, occupiedRooms })
      .onConflictDoUpdate({
        target: roomStatus.roomType,
        set: { totalRooms, occupiedRooms, updatedAt: new Date() }
      })
      .returning();
    return status;
  }
}

export const storage = new DatabaseStorage();
