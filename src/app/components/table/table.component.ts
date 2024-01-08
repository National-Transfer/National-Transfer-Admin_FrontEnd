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
import { InputNumberModule } from 'primeng/inputnumber';
import { error } from 'console';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule, RatingModule, TagModule, CommonModule, ToastModule, ToolbarModule, DialogModule, InputTextModule, FormsModule, InputTextareaModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [MessageService, InputNumberModule]
})
export class TableComponent implements OnInit {

  private salesPointService : SalesPointService = inject(SalesPointService);
  private messageService : MessageService = inject(MessageService);

  productDialog: boolean = false;
  value: number = 20000;
  salesPoint!: SalesPoint;
  salesPoints!: SalesPoint[];
  submitted: boolean = false;

    constructor() {}

    ngOnInit() {
        this.loadSalesPoints();
    }

    loadSalesPoints(){
      this.salesPointService.getAllSalesPoints$.subscribe((data) => {
        this.salesPoints = data;
    });

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
      this.salesPointService.deleteSalesPoint$(id).subscribe(
        response => {
          this.loadSalesPoints();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Sales point deleted'});
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Deletion failed'});
        }
      );
    }

    hideDialog(){
      this.productDialog = false;
      this.submitted = false;
    }

    saveSalesPoint(spoint : SalesPoint){
      if (spoint.id){
        this.salesPointService.updateSalespoint$(spoint).subscribe(response => {
          //this.loadSalesPoints();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Sales point updated'});
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Update failed'});
        })
      } else {
        this.salesPointService.saveSalesPoint$(spoint).subscribe(
          response => {
            //this.loadSalesPoints();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Sales point added'});
          },
          error => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Addition failed'});
          }
        );
      }
      this.hideDialog();
    }

    saveFromModal(){
      this.saveSalesPoint(this.salesPoint);
    }


    openNew(){
      this.salesPoint = {name : '', address : '', phoneNumber : ''};
      this.submitted = false;
      this.productDialog = true;
    }
      
    }

    

