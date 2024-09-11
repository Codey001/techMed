import axios from "axios";

export class AuthService {
  async createAccount({ type, name, email, password, confirmPassword }) {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const url = `${baseUrl}/api/auth/signup`;
      const response = await axios.post(url, {
        type: type,
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      const responseData = await this.login({ type, email, password });

      return responseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({ type, email, password }) {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;

      const url = `${baseUrl}/api/auth/login`;
      const response = await axios.post(url, {
        type: type,
        email: email,
        password: password,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logOut() {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;

      const url = `${baseUrl}/api/auth/logout`;
      const response = await axios.post(url);

      return response;
    } catch (error) {
      console.log("Error in logout", error);
    }
  }
}

const authService = new AuthService();
export default authService;
