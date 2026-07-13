const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cropName: { type: String, required: true },
    cropType: { type: String, required: true },
    plantingDate: { type: Date, required: true },
    expectedHarvestDate: { type: Date },
    area: { type: Number, required: true },
    areaUnit: { type: String, default: "sqm" },
    status: { type: String, enum: ["planned", "planted", "growing", "harvested"], default: "planned" },
    notes: { type: String },
  },
  { timestamps: true }
);

const ExpenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    expenseDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const HarvestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: "kg" },
    sellingPrice: { type: Number, required: true },
    totalRevenue: { type: Number, required: true },
    harvestDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const JournalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Crop = mongoose.models.Crop || mongoose.model("Crop", CropSchema);
const Expense = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
const Harvest = mongoose.models.Harvest || mongoose.model("Harvest", HarvestSchema);
const Journal = mongoose.models.Journal || mongoose.model("Journal", JournalSchema);

const userId = new mongoose.Types.ObjectId("6a3b8dbe59374414d03b9fac");

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  await Promise.all([
    Crop.deleteMany({ userId }),
    Expense.deleteMany({ userId }),
    Harvest.deleteMany({ userId }),
    Journal.deleteMany({ userId }),
  ]);

  const crops = await Crop.insertMany([
    {
      userId,
      cropName: "Tomato Field",
      cropType: "Vegetable",
      plantingDate: new Date("2025-03-10"),
      expectedHarvestDate: new Date("2025-06-12"),
      area: 1200,
      areaUnit: "sqm",
      status: "harvested",
      notes: "High-yield variety with strong market demand.",
    },
    {
      userId,
      cropName: "Corn Plot",
      cropType: "Grain",
      plantingDate: new Date("2025-04-02"),
      expectedHarvestDate: new Date("2025-07-20"),
      area: 3200,
      areaUnit: "sqm",
      status: "growing",
      notes: "Monitoring irrigation due to dry weather.",
    },
    {
      userId,
      cropName: "Pepper Nursery",
      cropType: "Vegetable",
      plantingDate: new Date("2025-05-15"),
      expectedHarvestDate: new Date("2025-08-10"),
      area: 850,
      areaUnit: "sqm",
      status: "planted",
      notes: "Seedlings are healthy and growing steadily.",
    },
  ]);

  const expenses = await Expense.insertMany([
    {
      userId,
      title: "Fertilizer Purchase",
      amount: 3500,
      category: "Inputs",
      expenseDate: new Date("2025-06-01"),
      notes: "Applied to the tomato and corn fields.",
    },
    {
      userId,
      title: "Fuel for Tractor",
      amount: 1800,
      category: "Machinery",
      expenseDate: new Date("2025-06-03"),
      notes: "Used for land preparation and field transport.",
    },
    {
      userId,
      title: "Pest Control",
      amount: 1250,
      category: "Crop Protection",
      expenseDate: new Date("2025-06-08"),
      notes: "Spraying for leaf pests in pepper nursery.",
    },
    {
      userId,
      title: "Irrigation Repair",
      amount: 2200,
      category: "Maintenance",
      expenseDate: new Date("2025-06-10"),
      notes: "Repaired pump and hose lines.",
    },
  ]);

  const harvests = await Harvest.insertMany([
    {
      userId,
      cropId: crops[0]._id,
      quantity: 420,
      unit: "kg",
      sellingPrice: 45,
      totalRevenue: 18900,
      harvestDate: new Date("2025-06-12"),
      notes: "Sold to the local market at premium price.",
    },
    {
      userId,
      cropId: crops[0]._id,
      quantity: 180,
      unit: "kg",
      sellingPrice: 42,
      totalRevenue: 7560,
      harvestDate: new Date("2025-06-15"),
      notes: "Second batch from remaining plants.",
    },
    {
      userId,
      cropId: crops[1]._id,
      quantity: 650,
      unit: "kg",
      sellingPrice: 28,
      totalRevenue: 18200,
      harvestDate: new Date("2025-07-02"),
      notes: "Good yield despite mild drought stress.",
    },
  ]);

  await Journal.insertMany([
    {
      userId,
      title: "Field inspection update",
      content:
        "Checked the tomato field this morning. Plants are healthy and fruit set looks strong. Irrigation schedule was adjusted for the afternoon.",
      createdAt: new Date("2025-06-11T08:30:00"),
    },
    {
      userId,
      title: "Weather note",
      content:
        "Cloud cover increased around noon. Rainfall was light and soil moisture improved considerably.",
      createdAt: new Date("2025-06-13T16:00:00"),
    },
    {
      userId,
      title: "Market reminder",
      content:
        "Prepare packaging for tomorrow's delivery. Keep the best-quality produce separate for premium buyers.",
      createdAt: new Date("2025-06-15T18:10:00"),
    },
  ]);

  console.log(`Seeded demo data for user ${userId.toString()}`);
  console.log(`Created ${crops.length} crops, ${expenses.length} expenses, ${harvests.length} harvests, and 3 journal entries.`);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
