import { FundraiserRequestService } from '../../../services/fundraiser-request.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class FundraiserRequestResolver implements Resolve<any> {

  constructor(public fundraiserRequestService: FundraiserRequestService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const itemId = route.paramMap.get('id');
      this. fundraiserRequestService.getTask(itemId)
        .then(data => {
          data.id = itemId;
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }
}
