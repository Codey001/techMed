import axios from "axios";

export class AuthService {
  async createAccount({ type,name, email, password, confirmPassword }) {
    console.log("SIGNUP CALLED IN AUTH");
    console.log([type,name, email, password, confirmPassword])


    try {
      // const url = `${process.env.REACT_APP_AUTH_BASE_URL}/auth/register`;
      const url = `http://localhost:8080/api/auth/signup`;

      const response = await axios.post(url, {
        type: type,
        name:name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

    // console.log("signup data", response);
    const responseData = await this.login({type, email, password})
    return responseData;


    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({ type, email, password}) {
    console.log("LOGIN CALLED IN AUTH");
    try {
      const url = `http://localhost:8080/api/auth/login`;
      const response = await axios.post(url, {
        type: type,
        email: email,
        password: password,
      });
      console.log("LOFIN RETURN RESPONSE", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async logOut() {
    try {

      const account = await this.account.deleteSessions();
      if (account) {
        return account;
      } else {
        console.log("APPWRITE ERROR IN GETTING LOGOUT");
      }
    } catch (error) {
      console.log("Appwrite service error :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
