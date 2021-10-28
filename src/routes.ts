import { Router } from "express"
const router = Router()


//importacoes
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { CreateUserController } from "./controllers/CreateUserController"
import { ListUsersController } from "./controllers/ListUsersController"
import { CreateTagController } from "./controllers/CreateTagController"
import { ListTagsController } from "./controllers/ListTagsController"

import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthencticated } from "./middlewares/ensureAuthenticated"



// inicializando importaçoes
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()

const listUsersController = new ListUsersController()
const listTagsController = new ListTagsController()



//ROTAS 
router.get("/users/compliments/receive", ensureAuthencticated, listUserReceiveComplimentsController.handle)
router.get("/users/compliments/send", ensureAuthencticated, listUserSendComplimentsController.handle)
router.post("/compliments", ensureAuthencticated, createComplimentController.handle)
router.post("/tags", ensureAuthencticated, ensureAdmin, createTagController.handle)

router.get("/users", ensureAuthencticated, listUsersController.handle) //mostrar usuarios
router.get("/tags", ensureAdmin, listTagsController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/users", createUserController.handle)



export { router }