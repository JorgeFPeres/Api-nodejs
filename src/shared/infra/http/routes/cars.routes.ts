import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { ListCarController } from "@modules/cars/useCases/listAvailableCar/ListCarController"
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController"
import { Router } from "express"
import multer from "multer"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import uploadConfig from "../../../../config/upload"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarController = new ListCarController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const uploadCarImage = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get("/available", listCarController.handle)

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array("images"),
  uploadCarImageController.handle
)

export { carsRoutes }
