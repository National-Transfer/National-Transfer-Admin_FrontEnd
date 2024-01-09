import { Component, OnInit, inject } from '@angular/core';
import { Transfer } from '../../interfaces/transfer';
import { TransferService } from '../../services/transfer.service';
import { response } from 'express';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent implements OnInit {

  transfers! : Transfer [];
  
  private transferService: TransferService = inject(TransferService);

  constructor() { }

  ngOnInit(): void {
    this.transferService.getAllTransfers$.subscribe(response =>{
      this.transfers = response
    })

  }

  blockTransfer(id :string){

  }
}
