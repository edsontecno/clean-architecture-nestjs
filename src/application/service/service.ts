import { fieldIsValid } from '../utils/utils';

export class Service {
  protected msgCampoObrigatorio = 'Campo XXX é de preenchimento obrigatório';

  prepareMessageErro(field) {
    return this.msgCampoObrigatorio.replace('XXX', field);
  }

  validField(field, nameField) {
    fieldIsValid(field, this.prepareMessageErro(nameField));
  }

  checkField(field, message) {
    fieldIsValid(field, message);
  }
}
