import { Request, Response } from "express"
import { ListCategoriesUseCase } from "./ListCategorisUseCase"

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const list = this.listCategoriesUseCase.execute()

    return res.status(201).json(list)
  }
}

export { ListCategoriesController }
