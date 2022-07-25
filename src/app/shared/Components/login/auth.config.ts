import { AuthConfig } from 'angular-oauth2-oidc';
export const oauthconfig: AuthConfig = {

    // Google
    //issuer: "https://accounts.google.com",
    //clientId: "314569472091-rv6844feus2tocti0nucnr4pgc3jct4u.apps.googleusercontent.com",
    //dummyClientSecret: "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" ,  

    postLogoutRedirectUri: window.location.origin,
    // redirectUri: window.location.origin + "/index.html",
    redirectUri: "http://localhost:4200/gp/search/analytics",


    // OpenIAM
    issuer: "http://178.79.171.253/idp/oauth2/simpliciti-app-codeflow",
    clientId: "77753731E98A41F5987A650D2C6A16F1",
    dummyClientSecret: "79a52e9e3e1dc6b6f49997acc11423db7b8227e7cdb245ec9d6a892decd90721",
    //dummyClientSecret: "demo-code-flow" ,  
    responseType: 'code',
    scope: "openid  email profile role",
    silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,
    useSilentRefresh: true,
    clearHashAfterLogin: true,
    showDebugInformation: true,
    sessionChecksEnabled: true,
    requireHttps: false,
    strictDiscoveryDocumentValidation: false
}