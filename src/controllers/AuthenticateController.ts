import { Request, Response } from "express";
import AuthenticateUC from '../model/useCases/AuthenticateUC';

class AuthenticateController {
  async handle(req: Request, res: Response) {
    const {email , password } = req.body;


    const result = await AuthenticateUC.execute({ email, password });

    if (result.status !== 400) {
      return res.status(200).json({ token:result.token });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  }
}

export default new AuthenticateController();