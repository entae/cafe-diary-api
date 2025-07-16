import { Router, Request, Response } from "express";

const router = Router();

interface CafeVisit {
  date: string; // ISO date string ("YYYY-MM-DD")
  drinks: string[]; // ["Latte", "Espresso"]
  notes?: string; // Notes about the drinks
}

interface Cafe {
  id: number;
  name: string;
  street: string;
  city: string;
  visits?: CafeVisit[]; // List of visits
  rating?: number; // Overall rating out of 5
  keywords?: string[]; // Optional tags for the cafe
  wifi?: boolean;
}

const cafes: Cafe[] = [
//   {
//     id: 1,
//     name: "HotBlack Coffee",
//     street: "245 Queen St W",
//     city: "Toronto",
//     visits: [
//       {
//         date: "2025-07-14",
//         drinks: ["Iced Americano (SO)"],
//         notes: "balanced flavour",
//       },
//     ],
//     rating: 4.5,
//     keywords: ["red", "rustic", "sourdough"],
//     wifi: false,
//   },
//   {
//     id: 2,
//     name: "Lazy Dough",
//     street: "1775 Avenue Rd",
//     city: "North York",
//     visits: [
//       { date: "2025-04-02", drinks: ["Flat White"], notes: "Good Latte Art" },
//     ],
//     rating: 4.5,
//     keywords: ["croissant", "sourdough", "baguette", "bakery"],
//     wifi: true,
//   },
//   {
//     id: 3,
//     name: "Coffee Lunar",
//     street: "",
//     city: "",
//     visits: [
//       {
//         date: "2025-07-16",
//         drinks: ["Iced Americano"],
//       },
//     ],
//     rating: 0,
//     keywords: ["concrete"],
//     wifi: true,
//   },
];

// Get all cafes
router.get("/cafes", (req: Request, res: Response) => {
  res.json(cafes);
});

// Get a cafe by ID
router.get("/cafes/:id", (req: Request, res: Response) => {
  const cafeId = parseInt(req.params.id);
  const cafe = cafes.find((c) => c.id === cafeId);
  if (cafe) {
    res.json(cafe);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Create a new cafe
router.post("/cafes", (req: Request, res: Response) => {
  const newCafe: Cafe = {
    id: cafes.length + 1,
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
  };
  cafes.push(newCafe);
  res.status(201).json(newCafe);
});

// Update a cafe by ID
router.put("/cafes/:id", (req: Request, res: Response) => {
  const cafeId = parseInt(req.params.id);
  const cafeIndex = cafes.findIndex((c) => c.id === cafeId);

  if (cafeIndex !== -1) {
    cafes[cafeIndex] = {
      id: cafes.length + 1,
      name: req.body.name,
      street: req.body.street,
      city: req.body.city,
    };
    res.json(cafes[cafeIndex]);
  } else {
    res.status(404).json({ message: "Cafe not found" });
  }
});

// Delete a book by ID
router.delete("/books/:id", (req: Request, res: Response) => {
  const cafeId = parseInt(req.params.id);
  const bookIndex = cafes.findIndex((c) => c.id === cafeId);

  if (bookIndex !== -1) {
    cafes.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Cafe not found" });
  }
});

export default router;
