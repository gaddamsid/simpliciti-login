import { Observable } from 'rxjs';
import { of } from 'rxjs';
export class ToasterServiceStub{
    // sendLang = of({});
    
    info = jasmine.createSpy();
    warning = jasmine.createSpy();
    error = jasmine.createSpy();
    success = jasmine.createSpy();
}