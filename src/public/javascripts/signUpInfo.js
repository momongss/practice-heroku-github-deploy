import { goSignUpPhonePage, goLoginPage, goSignUpAgreePage } from './utils/routes.js';
import { api } from './utils/api.js';

const $beforePageBtn = document.querySelector('.nav-left');
const $nextPageBtn = document.querySelector('.nav-right');

document.querySelectorAll('.user-info-wrapper').forEach(($userInfo) => {
  registerInputFocusBlurEvent($userInfo);
  registerInputClearEvent($userInfo);
});

const $emailWrapper = document.querySelector('.email');
const $checkEmailDuplicationBtn = document.querySelector('.check-email');
const $moreInfoArea = document.querySelector('.toggle-area');

$checkEmailDuplicationBtn.addEventListener('click', (e) => {
  $moreInfoArea.classList.add('show');
  confirmInput('email', $emailWrapper);
});

const $nickNameWrapper = document.querySelector('.nick-name');
const $passwordWrapper = document.querySelector('.password');
const $birthDateWrapper = document.querySelector('.birthDate');

const $passwordInput = $passwordWrapper.querySelector('input');
$passwordInput.type = 'password';

registerInputEvent();

const checkList = {
  email: false,
  nickName: false,
  pwd: false,
  birthDate: false,
};

function confirmInput(kind, $inputWrapper) {
  if (checkList[kind]) return;
  const $validSign = $inputWrapper.querySelector('.valid-sign');
  const $checkBtn = $validSign.querySelector('img');
  $checkBtn.src = '/images/checked.png';
  checkList[kind] = true;
}

function deconfirmInput(kind, $inputWrapper) {
  if (!checkList[kind]) return;
  const $validSign = $inputWrapper.querySelector('.valid-sign');
  const $checkBtn = $validSign.querySelector('img');
  $checkBtn.src = '/images/check.png';
  checkList[kind] = false;
}

function registerInputClearEvent($inputWrapper) {
  const $input = $inputWrapper.querySelector('input');
  const $inputClearBtn = $inputWrapper.querySelector('.remove-input-btn');

  $inputClearBtn.addEventListener('click', (e) => {
    $input.value = '';
  });

  $input.focus();
}

function registerInputFocusBlurEvent($inputWrapper) {
  const $input = $inputWrapper.querySelector('input');
  const $inputClearBtn = $inputWrapper.querySelector('.remove-input-btn');

  $input.addEventListener('blur', (e) => {
    setTimeout(() => {
      $inputClearBtn.classList.remove('show');
    }, 20);
  });
}

function registerInputEvent() {
  const $emailInput = $emailWrapper.querySelector('input');
  const $nickNameInput = $nickNameWrapper.querySelector('input');
  const $passwordInput = $passwordWrapper.querySelector('input');
  const $birthDateInput = $birthDateWrapper.querySelector('input');

  const $emailClearBtn = $emailWrapper.querySelector('.remove-input-btn');
  const $nickNameClearBtn = $nickNameWrapper.querySelector('.remove-input-btn');
  const $passwordClearBtn = $passwordWrapper.querySelector('.remove-input-btn');
  const $birthDateClearBtn = $birthDateWrapper.querySelector('.remove-input-btn');

  $emailInput.addEventListener('keyup', (e) => {
    if ($emailInput.value.length > 0) {
      $emailClearBtn.classList.add('show');
      confirmInput('email', $emailWrapper);
      checkComplete();
    } else {
      $emailClearBtn.classList.remove('show');
      deconfirmInput('email', $emailWrapper);
    }
  });

  $nickNameInput.addEventListener('keyup', (e) => {
    if ($nickNameInput.value.length > 0) {
      $nickNameClearBtn.classList.add('show');
      confirmInput('nickName', $nickNameWrapper);
      checkComplete();
    } else {
      $nickNameClearBtn.classList.remove('show');
      deconfirmInput('nickName', $nickNameWrapper);
    }
  });

  $passwordInput.addEventListener('keyup', (e) => {
    if ($passwordInput.value.length > 0) {
      $passwordClearBtn.classList.add('show');
    } else {
      $passwordClearBtn.classList.remove('show');
    }
    const password = $passwordInput.value;
    if (passwordCheck(password)) {
      confirmInput('pwd', $passwordWrapper);
      checkComplete();
      alertInvaildPassword($passwordWrapper, '');
    } else {
      alertInvaildPassword(
        $passwordWrapper,
        '10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다',
      );
      deconfirmInput('pwd', $passwordWrapper);
    }
  });

  $birthDateInput.addEventListener('keyup', (e) => {
    if (e.key === 'Backspace') {
      if ($birthDateInput.value.length === 5) {
        $birthDateInput.value = $birthDateInput.value.slice(0, $birthDateInput.value.length - 2);
      } else if ($birthDateInput.value.length === 9) {
        $birthDateInput.value = $birthDateInput.value.slice(0, $birthDateInput.value.length - 2);
      }
    }

    if ($birthDateInput.value.length > 0) {
      $birthDateClearBtn.classList.add('show');

      const birthValid = birthDateCheck($birthDateInput.value);

      if (birthValid === 'valid') {
        confirmInput('birthDate', $birthDateWrapper);
        alertInvaildPassword($birthDateWrapper, '');
      } else if (birthValid === 'invalid') {
        alertInvaildPassword($birthDateWrapper, '올바른 생년월일이 아닙니다.');
        deconfirmInput('birthDate', $birthDateWrapper);
      } else {
        deconfirmInput('birthDate', $birthDateWrapper);
        alertInvaildPassword($birthDateWrapper, '');
      }

      if (checkComplete()) $nextPageBtn.classList.add('active');
    } else {
      $birthDateClearBtn.classList.remove('show');
      deconfirmInput('birthDate', $birthDateWrapper);
    }

    if ($birthDateInput.value.length === 4) {
      $birthDateInput.value += '. ';
    } else if ($birthDateInput.value.length === 8) {
      $birthDateInput.value += '. ';
    }
  });

  $birthDateInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') return;
    if ($birthDateInput.value.length >= 12) {
      e.preventDefault();
    }
  });
}

