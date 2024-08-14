import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes"

dotenv.config()

const app = express()
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({"message": "Welcome to notes application backend"})
})

app.use(routes)

const PORT = process.env.PORT || 8008

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
