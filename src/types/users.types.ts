export interface IUserLogin {
  user: {
    email: string;
    password: string;
  };
}

export interface IUserRegister {
  user: {
    email: string;
    username: string;
    password: string;
  };
}

export interface IUserChange {
  user: {
    email: string;
    password: string;
    username: string;
    bio: string;
    image: string;
  };
}
