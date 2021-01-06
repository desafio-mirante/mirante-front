import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsultaCEPService} from '../../services/consulta-cep.service';
import {ClienteService} from '../../services/cliente.service';
import {Cliente} from '../../domain/Cliente';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.scss']
})
export class InserirComponent implements OnInit {

  clientForm: FormGroup;

  emails = new FormArray([]);

  cepResult: any;

  constructor(private consulaCEPService: ConsultaCEPService,
              private clienteService: ClienteService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      nome: new FormControl(this.config.data ? this.config.data.nome : null, Validators.required),
      cpf: new FormControl(this.config.data ? this.config.data.cpf : null, Validators.required),
      cep: new FormControl(this.config.data ? this.config.data.endereco.cep : null, Validators.required),
      logradouro: new FormControl(this.config.data ? this.config.data.endereco.logradouro : null, Validators.required),
      cidade: new FormControl(this.config.data ? this.config.data.endereco.cidade : null, Validators.required),
      bairro: new FormControl(this.config.data ? this.config.data.endereco.bairro : null, Validators.required),
      uf: new FormControl(this.config.data ? this.config.data.endereco.uf : null, Validators.required),
      complemento: new FormControl(this.config.data ? this.config.data.endereco.complemento : null),
      telefones: new FormArray([]),
      emails: new FormArray([])
    });

  }

  buscaCEP() {
    const cep: string = this.clientForm.get('cep').value;
    if (cep && cep.length === 8) {
      this.consulaCEPService.buscaCEP(cep).subscribe(cepResult => {
        this.clientForm.get('bairro').setValue(cepResult.bairro);
        this.clientForm.get('logradouro').setValue(cepResult.logradouro);
        this.clientForm.get('uf').setValue(cepResult.uf);
        this.clientForm.get('cidade').setValue(cepResult.localidade);
      });
    }
  }

  resetaForm() {
    this.clientForm.reset();
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      return;
    }

    const telefones = this.clientForm.controls.telefones.value.map(tel => {
      return {
        numero: tel.numero,
        tipoTelefone: tel.tipoTelefone.tipo
      };
    });

    const cliente: Cliente = {
      nome: this.clientForm.controls.nome.value,
      cpf: this.clientForm.controls.cpf.value,
      emails: this.clientForm.controls.emails.value.map(e => e.email),
      telefones,
      endereco: {
        cep: this.clientForm.controls.cep.value,
        logradouro: this.clientForm.controls.logradouro.value,
        complemento: this.clientForm.controls.complemento.value,
        bairro: this.clientForm.controls.bairro.value,
        cidade: this.clientForm.controls.cidade.value,
        uf: this.clientForm.controls.uf.value
      }
    };

    if (this.config.data) {
      cliente.id = this.config.data.id;
      this.clienteService.put(cliente).subscribe(response => {
        if (response) {
          this.ref.close(response);
        }
      });
      return;
    }

    this.clienteService.post(cliente).subscribe(response => {
      if (response) {
        this.ref.close(response);
      }
    });
  }


}
