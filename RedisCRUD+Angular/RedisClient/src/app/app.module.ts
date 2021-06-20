import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { DataService } from './data.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AddupdateComponent } from './addupdate/addupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddupdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
