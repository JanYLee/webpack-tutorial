const button = document.createElement('button');
button.innerHTML = 'click';

button.addEventListener('click', () => {
  console.log('click');
  // es6草案中的语法, jsonp实现动态加载文件
  import('./source.js').then(data => {
    console.log(data);
  })
})

document.body.appendChild(button);
