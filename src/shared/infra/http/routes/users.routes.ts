import { Router } from "express"
import multer from "multer"
import uploadConfig from "../../../../config/upload"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController"
import { UpdateAvatarUseController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController()
const updateAvatarController = new UpdateAvatarUseController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
)

export { usersRoutes }
