var veteran_connect_admin;
(function (veteran_connect_admin) {
    var Services;
    (function (Services) {
        function AuthInterceptor($window) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($window.localStorage.getItem('token')) {
                        config.headers['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token');
                    }
                    return config;
                }
            };
        }
        Services.AuthInterceptor = AuthInterceptor;
        angular.module('veteran_connect_admin').service('AuthInterceptor', AuthInterceptor);
    })(Services = veteran_connect_admin.Services || (veteran_connect_admin.Services = {}));
})(veteran_connect_admin || (veteran_connect_admin = {}));
