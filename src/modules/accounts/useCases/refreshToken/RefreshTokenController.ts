import { Request, Response } from "express"
import { container } from "tsyringe"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers["x-access-token"] || req.query.token
    const refreshtokenUseCase = container.resolve(RefreshTokenUseCase)

    const refresh_token = await refreshtokenUseCase.execute(token)

    return res.json(refresh_token)
  }
}
export { RefreshTokenController }
