import { BASE_URL, axios } from "../config";

export default class Users {
  
  static async signup(form) {
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, {
        email: form.email,
        pseudo: form.pseudo,
        password: form.password
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
        password: form.password
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      throw error;
    }
  }
}