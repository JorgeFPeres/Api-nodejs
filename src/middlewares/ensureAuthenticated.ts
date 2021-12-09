import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error("Token missing")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "c1a10985a403be4020ee9dc993014771")

    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(user_id as string)

    if (!user) {
      throw new Error("User didn't exists")
    }
    next()
  } catch {
    throw new Error("Invalid token")
  }
}
