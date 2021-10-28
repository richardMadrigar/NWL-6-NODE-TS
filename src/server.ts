import express, { Request, Response, NextFunction } from "express"
const app = express(); //@typesexpress
import "express-async-errors"
import cors from "cors"

import { router } from "./routes"
import "reflect-metadata"

import "./database"


app.use(express.json()) //falando que vai receber json como parametros
app.use(cors())

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})






app.listen(3000, () => console.log("Server is running 3000"))
