const form = document.getElementById('registerForm');
const message = document.getElementById('message');
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('.toggle-password');
const strength = document.getElementById('strength').querySelector('span');

// Show/hide password
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
});

// Password strength indicator
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  let score = 0;

  if(val.length >= 6) score += 30;
  if(/[A-Z]/.test(val)) score += 20;
  if(/[0-9]/.test(val)) score += 25;
  if(/[^A-Za-z0-9]/.test(val)) score += 25;

  score = score > 100 ? 100 : score;
  strength.textContent = score + '%';
});

// Form submit with validation
form.addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value.trim();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if(name === "" || email === "" || password === ""){
    message.textContent = "Please fill in all fields!";
    message.className = "message error";
  } else if(!email.match(emailPattern)){
    message.textContent = "Please enter a valid email!";
    message.className = "message error";
  } else if(password.length < 6){
    message.textContent = "Password must be at least 6 characters!";
    message.className = "message error";
  } else {
    message.textContent = "Registration successful!";
    message.className = "message success";
    form.reset();
    strength.textContent = '0%';
  }
});
