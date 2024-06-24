import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FundraiserRequestService } from '../../../services/fundraiser-request.service';


@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private fundraiserRequestService: FundraiserRequestService ) { }

  resolve() {
    return this.fundraiserRequestService.getTasks();
  }
}
