import { Component, OnInit, inject } from '@angular/core';
import { SalesPointService } from '../../services/sales-point.service';
import { SalesPoint } from '../../interfaces/sales-point';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { CommonModule } from "@angular/common";
import { ToolbarModule } from 'primeng/toolbar';
import {MessageService} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule, RatingModule, TagModule, CommonModule, ToastModule, ToolbarModule, DialogModule, InputTextModule, FormsModule, InputTextareaModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [MessageService]
})
export class TableComponent implements OnInit {

  private salesPointService : SalesPointService = inject(SalesPointService);

  productDialog: boolean = false;
  salesPoint!: SalesPoint;
  salesPoints!: SalesPoint[];
  submitted: boolean = false;

    constructor() {}

    ngOnInit() {
        this.salesPointService.getAllSalesPoints$.subscribe((data) => {
            this.salesPoints = data;
        });
      //   this.salesPoints = [
      //     {
      //         id: "1",
      //         name: "Wafa Cash",
      //         phoneNumber: "123-456-7890",
      //         address: "123 Apple St, Fruitville",
      //         dailyTransferLimit: 8000,
      //         createdAt: new Date('2024-01-01')
      //     },
      //     {
      //         id: "2",
      //         name: "Cash Plus",
      //         phoneNumber: "234-567-8901",
      //         address: "456 Banana Ave, Berrytown",
      //         dailyTransferLimit: 5000,
      //         createdAt: new Date('2024-01-02')
      //     },
      //     {
      //         id: "3",
      //         name: "Western Union",
      //         phoneNumber: "345-678-9012",
      //         address: "789 Cherry Blvd, Meloncity",
      //         dailyTransferLimit: 1500,
      //         createdAt: new Date('2024-01-03')
      //     },
      //     {
      //         name: "Money Gram",
      //         phoneNumber: "456-789-0123",
      //         address: "012 Date Way, Grapeville",
      //         dailyTransferLimit: 2500,
      //         createdAt: new Date('2024-01-04')
      //     }
      // ];
    }

    getSeverity(limit: number) {
        if (limit > 80000) {
          return 'success';
        } else if (limit < 2000){
          return 'danger';
        } else {
          return 'warning';
        }
    }



    deleteSalesPoint(id: string){
        this.salesPointService.deleteSalesPoint$(id).subscribe();
    }

    hideDialog(){
      
    }

    saveSalesPoint(){
      
    }

    newSalesPoint(){
      this.salesPoint = {name : '', address : '', phoneNumber : ''};
      this.submitted = false;
      this.productDialog = true;
    }


}
