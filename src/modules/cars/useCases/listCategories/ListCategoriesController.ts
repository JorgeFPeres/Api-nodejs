import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListCategoriesUseCase } from "./ListCategorisUseCase"

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const list = await listCategoriesUseCase.execute()

    return res.status(201).json(list)
  }
}

export { ListCategoriesController }
