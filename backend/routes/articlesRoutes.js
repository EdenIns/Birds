const express = require("express");
const articleController = require("../controllers/ArticleController");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer');

const router = express.Router();

router.get("/articlesUserConnected", auth, articleController.getArticlesUserConnected);

router.post("/", auth, multer, articleController.createArticle);
router.get("/:id", articleController.getOneArticle);
router.get("/", articleController.getArticles);
router.delete("/:id", auth, articleController.deleteArticle);

module.exports = router;
