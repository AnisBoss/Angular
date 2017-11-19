import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../../services/shared-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logo:String ="/assets/online-sales.png";
  panier:String ="/assets/panier.png";
  items_number:number = 0;

  private _inputValue: string;

  constructor(private shared :SharedServiceService ) {

   }

 public get inputValue(): string {
    return this._inputValue;
  }

  public set inputValue(val: string) {
    this._inputValue = val;
    this.shared.searchEvent(val);
  }
  ngOnInit() {
  }

}
