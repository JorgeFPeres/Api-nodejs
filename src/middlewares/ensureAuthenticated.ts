import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../erros/AppError"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "c1a10985a403be4020ee9dc993014771")

    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(user_id as string)

    if (!user) {
      throw new AppError("User didn't exists", 401)
    }
    req.user = {
      id: user_id as string,
    }
    next()
  } catch {
    throw new AppError("Invalid token", 401)
  }
}
