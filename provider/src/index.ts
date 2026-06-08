import express from "express";
import usersRouter from "./routes/users";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(usersRouter);
  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Provider running on http://localhost:${port}`);
  });
}