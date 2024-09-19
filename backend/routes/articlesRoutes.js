const express = require("express");
const articleController = require("../controllers/ArticleController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, articleController.createArticle);
router.get("/:id", articleController.getOneArticle);
router.get("/", articleController.getArticles);
router.delete("/:id", auth, articleController.deleteArticle);

module.exports = router;
