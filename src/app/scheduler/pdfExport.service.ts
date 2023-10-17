import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { DayPilot, DayPilotSchedulerComponent } from 'daypilot-pro-angular';

@Injectable({
    providedIn: 'root'
})
export class PdfExportService {

    exportAsPdf(scheduler: DayPilotSchedulerComponent): any {
        const doc = new jsPDF.jsPDF('landscape', 'in', 'letter');
        doc.setFontSize(40);
        doc.text('Scheduler', 0.5, 1);

        for (let i = 1; i <= 12; i++) {
            const image = scheduler.control.exportAs('jpeg', {
                area: 'range',
                scale: 2,
                dateFrom: new DayPilot.Date(scheduler.control.startDate).addMonths(i - 1),
                dateTo: new DayPilot.Date(scheduler.control.startDate).addMonths(i),
                quality: 0.95
            });
            const dimensions = image.dimensions();
            const ratio = dimensions.width / dimensions.height;
            const width = 10;
            const height = width / ratio;
            doc.addImage(image.toDataUri(), 'JPEG', 0.5, 1.5, width, height);

            const last = i === 12;
            if (!last) {
                doc.addPage();
            }
        }

        return doc.output('blob');

    }
}
