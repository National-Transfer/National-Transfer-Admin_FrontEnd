import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-sales-points',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './sales-points.component.html',
  styleUrl: './sales-points.component.css'
})
export class SalesPointsComponent {

}
