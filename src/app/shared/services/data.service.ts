import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sharedArray: any;
  sharedObject: any;
  constructor() { }
}
