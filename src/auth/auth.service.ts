export interface AuthService {
  login(options: AuthLoginOptions): void;
  isAuthenticated(): boolean;
  getToken(): string;
  refreshToken(minValidity: number): void;
  logout(options: AuthLogoutOptions): void;
}

export interface AuthLoginOptions {
  redirectUri: string;
}

export interface AuthLogoutOptions {
  redirectUri: string;
}

export const getAuthService = (): AuthService => KeycloakAuthService.getInstance();

import { KeycloakAuthService } from './keycloak.service';
