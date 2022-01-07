export interface ITokenData {
  token: string;
  date: Date;
}

export interface IUser {
  // firstName: string;
  // lastName: string;
  // username: string;
  email: string;
  // avatar?: string;
  // role: string;
  // bio?: string;
  tokenData?: ITokenData;
}

export * from "./IModel.interface";
export * from "./IPopulate.interface";