import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export class UserClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAllUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(`${this.baseUrl}/users`);
    return response.data;
  }

  async getUserById(id: number): Promise<User> {
    const response = await axios.get<User>(`${this.baseUrl}/users/${id}`);
    return response.data;
  }
}