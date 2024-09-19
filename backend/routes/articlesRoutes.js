const express = require("express");
const articleController = require("../controllers/ArticleController");

const router = express.Router();

router.post("/", articleController.createArticle);
router.get("/:id", articleController.getOneArticle);
router.get("/", articleController.getArticles);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
