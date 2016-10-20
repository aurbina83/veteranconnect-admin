namespace veteran_connect_admin.Services {
        export class VerifyService{
            public status = {admin: null};
            constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $state: ng.ui.IStateService, private $window: ng.IWindowService){
                if (this.getToken()) {
                    this.setUser();
                    $state.go('about');
                }
            }

            public login(user){
                let q = this.$q.defer();
                this.$http.post('api/admin/login', user).then((res)=>{
                    this.setToken(res.data['token']);
                    this.setUser();
                    q.resolve();
                }, (err) =>{
                    q.reject(err.data.message);
                })
                return q.promise;
            }

            public setUser() {
                let token = this.getToken();
                let u = JSON.parse(this.urlBase64Decode(this.getToken().split('.')[1]));
                this.status.admin = u.admin;
            }

            public getToken() {
                return this.$window.localStorage.getItem('token');
            }

            public setToken(token: string) {
                this.$window.localStorage.setItem('token', token);
            }

            public logout() {
                this.$window.localStorage.removeItem('token');
                this.clearUser();
                this.$state.go('home')
            }

            public clearUser() {
                this.status.admin = null;
            }

            public urlBase64Decode(str) {
                var output = str.replace(/-/g, '+').replace(/_/g, '/');
                switch (output.length % 4) {
                    case 0: { break; }
                    case 2: { output += '=='; break; }
                    case 3: { output += '='; break; }
                    default: {
                        throw 'Illegal base64url string!';
                    }
                }

                return decodeURIComponent(encodeURIComponent(this.$window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
            }


            ////////////////////////////////////
            ///////////verify///////////////
            ///////////////////////////////////

            public search(user){
                let q = this.$q.defer();
                this.$http.get(`api/users/find?first=${user.firstName}&last=${user.lastName}&branch=${user.branch}`).then((res)=>{
                    q.resolve(res);
                }, (err) =>{
                    q.reject(err.data.message);
                })
                return q.promise;
            }

            public verify(user){
                let q = this.$q.defer();
                this.$http.put('api/users/verify', user).then((res)=>{
                    q.resolve();
                }, (err) =>{
                    q.reject(err.data.message);
                })
                return q.promise;
            }
        }
        angular.module('veteran_connect_admin').service('VerifyService', VerifyService);
    }
