const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const strength = getPasswordStrength(password);

  strengthText.textContent = strength.label;
  strengthText.className = strength.class;
});

function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 1) return { label: 'Fraca', class: 'weak' };
  if (score === 2 || score === 3) return { label: 'Média', class: 'medium' };
  return { label: 'Forte', class: 'strong' };
}
