import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"




class ListUserSendComplimentsService
 {

  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(UsersRepositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id
      }
    })

    return compliments
  }
}

export { ListUserSendComplimentsService
 }