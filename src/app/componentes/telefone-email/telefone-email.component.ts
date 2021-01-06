import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoTelefone} from '../../domain/Cliente';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-telefone-email',
  templateUrl: './telefone-email.component.html',
  styleUrls: ['./telefone-email.component.scss']
})
export class TelefoneEmailComponent implements OnInit {

  @Input() clientForm: FormGroup;

  @Input() config: DynamicDialogConfig;

  telefones = new FormArray([]);

  emails = new FormArray([]);

  tiposTelefone: { tipo: string; valor: any }[];

  constructor() { }

  ngOnInit(): void {

    this.tiposTelefone = Object.values(TipoTelefone).map(tipo => {
      return { tipo: tipo.toString(), valor: tipo.mascara};
    });

    if (this.config.data) {
      this.config.data.telefones.forEach(tel => this.addTelefone(tel));
      this.config.data.emails.forEach(e => this.addEmail(e));
    } else {
      this.addTelefone(null);
      this.addEmail(null);
    }


  }

  mudaTipoTelefone(telefone: AbstractControl) {
    telefone.get('numero').reset();
  }

  addTelefone(tel: any) {
    this.telefones = this.clientForm.get('telefones') as FormArray;
    this.telefones.push(this.criaTelefone(tel));
  }

  addEmail(email: any) {
    this.emails = this.clientForm.get('emails') as FormArray;
    this.emails.push(this.criaEmail(email));
  }

  private criaTelefone(tel: any) {
    const numero = this.config.data ? tel.numero : null;
    const tipoTelefone = this.config.data ? tel.tipoTelefone : this.tiposTelefone[0];
    return new FormGroup({
      numero: new FormControl(numero, Validators.required ),
      tipoTelefone: new FormControl(tipoTelefone, Validators.required )
    });
  }

  private criaEmail(email: any) {
    return new FormGroup({
      email: new FormControl(email, Validators.required)
    });
  }

  removeTelefone(i: number) {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(i);
    }
  }

  removeEmail(i: number) {
    if (this.emails.length > 1) {
      this.emails.removeAt(i);
    }
  }

}
