import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()
export class SharedServiceService {

  constructor(private http: Http) {

  }

 public searchEvents: EventEmitter<string> = new EventEmitter();

  public searchEvent(val : string) {
    this.searchEvents.emit(val);
  }


  public inputEvents: EventEmitter<boolean> = new EventEmitter();

  public inputChanged(val) {
    this.inputEvents.emit(val);
  }


  headers = new Headers();


  getComputers() {
    return this.http.get('http://127.0.0.1:8000/api/computer/');


  }
  getTablets() {
    return this.http.get('http://127.0.0.1:8000/api/tablet/');
  }
  getSmartphones() {
    return this.http.get('http://127.0.0.1:8000/api/smartphone/');
  }



}
