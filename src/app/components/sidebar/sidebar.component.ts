import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {SharedServiceService} from '../../services/shared-service.service' ;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 private _showComputers: boolean=false; 

  constructor(private shared : SharedServiceService) {
  
   }
public getinputValue(): boolean {
    return this._showComputers;
  }

  public setinputValue(val:string) {
    console.log("b3th : "+val);
    this._showComputers = !this._showComputers;
    this.shared.inputChanged(val);
  }



  ActivateComputers()
  {

  }

  ActivateTablets()
  {
    
  }

  ActivateSmartphones()
  {

  }
  ngOnInit() {
  }

}
