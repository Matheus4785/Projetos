export default class Armazenar {
  constructor(chave) {
    this.chave = chave;
    !localStorage.getItem(this.chave)
      ? localStorage.setItem(this.chave, JSON.stringify({}))
      : null;
  }
  getAllItems() {
    const dados = localStorage.getItem(this.chave);
    return dados ? JSON.parse(dados) : {};
  }
  addItem(chaveItem, valor) {
    const dados = this.getAllItems();
    dados[chaveItem] = valor;
    localStorage.setItem(this.chave, JSON.stringify(dados));
  }
  getItem(chaveItem) {
    const dados = this.getAllItems();
    return dados[chaveItem];
  }
  removeItem(chaveItem) {
    const dados = this.getAllItems();
    dados.hasOwnProperty(chaveItem)
      ? (delete dados[chaveItem],
         localStorage.setItem(this.chave, JSON.stringify(dados)))
      : null;
  }
  clear() {
    localStorage.setItem(this.chave, JSON.stringify({}));
  }
}