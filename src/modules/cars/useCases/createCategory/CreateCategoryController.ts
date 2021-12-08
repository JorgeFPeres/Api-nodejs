import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { Request, Response } from "express"

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    await this.createCategoryUseCase.execute({ name, description })

    return res.status(201).send()
  }
}

export { CreateCategoryController }
