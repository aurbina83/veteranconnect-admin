var veteran_connect_admin;
(function (veteran_connect_admin) {
    var Services;
    (function (Services) {
        var VerifyService = (function () {
            function VerifyService($http, $q, $state, $window) {
                this.$http = $http;
                this.$q = $q;
                this.$state = $state;
                this.$window = $window;
                this.status = { admin: null };
                if (this.getToken()) {
                    this.setUser();
                    $state.go('about');
                }
            }
            VerifyService.prototype.login = function (user) {
                var _this = this;
                var q = this.$q.defer();
                this.$http.post('api/admin/login', user).then(function (res) {
                    _this.setToken(res.data['token']);
                    _this.setUser();
                    q.resolve();
                }, function (err) {
                    q.reject(err.data.message);
                });
                return q.promise;
            };
            VerifyService.prototype.setUser = function () {
                var token = this.getToken();
                var u = JSON.parse(this.urlBase64Decode(this.getToken().split('.')[1]));
                this.status.admin = u.admin;
            };
            VerifyService.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            VerifyService.prototype.setToken = function (token) {
                this.$window.localStorage.setItem('token', token);
            };
            VerifyService.prototype.logout = function () {
                this.$window.localStorage.removeItem('token');
                this.clearUser();
                this.$state.go('home');
            };
            VerifyService.prototype.clearUser = function () {
                this.status.admin = null;
            };
            VerifyService.prototype.urlBase64Decode = function (str) {
                var output = str.replace(/-/g, '+').replace(/_/g, '/');
                switch (output.length % 4) {
                    case 0: {
                        break;
                    }
                    case 2: {
                        output += '==';
                        break;
                    }
                    case 3: {
                        output += '=';
                        break;
                    }
                    default: {
                        throw 'Illegal base64url string!';
                    }
                }
                return decodeURIComponent(encodeURIComponent(this.$window.atob(output)));
            };
            VerifyService.prototype.search = function (user) {
                var q = this.$q.defer();
                this.$http.get("api/users/find?first=" + user.firstName + "&last=" + user.lastName + "&branch=" + user.branch).then(function (res) {
                    q.resolve(res);
                }, function (err) {
                    q.reject(err.data.message);
                });
                return q.promise;
            };
            VerifyService.prototype.verify = function (user) {
                var q = this.$q.defer();
                this.$http.put('api/users/verify', user).then(function (res) {
                    q.resolve();
                }, function (err) {
                    q.reject(err.data.message);
                });
                return q.promise;
            };
            return VerifyService;
        }());
        Services.VerifyService = VerifyService;
        angular.module('veteran_connect_admin').service('VerifyService', VerifyService);
    })(Services = veteran_connect_admin.Services || (veteran_connect_admin.Services = {}));
})(veteran_connect_admin || (veteran_connect_admin = {}));
