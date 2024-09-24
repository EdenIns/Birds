import { describe, it, beforeAll, afterAll, expect } from "vitest";
import mongoose from "mongoose";
import Article from "../../models/Article";
import User from "../../models/User";
import jwt from "jsonwebtoken";

require("dotenv").config();

let fakeUserId;
let fakeToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const user = new User({
    pseudo: "fauxPseudo",
    password: "Password123!",
    email: "fauxPseudo@test.com",
  });
  const fakeUser = await user.save();
  fakeUserId = fakeUser._id;

  fakeToken = jwt.sign({ userId: fakeUserId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
});

describe("Test création nouvel article", () => {
  it("Réussite", async () => {
    const newArticle = {
      title: "Article de test",
      description: "Test d'entrée d'un article.",
      imageUrl: "test-image.png",
      userId: fakeUserId
    };

    const article = new Article(newArticle);

    const articleInDb = await article.save();

    expect(articleInDb._id).toBeDefined();
    expect(articleInDb.title).toBe(newArticle.title);
    expect(articleInDb.description).toBe(newArticle.description);
    expect(articleInDb.imageUrl).toBe(newArticle.imageUrl);
    expect(articleInDb.userId).toBeDefined();
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
    }
  });

  afterAll(async () => {
    await Article.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });
});
