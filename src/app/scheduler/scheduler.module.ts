import {DataService} from './data.service';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SchedulerComponent} from './scheduler.component';
import {DayPilotModule} from 'daypilot-pro-angular';
import {HttpClientModule} from '@angular/common/http';
import {PdfExportService} from './pdfExport.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    SchedulerComponent
  ],
  exports:      [ SchedulerComponent ],
  providers:    [ DataService, PdfExportService]
})
export class SchedulerModule { }
