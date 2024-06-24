import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundraiserUploadEditPage } from './fundraiser-upload-edit.page';

describe('FundraiserUploadEditPage', () => {
  let component: FundraiserUploadEditPage;
  let fixture: ComponentFixture<FundraiserUploadEditPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraiserUploadEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundraiserUploadEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
