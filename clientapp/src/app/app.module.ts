import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabMenuModule} from "primeng/tabmenu";
import {HomeComponent} from './home/home.component';
import {DemoComponent} from './demo/demo.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {DropdownModule} from "primeng/dropdown";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DemoService} from "./services/demo.service";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import { AddFieldComponent } from './add-field/add-field.component';
import {ValidationService} from "./services/validation.service";
import {InputNumberModule} from "primeng/inputnumber";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemoComponent,
    AddFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    NoopAnimationsModule,
    NgxJsonViewerModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    RadioButtonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    SidebarModule,
    MenuModule
  ],
  providers: [
    DemoService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
