import { prisma } from "../../database/respository";


type Params = {
  cpf: string;
  name: string;
}

class RegisterUser {


  async execute({ cpf, name }: Params) {
 
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

    const client = await prisma.user.create({
      data: {
        cpf,
        name,
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