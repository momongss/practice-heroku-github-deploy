import { goLoginPage, goSignUpPhonePage } from './utils/routes.js';

const $agreeBtnList = document.querySelectorAll('.agree-toggle-btn');

const $ageOldBtn = document.querySelector('.age-old-btn');
const $ageYoungBtn = document.querySelector('.age-young-btn');

const $beforePageBtn = document.querySelector('.nav-left');
const $nextBtn = document.querySelector('.square-button');
$nextBtn.classList.add('disabled');

$agreeBtnList.forEach(($agreeBtn) => {
  $agreeBtn.addEventListener('click', (e) => {
    if ($agreeBtn.classList.contains('all')) {
      toggleBtnAll($agreeBtn, $agreeBtnList);
    } else {
      toggleBtn($agreeBtn);
    }

    if (checkAgree($agreeBtnList)) {
      $nextBtn.classList.remove('disabled');
    } else {
      $nextBtn.classList.add('disabled');
    }
  });
});

$beforePageBtn.addEventListener('click', (e) => {
  goLoginPage();
});

$nextBtn.addEventListener('click', (e) => {
  if (checkAgree($agreeBtnList)) {
    goSignUpPhonePage();
  }
});

$ageOldBtn.addEventListener('click', checkOld);
$ageYoungBtn.addEventListener('click', checkYoung);

function checkOld() {
  $ageOldBtn.classList.add('checked');
  $ageYoungBtn.classList.remove('checked');

  $ageOldBtn.src = '/images/age-old-checked.png';
  $ageYoungBtn.src = '/images/age-young.png';
}

function checkYoung() {
  $ageOldBtn.classList.remove('checked');
  $ageYoungBtn.classList.add('checked');

  $ageOldBtn.src = '/images/age-old.png';
  $ageYoungBtn.src = '/images/age-young-checked.png';
}

function checkAgree($agreeBtnList) {
  for (const $agreeBtn of $agreeBtnList) {
    if ($agreeBtn.classList.contains('normal') && !$agreeBtn.classList.contains('checked')) {
      return false;
    }
  }

  return true;
}

function toggleBtnAll($agreeAllBtn, $buttonList) {
  if ($agreeAllBtn.classList.contains('checked')) {
    $buttonList.forEach(($button) => {
      turnOffBtn($button);
    });
  } else {
    $buttonList.forEach(($button) => {
      turnOnBtn($button);
    });
  }
}

function toggleBtn($button) {
  console.log($button);
  if ($button.classList.contains('checked')) {
    turnOffBtn($button);
  } else {
    turnOnBtn($button);
  }
}

function turnOnBtn($button) {
  $button.classList.add('checked');
  $button.querySelector('.box-img').src = '/images/checkedbox.png';
}

function turnOffBtn($button) {
  $button.classList.remove('checked');
  $button.querySelector('.box-img').src = '/images/checkbox.png';
}
