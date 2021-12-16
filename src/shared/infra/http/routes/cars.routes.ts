import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { ListCarController } from "@modules/cars/useCases/listAvailableCar/ListCarController"
import { Router } from "express"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarController = new ListCarController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get("/available", listCarController.handle)

export { carsRoutes }
