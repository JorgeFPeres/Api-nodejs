import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { Request, Response } from "express"

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body

    this.createCategoryUseCase.execute({ name, description })

    return res.status(201).send()
  }
}

export { CreateCategoryController }
