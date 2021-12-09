import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase"

class UpdateAvatarUseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    //Receber Arquovp
    const avatar_file = req.file.filename
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file })

    return res.status(204).send()
  }
}
export { UpdateAvatarUseController }
