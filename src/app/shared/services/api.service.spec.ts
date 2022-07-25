import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let controller: HttpTestingController;
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            { provide: ApiService, useValue: spy }
        ]
    });
    apiService = TestBed.inject(ApiService);
    controller = TestBed.inject(HttpTestingController);
    apiService.apiUrl = environment.BASE_eTIMS_URL;
    apiService.apiCW5Url = environment.BASE_CW5_URL;
    apiService.apiV = environment.API_V;
    apiService.adminV = environment.ADMIN_V;
    apiService.violationV1 = environment.SEARCH_V;
    apiService.etimsSearch = environment.BASE_eTIMS_SEARCH_URL;
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  // it('get should return a list', (done) => {
  //   const expectedData = [
  //     { 'name': 'one' },
  //     { 'name': 'two' },
  //     { 'name': 'three' },
  //   ];
  //   let url = 'issuingAgency'
  //   let CW5type = false;
  //   const hostUrl = (CW5type ? apiService.apiCW5Url : apiService.apiUrl);
  //   const hostV = (CW5type ? apiService.apiV : apiService.adminV);
  //   apiService.get(url, CW5type).subscribe(data => {
  //     expect(data).toEqual(expectedData);
  //     done();
  //   });
 
  //   const testRequest = controller.expectOne(hostUrl + hostV + url);
 
  //   testRequest.flush(expectedData);
  // });

//   it('get should return a list', () => {
//     let url = 'issuingAgency'
//     let CW5type = true;
//     spyOn(apiService, 'get');
//     apiService.get(url, CW5type);
//     const hostUrl = (CW5type ? apiCW5Url : apiUrl);
//     const hostV = (CW5type ? apiV : adminV);
//     expect(apiService.get(url, CW5type)).toHaveBeenCalled();
//     expect(hostUrl).toEqual(apiCW5Url);
//     expect(hostV).toEqual(apiV);
//   });
});