import { Request, Response } from "express";
import RegisterUser from '../model/useCases/registerUser';

class RegisterUserController {
  async handle(req: Request, res: Response) {
    const { cpf, name,email, password } = req.body;


    const result = await RegisterUser.execute({ cpf, name,email,password });

    if (result.status !== 400) {
      return res.status(200).json({ result });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  }
}

export default new RegisterUserController();