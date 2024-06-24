import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BussinessRequestService} from '../../../services/bussiness-request.service';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private bussinessRequestService: BussinessRequestService) { }

  resolve() {
    return this.bussinessRequestService.getTasks();
  }
}
