import { mock } from "jest-mock-extended";
import IUser from "../../../src/interfaces/IUser";
import CreateUserService from "../../../src/services/CreateUserService";
import { Repository } from "typeorm";
import BadRequestError from "../../../src/errors/BadRequestError";
import IAuthenticateUserRepository from "../../../src/interfaces/IAuthenticateUserRepository";
import ICreateUserRepository from "../../../src/interfaces/ICreateUserRepository";

const makeSut = () => {
  const mockAuthenticateUserRepository = mock<IAuthenticateUserRepository>();
  const mockCreateUserRepository = mock<ICreateUserRepository>();

  const sut: ICreateUserService = new CreateUserService(
    mockAuthenticateUserRepository,
    mockCreateUserRepository
  );

  return { mockAuthenticateUserRepository, mockCreateUserRepository, sut };
};

describe("create user service", () => {
  describe("when execute is called", () => {
    it("should throw an error if user already exists", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOneBy.mockResolvedValueOnce({
        id: "1",
      } as unknown as IUser);

      expect(async () => {
        await sut.execute(
          "user1234@mail.com.br",
          "user nome",
          "54385092-394-29-2",
          "00/00/0000"
        );
      }).rejects.toThrow(new BadRequestError("User ja cadastrado"));
    });

    it("should create a new user", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOneBy.mockResolvedValueOnce(null);

      mockRepository.create.mockReturnValueOnce({
        id: 1,
        nome: "user nome",
        email: "user1234@mail.com.br",
        senha: "54385092-394-29-2",
        nascimento: "00/00/0000",
      } as IUser);

      mockRepository.save.mockResolvedValueOnce({
        id: 1,
        nome: "user nome",
        email: "user1234@mail.com.br",
        senha: "54385092-394-29-2",
        nascimento: "00/00/0000",
      } as IUser);

      const result = await sut.execute(
        "user1234@mail.com.br",
        "user nome",
        "54385092-394-29-2",
        "00/00/0000"
      );

      expect(result).toHaveProperty("id");
    });
  });
});
