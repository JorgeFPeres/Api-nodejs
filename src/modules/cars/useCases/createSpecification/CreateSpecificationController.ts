import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"
import { Request, Response } from "express"

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  execute(req: Request, res: Response): Response {
    const { name, description } = req.body

    this.createSpecificationUseCase.execute({ name, description })

    return res.status(201).send()
  }
}

export { CreateSpecificationController }
