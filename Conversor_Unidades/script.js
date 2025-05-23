const categorySelect = document.getElementById('category');
const inputUnitSelect = document.getElementById('inputUnit');
const outputUnitSelect = document.getElementById('outputUnit');
const inputValue = document.getElementById('inputValue');
const resultDiv = document.getElementById('result');

const units = {
  time: {
    base: 'segundos',
    units: {
      segundos: 1,
      minutos: 60,
      horas: 3600,
    }
  },
  distance: {
    base: 'metros',
    units: {
      metros: 1,
      quilômetros: 1000,
      milhas: 1609.344,
    }
  },
  force: {
    base: 'newton',
    units: {
      newton: 1,
      'quilograma-força': 9.80665,
    }
  },
  weight: {
    base: 'quilograma',
    units: {
      quilogramas: 1,
      libras: 0.45359237,
    }
  }
};

function populateUnits(category) {
  inputUnitSelect.innerHTML = '';
  outputUnitSelect.innerHTML = '';

  const unitList = Object.keys(units[category].units);

  unitList.forEach(unit => {
    const option1 = document.createElement('option');
    option1.value = unit;
    option1.textContent = unit;
    inputUnitSelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = unit;
    option2.textContent = unit;
    outputUnitSelect.appendChild(option2);
  });
  inputUnitSelect.selectedIndex = 0;
  outputUnitSelect.selectedIndex = unitList.length > 1 ? 1 : 0;
}

function convert(category, value, fromUnit, toUnit) {
  if (isNaN(value) || value === '') return '—';
  const baseFactor = units[category].units
  const valueInBase = value * baseFactor[fromUnit];
  const converted = valueInBase / baseFactor[toUnit];
  return Number.isInteger(converted) ? converted.toString() : converted.toFixed(2);
}

function updateResult() {
  const category = categorySelect.value;
  const value = parseFloat(inputValue.value);
  const fromUnit = inputUnitSelect.value;
  const toUnit = outputUnitSelect.value;

  const convertedValue = convert(category, value, fromUnit, toUnit);

  if (convertedValue === '—') {
    resultDiv.textContent = 'Resultado: —';
  } else {
    resultDiv.textContent = `Resultado: ${convertedValue} ${toUnit}`;
  }
}

categorySelect.addEventListener('change', () => {
  populateUnits(categorySelect.value);
  inputValue.value = '';
  resultDiv.textContent = 'Resultado: —';
});

inputUnitSelect.addEventListener('change', updateResult);
outputUnitSelect.addEventListener('change', updateResult);
inputValue.addEventListener('input', updateResult);

populateUnits(categorySelect.value);
