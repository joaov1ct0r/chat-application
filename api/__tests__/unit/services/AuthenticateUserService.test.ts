import { mock } from "jest-mock-extended";
import IUser from "../../../src/interfaces/IUser";
import AuthenticateUserService from "../../../src/services/AuthenticateUserService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import IJwt from "../../../src/interfaces/IJwt";
import BadRequestError from "../../../src/errors/BadRequestError";
import UnathorizedError from "../../../src/errors/UnathorizedError";
import IAuthenticateUserRepository from "../../../src/interfaces/IAuthenticateUserRepository";

const makeSut = () => {
  const mockAuthenticateUserRepository = mock<IAuthenticateUserRepository>();

  const sut: AuthenticateUserService = new AuthenticateUserService(
    mockAuthenticateUserRepository
  );

  return { mockAuthenticateUserRepository, sut };
};

describe("authenticate user service", () => {
  describe("when execute is called", () => {
    it("should throw an error if user is not registered", async () => {
      const { sut, mockAuthenticateUserRepository } = makeSut();

      mockAuthenticateUserRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("user1234@mail.com.br", "123412341234");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should throw an error if password is incorrect", async () => {
      const { sut, mockAuthenticateUserRepository } = makeSut();

      mockAuthenticateUserRepository.execute.mockResolvedValueOnce({
        id: 1,
        senha: "123123123",
      } as IUser);

      expect(async () => {
        await sut.execute("user1234@mail.com.br", "789789789");
      }).rejects.toThrow(new UnathorizedError("Falha na autenticação!"));
    });

    it("should return a jwt token", async () => {
      const { sut, mockAuthenticateUserRepository } = makeSut();

      mockAuthenticateUserRepository.execute.mockResolvedValueOnce({
        id: 1,
        nome: "user nome",
        email: "user1234@mail.com.br",
        senha: bcrypt.hashSync("123123123"),
        nascimento: "00/00/0000",
      } as unknown as IUser);

      const token = await sut.execute("user1234@mail.com.br", "123123123");

      const compareToken = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string
      ) as IJwt;

      expect(compareToken.id).toBe(1);
    });
  });
});
