import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  computers =[{
    'Price' : 800,
    'Description' : 'Intel Core™ i5-7200U 2x 2.50 GHz',
    'Brand':'HP X20-C7' ,
    'Path':'/assets/hp.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'Intel Core™ i3-3200U 2x 2.00 GHz',
    'Brand':'ASUS B4-A20',
    'Path':'/assets/asus.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'AMD Core™ i5-4200HQ 3x 2.50 GHz',
    'Brand':'ACER Z80-74',
    'Path':'/assets/acer.jpg'
  },
  {
    'Price' : 800,
    'Description' : 'Intel Core™ i5-7200U 2x 2.50 GHz',
    'Brand':'HP X20-C7' ,
    'Path':'/assets/hp.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'Intel Core™ i3-3200U 2x 2.00 GHz',
    'Brand':'ASUS B4-A20',
    'Path':'/assets/asus.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'AMD Core™ i5-4200HQ 3x 2.50 GHz',
    'Brand':'ACER Z80-74',
    'Path':'/assets/acer.jpg'
  },
  {
    'Price' : 800,
    'Description' : 'Intel Core™ i5-7200U 2x 2.50 GHz',
    'Brand':'HP X20-C7' ,
    'Path':'/assets/hp.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'Intel Core™ i3-3200U 2x 2.00 GHz',
    'Brand':'ASUS B4-A20',
    'Path':'/assets/asus.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'AMD Core™ i5-4200HQ 3x 2.50 GHz',
    'Brand':'ACER Z80-74',
    'Path':'/assets/acer.jpg'
  }];
tablets =[{
    'Price' : 800,
    'Description' : 'Intel Core™ i5-7200U 2x 2.50 GHz',
    'Brand':'tablet-HP' ,
    'Path':'/assets/hp.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'Intel Core™ i3-3200U 2x 2.00 GHz',
    'Brand':'Tablet-ASUS B4-A20',
    'Path':'/assets/asus.jpg'
  },
  {
    'Price' : 600,
    'Description' : 'AMD Core™ i5-4200HQ 3x 2.50 GHz',
    'Brand':'Tablet-ACER Z80-74',
    'Path':'/assets/acer.jpg'
  }];
smartphones =[{
    'Price' : '800',
    'Description' : 'Intel Core™ i5-7200U 2x 2.50 GHz',
    'Brand':'HP X20-C7' ,
    'Path':'/assets/hp.jpg'
  },
  {
    'Price' : '600',
    'Description' : 'Intel Core™ i3-3200U 2x 2.00 GHz',
    'Brand':'ASUS',
    'Path':'/assets/asus.png'
  },
  {
    'Price' : '600',
    'Description' : 'AMD Core™ i5-4200HQ 3x 2.50 GHz',
    'Brand':'ACER',
    'Path':'/assets/acer.png'
  }];
  showComputers:boolean=true;
  showTablets:boolean=false;
  showSmartphones:boolean=false;
  constructor() { }
get sC()
{
  return this.ShowComputers;
}
 set ShowComputers(val)
  {
    this.showComputers=val;
  }
    set ShowTablets(val)
  {
    this.showTablets=val;
  }
    set ShowSmartphones(val)
  {
    this.showSmartphones=val;
  }
 
 
  ngOnInit() {
  }

}
