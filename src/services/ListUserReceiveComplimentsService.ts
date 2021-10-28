import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"




class ListUserReceiveComplimentsService {

  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(UsersRepositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSend", "userReceiver", "tag"]
    })

    return compliments
  }
}

export { ListUserReceiveComplimentsService }