import { Request, Response } from "express"
import { container } from "tsyringe"
import { SendForgotPassworUseCase } from "./SendForgotPassworUseCase"

class SendForgotPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const sendForgotPasswordUseCase = container.resolve(
      SendForgotPassworUseCase
    )

    await sendForgotPasswordUseCase.execute(email)
    return res.send()
  }
}

export { SendForgotPasswordController }
