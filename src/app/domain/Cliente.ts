export interface Cliente {
  id ?: number;
  nome: string;
  cpf: string;
  emails: string[];
  telefones: Telefone[];
  endereco: Endereco;
}

export interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento ?: string;
}

export interface Telefone {
  numero: string;
  tipoTelefone: string;
}

export class TipoTelefone {
  static readonly RESIDENCIAL = new TipoTelefone('Residencial', '(00) 0000-0000');
  static readonly COMERCIAL = new TipoTelefone('Comercial', '(00) 0000-0000');
  static readonly CELULAR = new TipoTelefone('Celular', '(00) 00000-0000');

  private constructor(private readonly key: string, public readonly mascara: any) {
  }

  toString() {
    return this.key;
  }
}
