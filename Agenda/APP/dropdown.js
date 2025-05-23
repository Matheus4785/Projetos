const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
let currentFilter = 'todos';

// Abre/fecha o dropdown ao clicar no botão
dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// Fecha o dropdown se clicar fora
document.addEventListener('click', (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});

// Seleciona o filtro e atualiza a lista
dropdownMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('dropdown-item')) {
    const selectedValue = e.target.getAttribute('data-value');
    currentFilter = selectedValue;

    // Atualiza texto do botão
    dropdownBtn.textContent = e.target.textContent + ' ▾';

    // Atualiza item ativo
    dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.classList.toggle('active', item === e.target);
    });

    dropdownMenu.classList.remove('show');
    mostrarTarefasNaTela(currentFilter);
  }
});
