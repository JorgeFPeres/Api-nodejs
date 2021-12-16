import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListCarUseCase } from "./ListCarUseCase"

class ListCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query
    console.log(name)

    const listCarUseCase = container.resolve(ListCarUseCase)

    const cars = await listCarUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    })

    return res.json(cars)
  }
}

export { ListCarController }
