if (typeof window === "object") {
  const button = document.querySelector('button')!;

  button.addEventListener('click', _ => {
    console.log('aaaa')
  })
}
console.log('aaa')
let logged;

logged = 1;
logged = '2';