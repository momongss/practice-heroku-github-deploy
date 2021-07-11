import { goInitPage, goSignUpAgreePage } from './utils/routes.js';
import { api } from './utils/api.js';

function addRouter() {
  const $closeBtn = document.querySelector('.nav .nav-left');
  const $signupLink = document.querySelector('.link-to-signup a');

  $closeBtn.addEventListener('click', goInitPage);
  $signupLink.addEventListener('click', goSignUpAgreePage);
}

function addLoginInputEvent() {
  const $loginInputs = document.querySelectorAll('.login-input');
  $loginInputs.forEach(($loginInput) => {
    $loginInput.addEventListener('change', handleInputChange);
  });
}

function addLoginBtnEvent() {
  const $loginBtn = document.querySelector('.login-form-btn');
  $loginBtn.addEventListener('click', handleLoginClick);
}

function handleInputChange() {
  this.classList.remove('error', 'empty', 'invalid');
}

function handleLoginClick() {
  const $emailInput = document.querySelector('.login-form-input input[name="email"]');
  const $pwdInput = document.querySelector('.login-form-input input[name="pwd"]');

  if (!$emailInput.value || !$pwdInput.value) {
    if (!$emailInput.value) {
      $emailInput.parentNode.classList.add('error', 'empty');
    }
    if (!$pwdInput.value) {
      $pwdInput.parentNode.classList.add('error', 'empty');
    }
  } else {
    login($emailInput.value, $pwdInput.value);
  }
}

async function login(email, pwd) {
  const $emailInput = document.querySelector('.login-form-input input[name="email"]');
  const $pwdInput = document.querySelector('.login-form-input input[name="pwd"]');

  try {
    await api.fetchLogin({ email, pwd });
    goInitPage();
  } catch (err) {
    $emailInput.parentNode.classList.add('error', 'invalid');
    $pwdInput.parentNode.classList.add('error', 'invalid');
  }
}

(function () {
  addRouter();
  addLoginInputEvent();
  addLoginBtnEvent();
})();
