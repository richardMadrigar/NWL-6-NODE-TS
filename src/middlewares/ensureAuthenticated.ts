import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface YPayload {
  sub: string;
}

export function ensureAuthencticated(request: Request, response: Response, next: NextFunction) {


  //recebendo Token
  const authToken = request.headers.authorization;

  //validar se Token esta preechido
  if (!authToken) {
    return response.status(401).end()
  }

  //armazenando valor no segundo variavel do array e deixando de fora a primeira
  const [, token] = authToken.split(" ")


  //validar se token é valido =>
  try {
    const { sub } = verify(token, "4f93ac9d10cb751b8c9c646bc9dbccb8") as YPayload;

    //recuperar informaçoes do usuario =>
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

}