(() => {
  let numbers = 0;
  for (let combination = 278384; combination <= 824795; combination++){
    const chars = `${combination}`.split('');
    if (
      chars[0] <= chars[1] &&
      chars[1] <= chars[2] &&
      chars[2] <= chars[3] &&
      chars[3] <= chars[4] &&
      chars[4] <= chars[5] && (
      (chars[0] === chars[1] && chars[1] !== chars[2]) ||
      (chars[1] === chars[2] && chars[2] !== chars[3] && chars[1] !== chars[0]) ||
      (chars[2] === chars[3] && chars[3] !== chars[4] && chars[2] !== chars[1]) ||
      (chars[3] === chars[4] && chars[4] !== chars[5] && chars[3] !== chars[2]) ||
      (chars[4] === chars[5] && chars[4] !== chars[3]) )
      ) {
        numbers++;
      }
  }
  console.log(numbers);
})();
