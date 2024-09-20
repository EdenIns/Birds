import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      isAuthenticated: false,
    };
  },
  actions: {
    
    login(authToken) {
      localStorage.setItem("Token", authToken);
      this.isAuthenticated = true;
    },

    logout() {
      try {
        localStorage.removeItem("Token");
        this.isAuthenticated = false;
      } catch {
        alert("Problème lors de la déconnexion");
      }
    },

    isUserConnected() {
      const token = localStorage.getItem("Token");
      if (token) {
        this.isAuthenticated = true;
        console.log("connecté");
      } else {
        this.isAuthenticated = false;
        console.log("non connecté");
      }
    },
  },
});
