import { BussinessService } from './../../services/bussiness.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';


@Injectable()
export class DetailsResolver implements Resolve<any> {

  constructor(public bussinessService: BussinessService,) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const itemId = route.paramMap.get('id');
      this.bussinessService.getTask(itemId)
      .then(data => {
        data.id = itemId;
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
