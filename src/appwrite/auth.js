import config from "../config/config";
import { Account, Client, ID } from "appwrite";

// creating a new class AuthService
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_projectId);
    this.account = new Account(this.client);
  }

  // method to create a new account
  async createAccount({ email, password, name }) {
    try {
      const userDetails = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // if account is created successfully then login to the account
      if (userDetails) {
        return this.login({ email, password });
      } else {
        return userDetails;
      }
    } catch (error) {
      throw error;
    }
  }

  // method to login to the account
  async login({ email, passsword }) {
    try {
      return await this.account.createEmailPasswordSession(email, passsword);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  // method to logout from the account
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

// creating object of AuthService class to access its methods
const authService = new AuthService();
export default authService;
