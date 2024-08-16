import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type Payload = {
  id: string;
}
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization; //token="Bearer ddwhkjsbjbsbvf"
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }
  try {
    const [_, tokenCorrect] = token.split(' ');
    // Verificar se o token é válido
    const { id } = verify(tokenCorrect, process.env.TOKEN_KEY as string) as Payload;
    console.log(id);
     req.user = { id }; // req.user = { id: "123" }

  } catch (error) {
      return res.status(401).json({message:error});
  }

  next();
}