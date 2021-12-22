import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../../../errors/AppError"
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository"
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository"
import auth from "@config/auth"

interface IPayload {
  sub: string
}

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
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload

    const usersRepository = new UsersRepository()

    req.user = {
      id: user_id as string,
    }
    next()
  } catch {
    throw new AppError("Invalid token", 401)
  }
}
