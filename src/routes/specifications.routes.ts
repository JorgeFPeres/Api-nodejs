import { Router } from "express"

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationRepository"

import { createSpecificationController } from "../modules/cars/useCases/createSpecification"

const specificationRoutes = Router()

specificationRoutes.post("/", (req, res) => {
  return createSpecificationController.execute(req, res)
})

export { specificationRoutes }
