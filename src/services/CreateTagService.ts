import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService {

  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    if (!name) { //verifica se o nome esta preenchido
      throw new Error("Incorrect name!")
    }


    //SELECT * FROM TAGS WHERE NAME = "name"
    const tagAlreadyExists = await tagsRepositories.findOne({ //buscando nome
      name
    })

    if (tagAlreadyExists) { //se ela existe => erro...
      throw new Error('Tag already exists!')
    }


    //se ela n existir => então salva 
    const tag = tagsRepositories.create({
      name
    })

    await tagsRepositories.save(tag) //salvando no BD

    return tag

  }
}

export { CreateTagService }