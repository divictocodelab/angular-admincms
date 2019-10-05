import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { ApiHandler } from 'src/app/shared/services/api-handler.service';
import { ServiceBase } from 'src/app/shared/baseClass/services-base.class';

@Injectable({ providedIn: 'root' })
export class UserService extends ServiceBase {
    constructor(apiHandler: ApiHandler) {
        super(apiHandler);
    }

    getUserList() {
        return this.apiHandler.apiGet(API.UserEndpoints.GetUserList);
    }

    addUser(formdata) {
        const url = API.UserEndpoints.AddUserList;
        return this.apiHandler.apiPost(url, formdata, {
          contentType: {
            isFormDataContent: true
          }
        });
    }

    getUserDetail(id) {
        const url = API.UserEndpoints.GetUserDetail(id);
        return this.apiHandler.apiGet(url);
    }

    updateUserDetail(formdata, id) {
        const url = API.UserEndpoints.UpdateUserDetail(id);
        return this.apiHandler.apiUpdate(url, formdata);
    }

    deleteUser(id) {
        const url = API.UserEndpoints.DeleteUser(id);
        return this.apiHandler.apiDelete(url);
    }


}