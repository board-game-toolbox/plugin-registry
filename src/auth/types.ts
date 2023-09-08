export interface JwtPayload {
  sub: string;
  username: string;
}

export interface LoginBody {
  usn: string;
  pwd: string;
}

export type RegisterBody = LoginBody;
