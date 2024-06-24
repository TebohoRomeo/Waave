import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BussinessService } from '../../../services/bussiness.service';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private bussinessService: BussinessService) { }

  resolve() {
    return this.bussinessService.getTasks();
  }
}
