import ArmazenarBD from './ABD.js';
export default class TMG {
    constructor(chave = 'meusDados') {
        this.bd = new ArmazenarBD(chave);
    }
    criarTarefa(titulo, data) {
        const id = this.gerarId();
        const tarefa = {
            titulo,
            data,
            concluida: false // campo para controle de conclusão
        };
        this.bd.addItem(id, tarefa);
        return true;
    }
    listarTarefas() {
        return this.bd.getAllItems();
    }
    removerTarefa(id) {
        this.bd.removeItem(id);
    }
    limparTarefas() {
        this.bd.clear();
    }
    marcarComoConcluida(id, status = true) {
        const tarefa = this.bd.getItem(id);
        tarefa
            ? (tarefa.concluida = status, this.bd.addItem(id, tarefa))
            : null;
    }
    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }
}