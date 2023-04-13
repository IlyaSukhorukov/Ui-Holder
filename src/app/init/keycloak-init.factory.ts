import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'holder',
        clientId: 'hasura',
      },
      initOptions: {
        onLoad: 'login-required',
        // silentCheckSsoRedirectUri: window.location.origin + '/assets/verify-sso.html'
        flow: 'standard'
      }
    });
}
