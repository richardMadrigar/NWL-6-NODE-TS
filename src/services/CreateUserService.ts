import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs" //encriptar senha 

interface YUserRequest { //tipagem TS
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}



class CreateUserService {
  async execute({ name, email, admin = false, password }: YUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) { //verifica se o email esta preenchido
      throw new Error("email incorrect") //se nao 
    }

    const userAlreadyExists = await usersRepository.findOne({ //verifica se usuario existe
      email
    });


    if (userAlreadyExists) { //se ele existir => lancar um erro
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8)//usando a ecriptaçao

    const user = usersRepository.create({ //se tiver tudo certo, criar esta instancia 
      name,
      email,
      admin,
      password: passwordHash
    });

    await usersRepository.save(user) //salvar 

    return user

  }
}

export { CreateUserService }