function birthDateCheck(birthDate) {
  // return true;
  let [year, month, day] = birthDate.split('. ');

  if (year == null || month == null || day == null) return 'writing';

  if (!/^[0-9]+$/.test(year) || !/^[0-9]+$/.test(month) || !/^[0-9]+$/.test(day)) {
    return 'invalid';
  }

  year = Number(year);
  month = Number(month);
  day = Number(day);

  const today = new Date();

  const currentDayCnt = today.getFullYear() * 365 * 30 + today.getMonth() * 30 + today.getDay();
  const inputDayCnt = year * 365 * 30 + month * 30 + day;

  if (currentDayCnt < inputDayCnt || month > 12 || day > 31) {
    return 'invalid';
  }
  return 'valid';
}

function passwordCheck(pwd) {
  if (pwd.length < 10) return false;
  let cnt = 0;
  cnt += /[A-Z]/.test(pwd) ? 1 : 0;
  cnt += /[a-z]/.test(pwd) ? 1 : 0;
  cnt += /[0-9]/.test(pwd) ? 1 : 0;
  cnt += /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi.test(pwd) ? 1 : 0;
  if (cnt < 2) return false;
  for (let i = 0; i <= pwd.length - 3; i++) {
    let n1 = Number(pwd.charAt(i)),
      n2 = Number(pwd.charAt(i + 1)),
      n3 = Number(pwd.charAt(i + 2));
    if (isNaN(n1) | isNaN(n2) | isNaN(n3)) continue;
    if (n1 == n2 && n2 == n3) return false;
    if (n1 + 1 == n2 && n2 + 1 == n3) return false;
    if (n1 - 1 == n2 && n2 - 1 == n3) return false;
  }
  return true;
}

function alertInvaildPassword($infoWrapper, message) {
  const $errorMessage = $infoWrapper.querySelector('.validation-eval');
  $errorMessage.innerHTML = message;
}

function checkComplete() {
  return checkList.email && checkList.nickName && checkList.pwd && checkList.birthDate;
}

$beforePageBtn.addEventListener('click', (e) => {
  goSignUpPhonePage();
});

$nextPageBtn.addEventListener('click', async (e) => {
  const $emailInput = $emailWrapper.querySelector('input');
  const $nickNameInput = $nickNameWrapper.querySelector('input');
  const $passwordInput = $passwordWrapper.querySelector('input');
  const $birthDateInput = $birthDateWrapper.querySelector('input');

  if (checkComplete()) {
    try {
      await api.fetchSignUp({
        email: $emailInput.value,
        name: $nickNameInput.value,
        pwd: $passwordInput.value,
        birthDate: $birthDateInput.value,
      });
      goLoginPage();
    } catch (err) {
      goSignUpAgreePage();
    }
  }
});
