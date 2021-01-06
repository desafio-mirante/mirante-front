import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {HttpClientModule} from '@angular/common/http';
import { CpfPipe } from './pipes/cpf.pipe';
import { InserirComponent } from './componentes/inserir/inserir.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import { TelefoneEmailComponent } from './componentes/telefone-email/telefone-email.component';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    CpfPipe,
    InserirComponent,
    TelefoneEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputMaskModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    DropdownModule,
    ConfirmDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
