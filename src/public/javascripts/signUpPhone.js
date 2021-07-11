import { getRandomInt } from './utils/getRandomInt.js';
import { goSignUpAgreePage, goSignUpInfoPage } from './utils/routes.js';

const $background = document.querySelector('.sign-up-main');
const $beforePageBtn = document.querySelector('.nav-left');
const $nextPageBtn = document.querySelector('.nav-right');

const $beforeAuthArea = document.querySelector('.before-auth-wrapper');
const $afterAuthArea = document.querySelector('.after-auth-wrapper');

const $phoneNumWrapper = document.querySelector('.phone-num');
const $phoneNumInput = $phoneNumWrapper.querySelector('input');
const $phoneInputClearBtn = $phoneNumWrapper.querySelector('.remove-input-btn');
const $phoneNumValidSign = $phoneNumWrapper.querySelector('.valid-sign');

$phoneNumInput.placeholder = '010-0000-0000';
$phoneNumInput.maxLength = 13;

const $authKeyBtn = document.querySelector('.certification-number-btn');

let $authNumWrapper;
let $authNumInput;
let $authNumValidSign;

let $resendAuthKeyBtn;

let phoneVaild = false;
let authVaild = false;

function confirmPhoneNum() {
  if (phoneVaild) return;
  const $checkBtn = $phoneNumValidSign.querySelector('img');
  $checkBtn.src = '/images/checked.png';
  phoneVaild = true;
}

function deconfirmPhoneNum() {
  if (!phoneVaild) return;
  const $checkBtn = $phoneNumValidSign.querySelector('img');
  $checkBtn.src = '/images/check.png';
  phoneVaild = false;
}

function getAuthKey() {
  return `${getRandomInt()}${getRandomInt()}${getRandomInt()}${getRandomInt()}`;
}

function putInAuthKey(authKey) {
  $authNumInput.value = authKey;
}

function activateAuthInputArea() {
  $beforeAuthArea.classList.remove('show');
  $afterAuthArea.classList.add('show');

  $authNumWrapper = document.querySelector('.auth-num');
  $authNumInput = $authNumWrapper.querySelector('input');
  $authNumValidSign = $authNumWrapper.querySelector('.valid-sign');

  $authNumInput.maxLength = 4;

  $authNumInput.addEventListener('keyup', (e) => {
    if ($authNumInput.value.length >= 4) {
      confirmAuth();
    } else {
      deconfirmAuth();
    }
  });

  $resendAuthKeyBtn = document.querySelector('.review-auth-num-btn');

  $resendAuthKeyBtn.addEventListener('click', (e) => {
    setTimeout(() => {
      const authKey = getAuthKey();
      putInAuthKey(authKey);
      confirmAuth();
    }, 2000);
  });
}

function confirmAuth() {
  authVaild = true;
  const $checkBtn = $authNumValidSign.querySelector('img');
  $checkBtn.src = '/images/checked.png';
  $nextPageBtn.classList.add('active');
}

function deconfirmAuth() {
  authVaild = false;
  const $checkBtn = $authNumValidSign.querySelector('img');
  $checkBtn.src = '/images/check.png';
  $nextPageBtn.classList.remove('active');
}

$beforePageBtn.addEventListener('click', (e) => {
  goSignUpAgreePage();
});

$nextPageBtn.addEventListener('click', (e) => {
  if (authVaild) {
    goSignUpInfoPage();
  }
});

$authKeyBtn.addEventListener('click', (e) => {
  if (phoneVaild) {
    activateAuthInputArea();

    setTimeout(() => {
      const authKey = getAuthKey();
      putInAuthKey(authKey);
      confirmAuth();
    }, 2000);
  }
});

$phoneNumInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    if ($phoneNumInput.value.length === 4 || $phoneNumInput.value.length === 9) {
      $phoneNumInput.value = $phoneNumInput.value.slice(0, $phoneNumInput.value.length - 2);
      e.preventDefault();
    }
    return;
  }
});

$phoneNumInput.addEventListener('keyup', (e) => {
  if ($phoneNumInput.value.length >= 13) {
    confirmPhoneNum();
  } else {
    deconfirmPhoneNum();
  }

  if (e.key === 'Backspace') {
    return;
  }

  if ($phoneNumInput.value.length === 3) {
    $phoneNumInput.value += '-';
  } else if ($phoneNumInput.value.length === 8) {
    $phoneNumInput.value += '-';
  }
});

$phoneNumInput.addEventListener('onchange', (e) => {
  console.log($phoneNumInput.value.length);
});

$phoneNumInput.addEventListener('focus', (e) => {
  $phoneInputClearBtn.classList.add('show');
});

$background.addEventListener('click', (e) => {
  if (e.target === $background) {
    $phoneInputClearBtn.classList.remove('show');
  }
});

$phoneInputClearBtn.addEventListener('click', (e) => {
  $phoneNumInput.value = '';
  $phoneNumInput.focus();
});
