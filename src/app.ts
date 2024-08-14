import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({"message": "Welcome to notes application backend"})
})

app.use(routes)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
})

const PORT = process.env.PORT || 8008

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
