export interface IUser {
  user: {
    id: number;
    email: string;
    username: string;
    bio: string;
    image: string;
    password: string;
  };
}
export interface ToolkitState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  errors?: BaseReqError | null;
}

export interface AuthState extends ToolkitState {
  user: IUser | null;
}

export type BaseReqError = {
  [key: string]: string;
};
