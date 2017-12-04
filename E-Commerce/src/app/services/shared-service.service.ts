import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()
export class SharedServiceService {

  constructor(private http: Http) {
    
  }
   
public basketEvents: EventEmitter<string> = new EventEmitter();
public productsEvents : EventEmitter<any> = new EventEmitter();
public basketEvent(val : string,basket:any[])
{
  this.basketEvents.emit(val);
  this.productsEvents.emit(basket);
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
    return this.http.get('http://127.0.0.1:8000/api/products/?Type=Computer');


  }
  getTablets() {
    return this.http.get('http://127.0.0.1:8000/api/products/?Type=Tablet');
  }
  getSmartphones() {
    return this.http.get('http://127.0.0.1:8000/api/products/?Type=Smartphone');
  }

  getProducts(){
    return this.http.get('http://127.0.0.1:8000/api/products/');
  }
getProductByID(id){
  return this.http.get('http://127.0.0.1:8000/api/products/?id='+id);
}
  searchProduct(value)
  {
    //console.log("url : "+'http://127.0.0.1:8000/api/products/?Brand__contains='+value);
    return this.http.get('http://127.0.0.1:8000/api/products/?Brand__contains='+value);
    
  }


login(username,password)
{
  return this.http.post("http://127.0.0.1:8000/api/user/login/",{"username" : username,"password":password});
}

register(username,password,email,first_name,last_name)
{
  return this.http.post("http://127.0.0.1:8000/api/user/register/",{"username":username,"password":password,
  "email":email,"fisrt_name":first_name,"last_name":last_name});
}

}
