import { prisma } from "../../database/respository";
import {hash} from "bcrypt";

type Params = {
  cpf: string;
  name: string;
  email:string;
  password:string;
}

class RegisterUser {


  async execute({ cpf, name,email,password}: Params) {
 
    //validação dos campus cpf e name

    ///validação verificando se o usario já está cadastrrado
    const user = await prisma.user.findUnique({
      where: {
        cpf
      }
    });

    if (user !== null) {
      return { message: "Error: cliente já existe no banco.", status:400}
    }

    const passwordCrypted = await hash(password,2)
    const client = await prisma.user.create({
      data: {
        cpf,
        name,
        email,
        password:passwordCrypted,
        transactions: {
          create: {
            title: "dinheiro inicial para a conta",
            type: "Credit",
            amount: 50
          }
        }
      },
      include: {
        transactions: {
          select: {
            title: true
          }
        }
      }
    });

    return { client }

  }
}

export default new RegisterUser();