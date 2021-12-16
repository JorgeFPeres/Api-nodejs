import { container } from "tsyringe"
import { Request, Response } from "express"
import { UploadCarImageUseCase } from "./UploadCarImageUseCase"
interface IFiles {
  filename: string
}
class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const images = req.files as IFiles[]

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

    const images_name = images.map((file) => file.filename)

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    })

    return res.json(201).send()
  }
}
export { UploadCarImageController }
