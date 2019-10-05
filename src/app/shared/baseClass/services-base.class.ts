import { Injectable } from '@angular/core';
import { ApiHandler } from '../../shared/services/api-handler.service';

export class ServiceBase {
  constructor(protected apiHandler: ApiHandler) {}

  getDetails(url, id: string) {
    return this.apiHandler.apiGet(url + id);
  }

  getList(url: string, page: number, queryObj?: object) {
    const limit = 10;
    let pageObj = {
      limit: limit,
      offset: (page - 1) * limit,
    };
    if (queryObj) {
      pageObj = Object.assign({}, pageObj, queryObj);
    }
    return this.apiHandler.apiGet(url, pageObj);
  }

  updateStatus(url: string, changedStatus: string) {
    const body = { status: changedStatus };
    return this.apiHandler.apiUpdate(url, body);
  }

  deleteItem(url) {
    return this.apiHandler.apiDelete(url);
  }

  simplyGet(url) {
    return this.apiHandler.apiGet(url);
  }
}
