import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showComputers: boolean = true;
  showTablets: boolean = false;
  showSmartphones: boolean = false;
  showResults:boolean = false;
  computers: any = [];
  tablets: any = [];
  smartphones: any = [];
  results:any[];
  searchResults:any=[];
  myValue:String ="";

  private subscription: Subscription;
  private subscriptionSearch: Subscription;
  constructor(private shared: SharedServiceService) {
    this.subscriptionSearch= this.shared.searchEvents.subscribe((newValue) => {
     
       this.results=[];
      this.myValue=newValue;
   
      if (this.myValue.length <= 0)
      {
        this.showComputers=true;
      }
      else{
         this.showComputers=false;
     this.showSmartphones=false;
     this.showTablets=false;
this.showResults=true;

     this.results=this.computers.concat(this.tablets,this.smartphones);
    
      }
      });


    this.subscription = this.shared.inputEvents.subscribe((newValue) => {
      switch (newValue) {

        case 'Computers': { console.log("baddelt computers"); this.showComputers = true; this.showTablets = false; this.showSmartphones = false;this.showResults=false; break }
        case 'Tablets': { console.log("baddelt tablets"); this.showComputers = false; this.showTablets = true; this.showSmartphones = false;this.showResults=false; break }
        case 'Smartphones': { console.log("baddelt smartphones"); this.showComputers = false; this.showTablets = false; this.showSmartphones = true;this.showResults=false; break };
        default: console.log("tzammer wa7dek =)");
      }
    })

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
