import { BussinessRequestService } from '../../../services/bussiness-request.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class BussinessRequestResolver implements Resolve<any> {

  constructor(public bussinessRequestService: BussinessRequestService,) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const itemId = route.paramMap.get('id');
      this. bussinessRequestService.getTask(itemId)
        .then(data => {
          data.id = itemId;
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }
}
