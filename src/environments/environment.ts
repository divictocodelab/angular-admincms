// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

const base_url = `http://localhost:5003/api`;

class endpoint {
  userBase = base_url + '/user';
  UserEndpoints = {
    GetUserList: this.userBase,
    AddUserList: this.userBase,
    GetUserDetail: (id) => this.userBase + '/'+ id,
    DeleteUser: (id) => this.userBase + '/'+ id,
    UpdateUserDetail: (id) => this.userBase + '/'+ id
  }
}

export const API = new endpoint;
