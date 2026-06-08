import { Router, Request, Response } from "express";

const router = Router();

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Lucas", email: "lucas.thomaz@example.com" },
  { id: 2, name: "John", email: "john.doe@example.com" },
];

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

export default router;