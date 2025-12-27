export interface JWTPayloadInterface {
    sub: string;
    email: string;
    roles: string[];
    iat?: number;
    exp?: number;
}