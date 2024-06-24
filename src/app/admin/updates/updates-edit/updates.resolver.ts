import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { UpdatesService } from '../../../services/updates.service';


@Injectable()
export class DetailsResolver implements Resolve<any> {

  constructor(public updatesService: UpdatesService ,) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const itemId = route.paramMap.get('id');
      this.updatesService.getTask(itemId)
      .then(data => {
        data.id = itemId;
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
