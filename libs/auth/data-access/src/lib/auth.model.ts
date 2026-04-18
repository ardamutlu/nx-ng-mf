export enum PassportStrategy {
  GitHub = 'github',
  Google = 'google',
}

export interface User {
  avatar_url: string;
  email: string;
  name: string;
  provider: string;
}
