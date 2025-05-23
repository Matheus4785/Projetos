const display = document.getElementById('display');
const preview = document.getElementById('preview');

const press = val => {
  display.value = display.value === '0' ? val : display.value + val;
  updatePreview();
}

const pressFunc = val =>
  val === 'pi'
    ? (display.value = display.value === '0' ? Math.PI.toFixed(8) : display.value + Math.PI.toFixed(8))
    : (display.value = display.value === '0' ? val : display.value + val, updatePreview());

const clearDisplay = () => {
  display.value = '0';
  preview.innerText = '';
}

const backspace = () => {
  display.value = display.value.length === 1 ? '0' : display.value.slice(0, -1);
  updatePreview();
}

const calculate = () => {
  const expr = display.value
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/\^/g, '**')
    .replace(/π/g, Math.PI);

  try {
    const result = safeEvalScientific(expr);
    display.value = result === null ? 'Erro' : +result.toFixed(8);
    preview.innerText = '';
  } catch {
    display.value = 'Erro';
    preview.innerText = '';
  }
}

function updatePreview() {
  const expr = display.value
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/\^/g, '**')
    .replace(/π/g, Math.PI);

  try {
    const result = safeEvalScientific(expr);
    preview.innerText = isFinite(result) ? '= ' + +result.toFixed(8) : '';
  } catch {
    preview.innerText = '...';
  }
}

function safeEvalScientific(expr) {
  const fexpr = expr
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/sqrt\(/g, 'Math.sqrt(');

  return Function('"use strict";return (' + fexpr + ')')();
}
