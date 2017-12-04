import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from "rxjs/Subscription";
import { Popup } from 'ng2-opd-popup';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logo: String = "/assets/online-sales.png";
  panier: String = "/assets/panier.png";
  items_number: number = 0;
  private myValue = "";
  private _inputValue: string;
  products: any = [];
  private subscriptionBasket: Subscription;
  private subscriptionProduct: Subscription;
  isAuthenticated:boolean=false;
  private username:string;

  @ViewChild('popupNavbar') popup: Popup;
  @ViewChild('popupLogin') popupLogin : Popup;
  constructor(private shared: SharedServiceService) {
    this.subscriptionBasket = this.shared.basketEvents.subscribe((newValue) => {
      this.items_number += 1;
      //  console.log("zedt fil items ");
    });

    this.subscriptionProduct = this.shared.productsEvents.subscribe((basket) => {
      this.products = basket;
      //    console.log("products mawjoudin "+this.products);
    });
  }

  public get inputValue(): string {
    return this._inputValue;
  }

  public removeFromBasket(index) {
    this.products.splice(index, 1);
    this.items_number -= 1;
    if (this.products.length == 0)
      this.popup.hide();
  }

  public basketProducts() {
    this.popup.options = {
      header: "Number of products " + this.products.length,
      color: "#B9121B", // red, blue.... 
      widthProsentage: 50, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Save for another checkout", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 

      animation: "bounceIn"// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInD

    };
    if (this.products.length > 0) {
      this.popup.show(this.popup.options);
      console.log("de5el e navbar");

    }

  }


  public set inputValue(val: string) {

    this._inputValue = val;
    this.shared.searchEvent(val);
  }


  public loginPopup()
  {
    this.popupLogin.options = {
      header: "Login - Register" ,
      color: "#B9121B", // red, blue.... 
      widthProsentage: 35, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Save for another checkout", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "hidden", // your class for styling the confirm button 
      animation: "bounceIn"// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInD

    };
      this.popupLogin.show(this.popupLogin.options);
    
  }

login(loginForm:NgForm){

  this.shared.login(loginForm.value["username"],loginForm.value["password"]).subscribe(response =>{
    //console.log(response["_body"]);
   // console.log(typeof(JSON.parse(response["_body"])["username"]));
    this.isAuthenticated=true;
    this.username=JSON.parse(response["_body"])["username"];
  
  //  alert(this.username + " " + typeof(this.username));
  });
}

getUsername()
{
  return this.username;
}
  

register(registerForm:NgForm){
  var first_name=registerForm.value["first_name"];
  var last_name=registerForm.value["last_name"];
  var username=registerForm.value["username"];
  var email =registerForm.value["email"];
  var password=registerForm.value["password"];
  console.log("registration successfully done");
  console.log("values : "+registerForm.value)
  this.shared.register(username,email,password,first_name,last_name).
  subscribe(response =>{

    var result = JSON.parse(response["_body"]);
    if (result.success==true)
    {this.isAuthenticated=true;
    this.username=result.username;
    this.popupLogin.hide();
}


  });
}






  ngOnInit() {
  }

}
