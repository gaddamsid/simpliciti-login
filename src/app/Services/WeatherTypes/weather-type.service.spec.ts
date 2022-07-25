import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherTypeServiceStub } from 'src/app/shared/testCasesHelperClasses/WeatherTypeServiceStub';
import { environment } from 'src/environments/environment';

import { WeatherTypeService } from './weather-type.service';

describe('WeatherTypeService', () => {
  let weatherTypeService: WeatherTypeService;
  let controller: HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let serviceStub = new WeatherTypeServiceStub();
  let reqObj: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    weatherTypeService = TestBed.inject(WeatherTypeService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      active: false,
      contractId: 0,
      createDatetime: "2022-04-26T09:33:25.787",
      createUserID: 0,
      isDeleted: "N",
      updateDatetime: "2022-04-26T09:33:25.787",
      updateUserID: 0,
      weatherTypesId: 1,
      weatherTypesName: "Cloudy and wimdy",
    }
  });

  it('should be created', () => {
    expect(weatherTypeService).toBeTruthy();
  });

  it('getWeatherTypes should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getWeatherTypes().subscribe((res1) => {
      mockData = res1;
    })
    weatherTypeService.getWeatherTypes().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/WeatherType/getWeatherTypeList');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('createWeatherType should add a record', () => {
    let response: any;
    weatherTypeService.createWeatherType(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/WeatherType/addWeatherType');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateWeatherType should update an existing record', () => {
    let response: any;
    weatherTypeService.updateWeatherType(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/WeatherType/updateWeatherType');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('toggleWeatherState should update an existing record', () => {
    let response: any;
    weatherTypeService.toggleWeatherState(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/WeatherType/toggleWeatherType');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })
});
