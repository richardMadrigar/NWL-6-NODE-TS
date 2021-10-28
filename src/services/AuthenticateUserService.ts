import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

import { compare } from "bcryptjs" //desencriptar senha
import { sign } from "jsonwebtoken" //gerar o token 



interface IAuthenticateRequest {
  email: string;
  password: string;
}


class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)


    //verifcar se email existe
    const user = await usersRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error("Email/Password incorrect ")
    }


    // verificar se senha esta correta 
    //12345 / 432532462-gfsdgfdg-435325 => ele vai comparar
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect ")
    }

    //se estiver correto => gerar token 
    const token = sign({ //config do token => expiraçao do token 
      email: user.email
    }, "4f93ac9d10cb751b8c9c646bc9dbccb8", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token;

  }
}

export { AuthenticateUserService }