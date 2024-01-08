import { Component, OnInit, inject } from '@angular/core';
import { Agent } from '../../interfaces/agent';
import { BehaviorSubject } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SalesPoint } from '../../interfaces/sales-point';
import { AgentService } from '../../services/agent.service';
import { SalesPointService } from '../../services/sales-point.service';


@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})
export class AgentsComponent implements OnInit{

  faEye = faEye;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  public dataSubject = new BehaviorSubject<Agent[]>([]);

  private agentService = inject(AgentService);
  private salespointService = inject(SalesPointService);


  agentsResponse !: Agent[];

  salesPointResponse !: SalesPoint[]; 

  agentToEdit !: Agent;
  agentToDelete !: Agent
  
  ngOnInit(): void {
    this.agentService.getAllAgents$.subscribe((response : Agent[]) => {
      this.dataSubject.next(response);

      this.agentsResponse = response
      this.agentsResponse = response.reverse();
    })

    this.salespointService.getAllSalesPoints$.subscribe( (response : SalesPoint[]) => {

      this.salesPointResponse = response
      // this.agentsResponse = response.reverse();
    })
  }

  addAgent(addForm: NgForm) {
    console.log(addForm.value);
    
    let agent : Agent  = addForm.value;
    agent.createdAt = new Date();

    this.agentService.saveAgent$(agent).subscribe( (response : Agent)=> {
      this.dataSubject.next([response, ...this.dataSubject.value]);
      this.agentsResponse = this.dataSubject.value;
    });
    addForm.reset();
  }

  deleteAgent(agent: Agent): void {
    console.log( "delete " + agent)
    this.agentService.deleteAgent$(agent.id as string).subscribe(() => {

      const updatedAgents = this.dataSubject.value.filter(ag => ag.id !== agent.id);

      this.dataSubject.next(updatedAgents);
      this.agentsResponse = updatedAgents;
    })
  }

  updateAgent(agent: Agent) {
    console.log("update --- "+  JSON.stringify(agent))

    this.agentService.updateAgent$(agent).subscribe(
      (response : Agent) => {
        if (response) {
          const updatedAgent = response;
          const updatedAgents = this.dataSubject.value.map((a: Agent) =>
            a.id === updatedAgent?.id ? { ...a, ...updatedAgent } : a
          );
  
          this.dataSubject.next(updatedAgents);
          this.agentsResponse = updatedAgents;
        } else {
          console.error('Invalid response or missing agent data.');
        }
      },
      error => {
        alert('An error has occured while trying to update agent ' + error)
      }
    );
  }

  doSearch(value: string) {
    console.log(`value=${value}`);

    this.agentService.filterAgents$(value, this.dataSubject.value).subscribe((response : Agent[]) =>{
      this.agentsResponse = response;
    })
  }


  onOpenModal(agent: any, mode: string) {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#AddModal');
      console.log("add")
    }
    if (mode === 'view') {
      this.agentToEdit = agent;
      button.setAttribute('data-bs-target', '#viewModal');
    }
    if (mode === 'edit') {
      this.agentToEdit = agent;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.agentToDelete = agent;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
