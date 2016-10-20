var veteran_connect_admin;
(function (veteran_connect_admin) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(VerifyService, $state) {
                this.VerifyService = VerifyService;
                this.$state = $state;
                this.user = {
                    name: null,
                    password: null
                };
            }
            HomeController.prototype.login = function () {
                var _this = this;
                this.VerifyService.login(this.user).then(function (res) {
                    _this.$state.go('about');
                }, function (err) {
                    alert(err);
                });
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('veteran_connect_admin').controller('HomeController', HomeController);
    })(Controllers = veteran_connect_admin.Controllers || (veteran_connect_admin.Controllers = {}));
})(veteran_connect_admin || (veteran_connect_admin = {}));
var veteran_connect_admin;
(function (veteran_connect_admin) {
    var Controllers;
    (function (Controllers) {
        var AboutController = (function () {
            function AboutController(VerifyService, $state, $window) {
                this.VerifyService = VerifyService;
                this.$state = $state;
                this.$window = $window;
                this.user = {
                    firstName: null,
                    lastName: null,
                    branch: null
                };
                this.users = [];
                console.log($window.screen.width);
                this.status = VerifyService.status;
                if (!this.status.admin) {
                    $state.go('home');
                }
            }
            AboutController.prototype.getUsers = function () {
                var _this = this;
                this.VerifyService.search(this.user).then(function (res) {
                    _this.users = _this.users.concat(res['data']);
                    for (var e in _this.user) {
                        _this.user[e] = "";
                    }
                }, function (err) {
                    alert(err);
                });
            };
            AboutController.prototype.verify = function (user) {
                var _this = this;
                this.VerifyService.verify(user).then(function (res) {
                    _this.users = [];
                }, function (err) {
                    alert(err);
                });
            };
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
        angular.module('veteran_connect_admin').controller('AboutController', AboutController);
    })(Controllers = veteran_connect_admin.Controllers || (veteran_connect_admin.Controllers = {}));
})(veteran_connect_admin || (veteran_connect_admin = {}));
