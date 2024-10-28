const xhr = new HMLHttpRequest();

xhr.addEventListener ('load', () => {
console.log (xhr.response);
});

xhr.open ('GET', 'https://supersimplebackend.dev');
xhr.send();