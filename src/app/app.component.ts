import {Component, OnInit} from '@angular/core';
import {Cliente} from './domain/Cliente';
import {ClienteService} from './services/cliente.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InserirComponent} from './componentes/inserir/inserir.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class AppComponent implements OnInit {

  constructor(public dialogService: DialogService,
              public messageService: MessageService,
              private confirmationService: ConfirmationService,
              private clienteService: ClienteService) {
  }

  ref: DynamicDialogRef;

  clientes: Cliente[];

  addCliente(cliente: Cliente) {
    this.ref = this.dialogService.open(InserirComponent, {
      data: cliente,
      header: 'Inserção de Cliente',
      width: '70%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000,
      closeOnEscape: false
    });

    this.ref.onClose.subscribe((cli: Cliente) => {
      if (cli) {
        this.messageService.add({severity: 'info', summary: 'Salvo', detail: 'Cliente salvo com sucesso'});
        this.buscaTodos();
      }
    });
  }

  ngOnInit(): void {
    this.buscaTodos();
  }

  buscaTodos() {
    this.clienteService.buscaTodos().subscribe(clis => {
      this.clientes = clis;
    });
  }

  removeCliente(cliente: Cliente) {
    this.confirmationService.confirm({
      message: 'Deseja remover o cliente selecionado?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const index = this.clientes.indexOf(this.clientes.find(cli => cli.id !== cliente.id));
        this.clientes.splice(index, 1);
        this.messageService.add({severity: 'success', summary: 'Removido', detail: 'Cliente removido', life: 3000});
      }
    });
  }

}
