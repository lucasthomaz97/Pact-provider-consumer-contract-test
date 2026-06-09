import { Router, Request, Response } from "express";
import { userRepository } from "../repository/UserRepository";

const router = Router();

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

router.get("/users", (_req: Request, res: Response) => {
  res.json(userRepository.findAll());
});

router.get("/users/:id", (req: Request, res: Response) => {
  const user = userRepository.findById(Number(req.params.id));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

router.post("/users", (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  const { name, email } = req.body;

  if (typeof name !== 'string' || typeof email !== 'string' || !name?.trim() || !email?.trim()) {
    res.status(400).json({ error: "Name and email are required" });
    return;
  }

  if (!isValidEmail(email) || typeof email !== 'string' || email.length > 255) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  if (userRepository.emailExists(email)) {
    res.status(409).json({ error: "Email already exists" });
    return;
  }

  const newUser = userRepository.create({ name, email });
  res.status(201).json(newUser);
});

export default router;