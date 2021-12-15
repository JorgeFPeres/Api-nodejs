import "reflect-metadata"
import express, { NextFunction, Response, Request } from "express"
import "express-async-errors"
import "../../container"
import swaggerUI from "swagger-ui-express"
import { router } from "./routes"
import swaggerFile from "../../../swagger.json"
import createConnection from "@shared/infra/typeorm"
import { AppError } from "../../errors/AppError"

createConnection()
const app = express()

app.use(express.json())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))
app.use(router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }
  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  })
})

app.listen(3333, () => console.log("Server is running"))
