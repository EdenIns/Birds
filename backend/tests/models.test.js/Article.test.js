import { describe, it, beforeAll, afterAll, expect } from "vitest";
import mongoose from "mongoose";
import Article from "../../models/Article";

require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

describe("Test création nouvel article", () => {
  it("Réussite", async () => {
    const newArticle = {
      title: "Article de test",
      description: "Test d'entrée d'un article.",
      imageUrl: "test-image.png",
      userId: "user1234",
    };

    const article = new Article(newArticle);

    const articleInDb = await article.save();

    expect(articleInDb._id).toBeDefined();
    expect(articleInDb.title).toBe(newArticle.title);
    expect(articleInDb.description).toBe(newArticle.description);
    expect(articleInDb.imageUrl).toBe(newArticle.imageUrl);
    expect(articleInDb.userId).toBe(newArticle.userId);
    expect(articleInDb.createdAt).toBeDefined();
  });

  it("Echec", async () => {
    const newArticle = new Article({
      title: "Article de test",
      description: "Test d'entrée d'un article.",
    });

    try {
      await newArticle.save();
    } catch (error) {
      expect(error.errors.imageUrl).toBeDefined();
      expect(error.errors.userId).toBeDefined();
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
