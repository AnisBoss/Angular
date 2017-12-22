import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from "rxjs/Subscription";
import { Popup } from 'ng2-opd-popup';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  logo: String = "/assets/online-sales.png";
  panier: String = "/assets/panier.png";
  items_number: number =0;
  private myValue = "";
  private _inputValue: string;
  products: any = [];
  private subscriptionBasket: Subscription;
  private subscriptionProduct: Subscription;
  isAuthenticated: boolean = false;
  private username: string;
  private reason: string;
  @ViewChild('popupNavbar') popup: Popup;
  @ViewChild('popupLogin') popupLogin: Popup;
  constructor(private shared: SharedServiceService, private router: Router, private cd: ChangeDetectorRef) {
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
      console.log("hedha products ml navbar : " + this.products);
      console.dir(this.products);
    }

  }


  public set inputValue(val: string) {

    this._inputValue = val;
    this.shared.searchEvent(val);
  }


  public loginPopup() {
    this.popupLogin.options = {
      header: "Login - Register",
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

  login(loginForm: NgForm) {

    this.shared.login(loginForm.value["username"], loginForm.value["password"]).subscribe(response => {
      console.log("status : " + response.status);
      console.log("succuesss : " + JSON.parse(response["_body"])["success"]);
      if (JSON.parse(response["_body"])["success"] == true) {
        this.isAuthenticated = true;
        this.reason = "";
        this.username = JSON.parse(response["_body"])["username"];
        this.shared.getBasket(JSON.parse(response["_body"])["id"]).subscribe((response) => {
          var IDs = response.json()["objects"];

          for (let i = 0; i < IDs.length; i++) {
            this.shared.getProductByID(IDs[i].product_id).subscribe((response) => {
              this.products.push(response.json()["objects"]);

              let t: any[];
              t = [].concat(...this.products);
              this.products = t;

              this.cd.markForCheck();
            })
          }
    
          this.items_number = IDs.length;

        });
        var user = { "username": this.username, "id": JSON.parse(response["_body"])["id"], "token": JSON.parse(response["_body"])["token"] };
        console.log("uuuuser.id: " + user.id);
        localStorage.setItem("user", JSON.stringify(user));

        this.popupLogin.hide();
      }
      else {
        this.reason = "username or password is incorrect ! ";
        console.log("reason : " + this.reason);
      }
    });
  }

  getUsername() {
    return this.username;
  }


  register(registerForm: NgForm) {
    var first_name = registerForm.value["first_name"];
    var last_name = registerForm.value["last_name"];
    var username = registerForm.value["username"];
    var email = registerForm.value["email"];
    var password = registerForm.value["password"];
    console.log("registration successfully done");

    this.shared.register(username, email, password, first_name, last_name).
      subscribe(response => {

        if (JSON.parse(response["_body"])["success"] == true) {
          this.isAuthenticated = true;
          this.reason = "";
          this.username = JSON.parse(response["_body"])["username"];

  



          var user = { "username": this.username, "id": JSON.parse(response["_body"])["id"], "token": JSON.parse(response["_body"])["token"] };
          console.log("uuuuser.id: " + user.id);
          localStorage.setItem("user", JSON.stringify(user));
          this.popupLogin.hide();
        }
        else {
          this.reason=JSON.parse(response["_body"])["status"];
          console.log(JSON.parse(response["_body"]));
        }


      });
  }

  logout() {
    localStorage.removeItem("user");
    this.isAuthenticated = false;
    this.products = [];
    this.items_number = 0;
    this.router.navigate(['/home']);
  }

  saveBasket() {
    var last_id;
    for (let i = 0; i < this.products.length; i++) {
      this.shared.getLatestID().subscribe(response => {
        last_id = response.json()["objects"][0].id + 1;
        console.log("id ahawaaa : " + last_id);
        console.log("user_id : " + JSON.parse(localStorage.getItem("user")).id);
        console.log("product_id : " + this.products[i].id);
        this.shared.saveBasket(JSON.parse(localStorage.getItem("user")).id, this.products[i].id, last_id + i).
          subscribe(response => {
            console.log("jawek fesfess 7oby");
          });
      })

    }


  }




  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      this.isAuthenticated = true;
      this.username = user.username;
this.shared.getBasket(user.id).subscribe((response) => {
          var IDs = response.json()["objects"];

          for (let i = 0; i < IDs.length; i++) {
            this.shared.getProductByID(IDs[i].product_id).subscribe((response) => {
              this.products.push(response.json()["objects"]);

              let t: any[];
              t = [].concat(...this.products);
              this.products = t;

              this.cd.markForCheck();
            })
          }
    
          this.items_number = IDs.length;

        });

    }


  }

}
