import { goLoginPage } from './utils/routes.js';

function addLoginBtnEvent() {
  const $loginBtn = document.querySelector('.login-btn');
  if ($loginBtn) $loginBtn.addEventListener('click', goLoginPage);
}

(function () {
  addLoginBtnEvent();
})();
