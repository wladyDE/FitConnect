export const animateNumber = (targetNumber, element) => {
    const time = 500;
    const step = 1;

    let e = document.querySelector("#" + element);
    if (targetNumber > 0) {
        let n = 0;
        let t = Math.round(time / (targetNumber / step));
        let interval = setInterval(() => {
          n = n + step;
          if (n == targetNumber) {
            clearInterval(interval);
          }
          e.innerHTML = n;
        }, t);
    } else {
      e.innerHTML = 0; 
    }
};