namespace veteran_connect_admin.Services {
  export function AuthInterceptor($window: ng.IWindowService) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.localStorage.getItem('token')) {
          // Bearer token
          config.headers['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token');
        }
        return config;
      }
    }
  }
  angular.module('veteran_connect_admin').service('AuthInterceptor', AuthInterceptor);
}
