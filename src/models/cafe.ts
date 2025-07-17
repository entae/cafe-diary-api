// External Dependencies
import { ObjectId } from "mongodb";
import CafeVisit from "./cafeVisit";

// Class Implementation
export default class Cafe {
  constructor(
    public name: string,
    public street: string,
    public city: string,
    public rating?: number, // Overall rating out of 5
    public tags?: string[], // Optional tags for the cafe
    wifi?: boolean,
    visits?: CafeVisit[], // List of visits
    public id?: ObjectId,
  ) {}
}
