import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";




class ListUserReceiveComplimentsController {

  async handle(request: Request, reponse: Response) {
    const { user_id } = request

    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService()

    const compliments = await listUserReceiveComplimentsService.execute(user_id)

    return reponse.json(compliments)

  }
}

export { ListUserReceiveComplimentsController }