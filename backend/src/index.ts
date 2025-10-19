import cors from "cors";
import express from "express";
import { donors, addDonor, updateItem } from "./data/donors";
import { items, type ItemStatus } from "./data/items";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/items", (_req, res) => {
  res.json({ items });
});

app.get("/api/donors", (_req, res) => {
  res.json({ donors });
});

app.post("/api/donations", (req, res) => {
  const { itemId, donorName, dedication, amount, public: isPublic } = req.body ?? {};

  if (!itemId || !donorName || !amount) {
    return res.status(400).json({ error: "Missing required donation fields" });
  }

  const item = items.find(entry => entry.id === itemId);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  if (item.status !== "available") {
    return res.status(409).json({ error: "Item is not available" });
  }

  const donorRecord = {
    id: String(donors.length + 1),
    name: donorName,
    dedication,
    itemId,
    amount,
    public: Boolean(isPublic),
    createdAt: new Date().toISOString()
  } as const;

  addDonor(donorRecord);
  updateItem(itemId, prev => ({
    ...prev,
    status: "purchased" as ItemStatus,
    donorName,
    dedication,
    public: Boolean(isPublic)
  }));

  res.status(201).json({ donor: donorRecord });
});

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`Donation API listening on port ${port}`);
});
