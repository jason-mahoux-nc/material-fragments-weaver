import Keycloak, { KeycloakConfig } from 'keycloak-js';
import { AuthLoginOptions, AuthLogoutOptions, AuthService } from './auth.service';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8082',
  realm: 'squash',
  clientId: 'squash-frontend'
};

export class KeycloakAuthService implements AuthService {
  private static instance: KeycloakAuthService;
  private keycloak: Keycloak | undefined;

  private constructor(config: KeycloakConfig) {
    this.init(config);
  }

  public static getInstance(): KeycloakAuthService {
    if (!KeycloakAuthService.instance) {
      KeycloakAuthService.instance = new KeycloakAuthService(keycloakConfig);
    }
    return KeycloakAuthService.instance;
  }

  private init(config: KeycloakConfig): void {
    this.keycloak = new Keycloak(config);
    this.keycloak
      .init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })
      .catch(err => console.error('Keycloak init failed', err));
  }

  login(options: AuthLoginOptions): void {
    if (this.keycloak) {
      this.keycloak.login({ redirectUri: options.redirectUri });
    }
  }

  isAuthenticated(): boolean {
    return !!this.keycloak?.authenticated;
  }

  getToken(): string {
    return this.keycloak?.token || '';
  }

  refreshToken(minValidity: number): void {
    this.keycloak?.updateToken(minValidity).catch(() => console.warn('Token refresh failed'));
  }

  logout(options: AuthLogoutOptions): void {
    this.keycloak?.logout({ redirectUri: options.redirectUri });
  }
}
