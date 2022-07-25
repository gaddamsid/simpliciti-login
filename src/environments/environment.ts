// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_CW5_URL: 'http://20.190.248.121:8112/',
  BASE_eTIMS_URL: 'http://20.96.145.113:8011/',
  BASE_CW5_QUEUE_URL: 'http://20.75.106.253:8114/',
  // BASE_eTIMS_SEARCH_URL: 'http://20.97.131.251:8089/',
  BASE_eTIMS_SEARCH_URL : 'http://20.96.148.37:8089/', //Original
  BASE_CW5_SEARCH_URL: 'http://20.80.203.237:8113/',
  API_V: 'api/v1/',
  ADMIN_V: 'admin/v1/',
  SEARCH_V: 'violation/v1/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
