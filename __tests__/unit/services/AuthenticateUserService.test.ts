import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import AuthenticateUserService from "../../../src/services/AuthenticateUserService";

import IAuthenticateUserService from "../../../src/interfaces/IAuthenticateUserService";

import { Repository } from "typeorm";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<Repository<IUser>>();

  const sut: IAuthenticateUserService = new AuthenticateUserService(
    mockRepository
  );

  return { mockRepository, sut };
};

describe("authenticate user service", () => {
  describe("when execute is called", () => {
    it("should throw an error if user is not registered", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOneBy.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("user1234@mail.com.br", "123412341234");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });
  });
});
