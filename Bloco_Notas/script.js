const noteArea = document.getElementById('noteArea');
const clearBtn = document.getElementById('clearBtn');

// Carrega a nota salva no localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem('blocoNota');
  if (savedNote) {
    noteArea.value = savedNote;
  }
});

// Salva a nota no localStorage a cada mudança
noteArea.addEventListener('input', () => {
  localStorage.setItem('blocoNota', noteArea.value);
});

// Limpa tudo
clearBtn.addEventListener('click', () => {
  const confirmar = confirm("Tem certeza que deseja apagar todas as anotações?");
  if (confirmar) {
    localStorage.removeItem('blocoNota');
    noteArea.value = '';
  }
});
