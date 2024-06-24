import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundraiserUploadHistoryPage } from './fundraiser-upload-history.page';

describe('FundraiserUploadHistoryPage', () => {
  let component: FundraiserUploadHistoryPage;
  let fixture: ComponentFixture<FundraiserUploadHistoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraiserUploadHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundraiserUploadHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
