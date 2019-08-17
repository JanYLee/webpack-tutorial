const xhr = new XMLHttpRequest();

xhr.open('GET', '/user', true);

xhr.onload = () => {
  console.log(xhr.response);
}

xhr.send();