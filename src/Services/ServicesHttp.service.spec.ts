/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicesHttpService } from './ServicesHttp.service';

describe('Service: ServicesHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesHttpService]
    });
  });

  it('should ...', inject([ServicesHttpService], (service: ServicesHttpService) => {
    expect(service).toBeTruthy();
  }));
});
