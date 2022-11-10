import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = `http://localhost:3000`;

export const useRZStore = defineStore("RZ", {
  state: () => ({
    checkLogin: false,
    user: {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    },
    products: [],
    totalPage: 0,
    currentPage: 0,
  }),
  getters: {},
  actions: {
    async logout() {
      localStorage.clear();
      this.checkLogin = false;
      this.router.push("/login");
    },

    async loginToSite(email, password) {
      try {
        let { data } = await axios.post(`${baseUrl}/login`, {
          email,
          password,
        });
        localStorage.setItem(`access_token`, data.access_token);
        localStorage.setItem(`username`, data.username);
        localStorage.setItem(`role`, data.role);

        this.checkLogin = true;
        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async register() {
      try {
        const { data } = await axios.post(`${baseUrl}/register`, this.user);
        this.checkLogin = false;
        this.router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },

    async googleSignIn(response) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/google-sign-in`,
          {},
          {
            headers: {
              google_token: response.credential,
            },
          }
        );
        localStorage.setItem(`access_token`, data.access_token);
        localStorage.setItem(`username`, data.username);
        localStorage.setItem(`role`, data.role);

        this.checkLogin = true;
        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    async fetchProduct(page) {
      if (!page) {
        page = 1;
      }
      try {
        let { data } = await axios.get(`${baseUrl}/product?page=${page}`);
        this.products = data.rows;
        this.totalPage = data.totalPages;
        this.currentPage = data.currentPages;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
