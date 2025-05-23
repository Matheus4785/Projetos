import TMG from './TMG.js';
const tarefas = new TMG();
const container = document.getElementById('lista-tarefas');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
let currentFilter = 'todos';
dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});
document.addEventListener('click', (e) => {
  !dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)
    ? dropdownMenu.classList.remove('show')
    : null;
});
dropdownMenu.addEventListener('click', (e) => {
  e.target.classList.contains('dropdown-item')
    ? (() => {
        const selectedValue = e.target.getAttribute('data-value');
        currentFilter = selectedValue;
        dropdownBtn.textContent = e.target.textContent + ' ▾';
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item =>
          item.classList.toggle('active', item === e.target)
        );
        dropdownMenu.classList.remove('show');
        mostrarTarefasNaTela(currentFilter);
      })()
    : null;
});
function gerarDataAleatoriaFutura() {
  const hoje = new Date();
  const dataInicio = hoje.getTime();
  const umAnoDepois = new Date(hoje.getFullYear() + 1, hoje.getMonth(), hoje.getDate()).getTime();
  const timestampAleatorio = Math.floor(Math.random() * (umAnoDepois - dataInicio + 1)) + dataInicio;
  const data = new Date(timestampAleatorio);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
function inicializarTarefasPadroes() {
  const todas = tarefas.listarTarefas();
  Object.keys(todas).length === 0
    ? (tarefas.criarTarefa("Estudar JS", gerarDataAleatoriaFutura()),
       tarefas.criarTarefa("Ir à academia", gerarDataAleatoriaFutura()),
       console.log('Tarefas padrões criadas!'))
    : console.log('Tarefas já existem no armazenamento.');
}
function criarElementoTarefa(id, tarefa) {
  const div = document.createElement('div');
  div.className = 'tarefa d-flex justify-content-between align-items-center gap-3 px-3 py-2 fade-in';
  div.id = `tarefa-${id}`;
  tarefa.concluida ? div.classList.add('concluida') : null;
  div.innerHTML = `
    <div class="form-check d-flex align-items-start gap-2 flex-grow-1">
      <input type="checkbox" id="check-${id}" class="form-check-input tarefa-checkbox" ${tarefa.concluida ? 'checked' : ''}>
      <div>
        <label for="check-${id}" class="fw-bold d-block mb-1">${tarefa.titulo}</label>
        <small class="text-muted">Data de entrega: <span class="data">${tarefa.data.replace(/-/g, '/')}</span></small>
      </div>
    </div>
    <button class="btn btn-sm btn-danger remover-tarefa">Remover</button>
  `;
  adicionarEventos(div, id);
  return div;
}
function adicionarEventos(elemento, id) {
  const checkbox = elemento.querySelector('.tarefa-checkbox');
  const botaoRemover = elemento.querySelector('.remover-tarefa');
  checkbox.addEventListener('change', () => {
    const status = checkbox.checked;
    tarefas.marcarComoConcluida(id, status);
    status ? elemento.classList.add('concluida') : elemento.classList.remove('concluida');
  });
  botaoRemover.addEventListener('click', () => {
    elemento.classList.add('fade-out');
    setTimeout(() => {
      tarefas.removerTarefa(id);
      console.log(Object.keys(tarefas.listarTarefas()).length);
      mostrarTarefasNaTela(currentFilter);
    }, 300);
  });
}
function mostrarTarefasNaTela(tipo = currentFilter) {
  container.innerHTML = '';
  const tipos = ['todos', 'pendentes', 'concluidos'];
  !tipos.includes(tipo)
    ? (console.log('Tipo de tarefa não encontrado.'), null)
    : (() => {
        const todasTarefas = tarefas.listarTarefas();

        for (const [id, tarefa] of Object.entries(todasTarefas)) {
          const deveExibir =
            tipo === 'todos'
              ? true
              : tipo === 'concluidos'
              ? tarefa.concluida
              : !tarefa.concluida;

          deveExibir ? container.appendChild(criarElementoTarefa(id, tarefa)) : null;
        }
      })();
}
inicializarTarefasPadroes();
mostrarTarefasNaTela();
const btnAdicionar = document.getElementById('btnAdicionar');
const modal = document.getElementById('modalNovaTarefa');
const cancelar = document.getElementById('cancelarTarefa');
const formNovaTarefa = document.getElementById('formNovaTarefa');
btnAdicionar.addEventListener('click', () => {
  formNovaTarefa.reset();
  modal.style.display = 'flex';
});
cancelar.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  e.target === modal ? (modal.style.display = 'none') : null;
});
formNovaTarefa.addEventListener('submit', (e) => {
  e.preventDefault();
  const titulo = document.getElementById('tituloTarefa').value.trim();
  const descricao = document.getElementById('descricaoTarefa').value.trim();
  const data = document.getElementById('dataEntregaTarefa').value;

  !titulo || !descricao || !data
    ? alert("Todos os campos são obrigatórios: título, descrição e data.")
    : (tarefas.criarTarefa(titulo, data, descricao),
       (modal.style.display = 'none'),
       mostrarTarefasNaTela(currentFilter));
});