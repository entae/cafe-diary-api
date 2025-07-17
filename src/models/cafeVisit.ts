// External Dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class CafeVisit {
  constructor(
    public date: string, // ISO date string ("YYYY-MM-DD")
    public drinks: string[], // e.g.: ["Latte", "Espresso"]
    public notes?: string[], // Notes about the drinks
    public id?: ObjectId,
  ) {}
}
