import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UpdatesService } from '../../../services/updates.service';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private updatesService: UpdatesService ) {}

  resolve() {
    return this.updatesService.getTasks();
  }
}
