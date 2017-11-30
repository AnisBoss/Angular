import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from "rxjs/Subscription";
import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showComputers: boolean = true;
  showTablets: boolean = false;
  showSmartphones: boolean = false;
  showResults: boolean = false;
  computers: any = [];
  tablets: any = [];
  smartphones: any = [];
  results: any[];
  searchResults: any = [];
  myValue: String = "";
  product: any = [];
  basket: any = [];
  private subscription: Subscription;
  private subscriptionSearch: Subscription;
  @ViewChild('popupHome') popup: Popup;
  constructor(private shared: SharedServiceService) {
    this.subscriptionSearch = this.shared.searchEvents.subscribe((newValue) => {

      this.results = [];
      this.myValue = newValue;

      if (this.myValue.length <= 0) {
        this.showComputers = true;
      }
      else {
        this.showComputers = false;
        this.showSmartphones = false;
        this.showTablets = false;
        this.showResults = true;

        //this.results=this.computers.concat(this.tablets,this.smartphones);
        console.log("value : " + newValue)
        this.shared.searchProduct(newValue).subscribe(response => {
          this.results = response.json()["objects"];

        });

      }
    });


    this.subscription = this.shared.inputEvents.subscribe((newValue) => {
      switch (newValue) {

        case 'Computers': { console.log("baddelt computers"); this.showComputers = true; this.showTablets = false; this.showSmartphones = false; this.showResults = false; break }
        case 'Tablets': { console.log("baddelt tablets"); this.showComputers = false; this.showTablets = true; this.showSmartphones = false; this.showResults = false; break }
        case 'Smartphones': { console.log("baddelt smartphones"); this.showComputers = false; this.showTablets = false; this.showSmartphones = true; this.showResults = false; break };
        default: console.log("tzammer wa7dek =)");
      }
    })

  }

  //add product to basket
  public addToBasket(device: string) {
    console.log("b3tht panier : " + device);
    var found: boolean = true;
    //check if product already added to basket
    for (let i = 0; i < this.basket.length; i++) {

      if (this.basket[i] === device) {
        found = false;
      }
    }
    if (found) {

      this.basket.push(device);
      this.shared.basketEvent(device, this.basket);
    }

  }
  //print detailed product info 
  showProduct(id) {
    console.log("f west showProduct");
    this.shared.getProductByID(id).subscribe(response => {
      this.product = response.json()["objects"];

      this.popup.options = {
        header: "Product Detailssss : " + this.product[0].Brand,
        color: "#B9121B", // red, blue.... 
        widthProsentage: 50, // The with of the popou measured by browser width 
        animationDuration: 1, // in seconds, 0 = no animation 
        showButtons: true, // You can hide this in case you want to use custom buttons 
        confirmBtnContent: "Add to Basket", // The text on your confirm button 
        cancleBtnContent: "Cancel", // the text on your cancel button 
        confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
        cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
        animation: "fadeInDown"// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInD

      };
      
      this.popup.show(this.popup.options);
    });

  }
  ngOnInit() {
    this.shared.getComputers().subscribe(response => {
      this.computers = response.json()["objects"];

    });;
    this.shared.getTablets().subscribe(response => {
      this.tablets = response.json()["objects"];

    });
    this.shared.getSmartphones().subscribe(response => {

      this.smartphones = response.json()["objects"];

    });
  }

}
