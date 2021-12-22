import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/resetPasswordController"
import { SendForgotPasswordController } from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPassworController"
import { Router } from "express"

const passwordRoutes = Router()

const sendForgotPasswordController = new SendForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRoutes.post("/forgot", sendForgotPasswordController.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export { passwordRoutes }
