import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
 import { ApplicationRef } from '@angular/core';
@Injectable()
export class SharedServiceService {

  constructor(private http: Http,private cd: ApplicationRef) {
    
  }
   
public basketEvents: EventEmitter<string> = new EventEmitter();
public productsEvents : EventEmitter<any> = new EventEmitter();
private sales_id:number ;

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

register(username,email,password,first_name,last_name)
{
  return this.http.post("http://127.0.0.1:8000/api/user/register/",{"username":username,"password":password,
  "email":email,"first_name":first_name,"last_name":last_name});
}
getUserByID(id)
{
  let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});  
 headers.append('Authorization','Token '+JSON.parse(localStorage.getItem("user")).token);

  let options = new RequestOptions({headers: headers});
  console.log("headers :"+this.headers.getAll);
  console.log("token  :"+JSON.parse(localStorage.getItem("user")).token)
  return this.http.get("http://127.0.0.1:8000/api/user/"+id+"/",{headers : headers});
}
getLatestID()
{

  return this.http.get("http://127.0.0.1:8000/api/salesDetails/?order_by=-id&limit=1");
  /*.subscribe(response=>
  {
  //  console.log("response : "+response.json());
    console.log("last id : "+(response.json()["objects"][0].id+1)) ;
  this.last_id=response.json()["objects"][0].id+1;
   console.log("lastid_id tbadel : "+this.last_id);
  // setTimeout( () => this.isRequesting = "false", 0);
//this.cd.tick(); 
 return this.last_id ;
  });

     */
}

saveBasket(user_id,product_id,last_id)
{
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   let body = JSON.stringify({"user_id":user_id,"product_id":product_id});
   //console.log("poutput of func ; "+this.getLatestID());
  //console.log("d5alt l save basket  w hedha last id :"+last_id);
 // return this.http.put("http://127.0.0.1:8000/api/salesDetails/"+this.getLatestID(),body,options);
 
//return this.http.get("http://127.0.0.1:8000/api/user/");

 //return this.last_id ;

 return  this.http.put("http://127.0.0.1:8000/api/salesDetails/"+last_id+"/",{"user_id":user_id,"product_id":product_id});
}
getBasket(user_id)
{
  return this.http.get("http://127.0.0.1:8000/api/salesDetails/?user_id="+user_id);
}

}
