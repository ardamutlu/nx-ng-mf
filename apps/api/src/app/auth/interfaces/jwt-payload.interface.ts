export interface JwtPayload {
  sub: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  provider?: string;
}
