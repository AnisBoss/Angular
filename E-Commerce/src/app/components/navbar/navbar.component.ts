import { Component, OnInit, ViewChild } from '@angular/core';
import {SharedServiceService} from '../../services/shared-service.service';
import { Subscription } from "rxjs/Subscription";
import {Popup} from 'ng2-opd-popup' ;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logo:String ="/assets/online-sales.png";
  panier:String ="/assets/panier.png";
  items_number:number = 0;
  private myValue="";
  private _inputValue: string;
  products:any=[];
  private subscriptionBasket: Subscription;
  private subscriptionProduct : Subscription;
  @ViewChild('popupNavbar') popup: Popup;
  constructor(private shared :SharedServiceService) {
    this.subscriptionBasket = this.shared.basketEvents.subscribe((newValue) => {
      this.items_number+=1;
    //  console.log("zedt fil items ");
    });

    this.subscriptionProduct = this.shared.productsEvents.subscribe((basket) =>{
      this.products=basket ;
  //    console.log("products mawjoudin "+this.products);
    });
   }

 public get inputValue(): string {
    return this._inputValue;
  }

 public basketProducts()
  {
     this.popup.options = {
        header: "Number of products "+this.products.length ,
        color: "#B9121B", // red, blue.... 
        widthProsentage: 50, // The with of the popou measured by browser width 
        animationDuration: 1, // in seconds, 0 = no animation 
        showButtons: true, // You can hide this in case you want to use custom buttons 
        confirmBtnContent: "Add to Basket", // The text on your confirm button 
        cancleBtnContent: "Cancel", // the text on your cancel button 
       
        animation: "fadeInDown"// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInD

      };
      if (this.products.length>0)

      {
        this.popup.show();
        console.log("de5el e navbar");
    
  }
  
  }


  public set inputValue(val: string) {
    
    this._inputValue = val;
    this.shared.searchEvent(val);
  }
  ngOnInit() {
  }

}
