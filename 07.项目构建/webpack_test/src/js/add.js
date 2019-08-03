function add() {
  const h2 = document.createElement('h2');
  h2.className = 'add';
  let num = 1;
  h2.innerText = num;

  h2.onclick = function () {
    h2.innerText = ++num;
  };

  document.body.appendChild(h2);
}

export default add;