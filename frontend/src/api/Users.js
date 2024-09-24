import { BASE_URL, axios } from "../config";
const token = localStorage.getItem("Token");

export default class Users {
  static async signup(form) {
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, {
        email: form.email,
        pseudo: form.pseudo,
        password: form.password,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      throw error;
    }
  }

  static async login(form) {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email: form.email,
        password: form.password,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      throw error;
    }
  }

  static async getUserConnected() {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserConnected`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récuperation des informations de l'utilisateur:",
        error
      );
      throw error;
    }
  }

  static async updateUserProfil(form) {
    try {
      console.log(form)
      const response = await axios.put(
        `${BASE_URL}/user/${form._id}`,
        {
          email: form.email,
          pseudo: form.pseudo,
          password: form.password,
          _id: form._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la modification des informations de l'utilisateur:"
      );
      throw error;
    }
  }
}
