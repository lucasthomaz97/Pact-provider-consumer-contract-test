import { Router, Request, Response } from "express";

const router = Router();

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserInput {
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Lucas", email: "lucas.thomaz@example.com" },
  { id: 2, name: "John", email: "john.doe@example.com" },
];

function emailExists(email: string): boolean {
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

router.get("/users", (_req: Request, res: Response) => {
  res.json(users);
});

router.get("/users/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

router.post("/users", (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required" });
    return;
  }

  if (emailExists(email)) {
    res.status(409).json({ error: "Email already exists" });
    return;
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;