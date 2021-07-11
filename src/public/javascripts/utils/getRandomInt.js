function getRandomInt() {
  const min = Math.ceil(0);
  const max = Math.floor(9);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export { getRandomInt };
