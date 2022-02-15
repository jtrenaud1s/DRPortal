/// <reference types="react-scripts" />
interface DecodedJWT {
  exp: number;
  iat: number;
  user_id: number;
  jti: string;
  token_type: string;
}
