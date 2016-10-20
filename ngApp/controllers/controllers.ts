namespace veteran_connect_admin.Controllers {

    export class HomeController {
        public user = {
            name: null,
            password: null
        }

        constructor(private VerifyService: veteran_connect_admin.Services.VerifyService, private $state: ng.ui.IStateService, private ngToast){}

        public login(){
            this.VerifyService.login(this.user).then((res)=>{
                this.$state.go('about');
            }, (err) =>{
                this.ngToast.create({
                    className: 'warning',
                    content: err
                })
            })
        }
    }
    angular.module('veteran_connect_admin').controller('HomeController', HomeController);
}

namespace veteran_connect_admin.Controllers {
    export class AboutController {
        public status;

        public user = {
            firstName: null,
            lastName: null,
            branch: null
        }

        public users = [];
        constructor(private VerifyService: veteran_connect_admin.Services.VerifyService, private $state: ng.ui.IStateService, private $window: ng.IWindowService, private ngToast){
            console.log($window.screen.width);
            this.status = VerifyService.status;
            if (!this.status.admin) {
                $state.go('home');
            }
        }

        public getUsers(){
            this.VerifyService.search(this.user).then((res) =>{
                this.users = this.users.concat(res['data']);
                for(var e in this.user){
                    this.user[e] = "";
                }
            }, (err) =>{
                this.ngToast.create({
                    className: 'warning',
                    content: err
                })
            });
        }

        public verify(user){
            this.VerifyService.verify(user).then((res)=>{
                this.ngToast.create({
                    className: 'success',
                    content: 'verified'
                });
                this.users = [];
            }, (err) =>{
                this.ngToast.create({
                    className: 'warning',
                    content: err
                })
            })
        }

        public logout(){
            this.VerifyService.logout();
        }
    }
    angular.module('veteran_connect_admin').controller('AboutController', AboutController);
}
