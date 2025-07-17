// External Dependencies
import express, { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Cafe from "../models/cafe";

// Global Config
export const cafesRouter = express.Router();

cafesRouter.use(express.json());

// Helper Function - Validate collections
function getCafesCollection(res: Response): Collection | undefined {
  if (!collections.cafes) {
    res.status(500).send("Cafes collection is not initialized.");
    return;
  }

  return collections.cafes;
}

//GET
// Get all cafes
cafesRouter.get("/", async (req: Request, res: Response) => {
  const cafesCollection = getCafesCollection(res);
  if (!cafesCollection) return;
  try {
    const cafes = await cafesCollection.find<Cafe>({}).toArray();
    res.status(200).send(cafes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});

// Get a cafe by ID
cafesRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const cafesCollection = getCafesCollection(res);
  if (!cafesCollection) return;
  try {
    const query = { _id: new ObjectId(id) };
    const cafe = await cafesCollection.findOne<Cafe>(query);
    if (cafe) {
      res.status(200).send(cafe);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
// Create a new cafe
cafesRouter.post("/", async (req: Request, res: Response) => {
  const cafesCollection = getCafesCollection(res);
  if (!cafesCollection) return;
  try {
    const newCafe = req.body as Cafe;
    const result = await cafesCollection.insertOne(newCafe);

    result
      ? res
          .status(201)
          .send(`Successfully created a new cafe with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new cafe.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Unknown error");
    }
  }
});

// PUT
// Update a cafe by ID
cafesRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const cafesCollection = getCafesCollection(res);
  if (!cafesCollection) return;
  try {
    const updatedCafe: Cafe = req.body as Cafe;
    const query = { _id: new ObjectId(id) };

    const result = await cafesCollection.updateOne(query, {
      $set: updatedCafe,
    });

    result
      ? res.status(200).send(`Successfully updated cafe with id ${id}`)
      : res.status(304).send(`Cafe with id: ${id} not updated`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Unknown error");
    }
  }
});

// DELETE
// Delete a cafe by ID
cafesRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const cafesCollection = getCafesCollection(res);
  if (!cafesCollection) return;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await cafesCollection.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed cafe with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove cafe with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Cafe with id ${id} does not exist`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Unknown error");
    }
  }
});

export default cafesRouter;
