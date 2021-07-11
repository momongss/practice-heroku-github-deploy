const $userInfoWrappers = document.querySelectorAll('.user-info-wrapper');

$userInfoWrappers.forEach(($element) => {
  const $inputElement = $element.querySelector('input');
  $inputElement.addEventListener('focus', () => {
    $element.classList.add('focus');
  });
  $inputElement.addEventListener('blur', () => {
    $element.classList.remove('focus');
  });
});
