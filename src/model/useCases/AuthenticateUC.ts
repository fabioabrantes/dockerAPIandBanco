import { sign } from "jsonwebtoken";
import { prisma } from "../../database/respository";
import { compare } from "bcrypt";

type Params = {
  email: string;
  password: string;
}

class AuthenticateUC {


  async execute({ email, password }: Params) {

    //validação dos campus email e passowrd

    ///validação verificando se o usario já está cadastrrado
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return { message: "Error: email ou password inválidos.", status: 400 }
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      return { message: "Error: email ou password inválidos.", status: 400 }
    }

    const token = sign(
      {
        id: user.id
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "1d"
      }
    );


    return { token };

  }
}

export default new AuthenticateUC();