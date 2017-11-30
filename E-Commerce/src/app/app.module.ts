import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';//router
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import {SharedServiceService} from './services/shared-service.service';
import { FilterPipe }from './components/home/filter.pipe';
import {PopupModule} from 'ng2-opd-popup';

const appRoutes: Routes = [
  { path: 'home', component:HomeComponent  },
  { path: 'about',component: AboutComponent},
  { path: 'contact',component: ContactComponent, },
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    FilterPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
     PopupModule.forRoot()
  ],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})



export class AppModule { 



}
