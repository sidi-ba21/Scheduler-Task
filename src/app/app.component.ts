import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  savePage() {
    const pageContent = document.documentElement.outerHTML;
    const blob = new Blob([pageContent], { type: 'text/html' });
    FileSaver.saveAs(blob, 'page.html');
  }
}
