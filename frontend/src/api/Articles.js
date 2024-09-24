import { BASE_URL, axios } from "../config";
const token = localStorage.getItem("Token");

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

  static async createArticle(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/article`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      throw error;
    }
  }

  static async deleteArticle(idArticle) {
    try {
      const response = await axios.delete(`${BASE_URL}/article/${idArticle}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error);
      throw error;
    }
  }

  static async getArticlesUserConnected() {
    try {
      const response = await axios.get(
        `${BASE_URL}/article/articlesUserConnected`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récuperation des articles:", error);
      throw error;
    }
  }
}
