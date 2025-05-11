import { db } from "@/db";
import { model } from "@/db/schemas";

const data = [
  {
    name: "SVM",
  },
  {
    name: "KNN",
  },
  {
    name: "RF",
  },
  {
    name: "ANN",
  },
];

async function seed() {
  try {
    await db.insert(model).values(data);
  } catch (error) {
    console.error("Error while seeding initial data: ", error);
    throw error;
  }
}

seed();
