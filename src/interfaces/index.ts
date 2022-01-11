export interface ITokenData {
  token: string;
  expiresIn: Date;
}

export interface IUser {
  email: string;
  tokenData?: ITokenData;
}

export * from "./IModel.interface";
export * from "./IPopulate.interface";