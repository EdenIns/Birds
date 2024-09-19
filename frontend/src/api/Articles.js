import { BASE_URL, axios } from "../config";

export default class Articles {
  static async getArticles() {
    try {
      const response = await axios.get(`${BASE_URL}/article`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récuperation des articles:", error);
      throw error;
    }
  }

  static async createArticle(newArticle) {
    try {
      console.log(newArticle);
      const response = await axios.post(`${BASE_URL}/article`, {
        title: newArticle.title,
        description: newArticle.description,
        imageUrl: newArticle.imageUrl,
        userId: "12345",
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      throw error;
    }
  }

  static async deleteArticle(idArticle) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/article/${idArticle}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error);
      throw error;
    }
  }
}
