import { User, CreateUserInput } from "../routes/users";

class UserRepository {
  private users: User[] = [
    { id: 1, name: "Lucas", email: "lucas.thomaz@example.com" },
    { id: 2, name: "John", email: "john.doe@example.com" },
  ];
  private nextId: number = 3;

  findAll(): User[] {
    return [...this.users];
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  emailExists(email: string): boolean {
    return this.users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  create(input: CreateUserInput): User {
    const newUser: User = {
      id: this.nextId++,
      ...input,
    };
    this.users.push(newUser);
    return newUser;
  }

  clear(): void {
    this.users = [];
  }

  seed(users: User[]): void {
    this.users = [...users];
    this.nextId =
    users.length > 0
      ? Math.max(...users.map(u => u.id)) + 1
      : 1;
  }
}

export const userRepository = new UserRepository();