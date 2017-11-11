import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logo:String ="/assets/online-sales.png";
  panier:String ="/assets/panier.png";
  items_number:number = 0;
  constructor() { }

  ngOnInit() {
  }

}
