let columns = document.querySelectorAll('.column');

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code == 'Space') {
    setRandomColor()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type == 'lock') {
    let node = event.target.tagName.toLowerCase() == 'i'
      ? event.target
      : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyTextToClick(event.target.textContent)
  }
})

function randomColor() {
  const HEX = '0123456789ABCDEF';
  let color = '';
  for (i = 0; i < 6; i++) {
    color += HEX[Math.floor(Math.random() * HEX.length)]
  };
  return '#' + color;
}

function copyTextToClick(text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColor(isInitial) {
  let colors = isInitial ? getColorsFromHash() : [];

  columns.forEach((el, index) => {
    let isLocked = el.querySelector('i').classList.contains('fa-lock');
    let text = el.querySelector('h1');
    let svg = el.querySelector('button');
    
    if (isLocked) {
      colors.push(text.textContent)
      return
    };

    let color = isInitial 
    ? colors[index]
      ? colors[index]
      : randomColor()
    : randomColor(); //chroma.random();
    
    if(!isInitial) {
      colors.push(color)
    }
  
    
    text.textContent = color;
    el.style.background = color;
    setTextColor(text, color);
    setTextColor(svg, color);
  });
  updateColorsHash(colors);
}

function setTextColor(viewEl, color) {
  let luminance = chroma(color).luminance();
  viewEl.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(el => {
    console.log(typeof el)
    return el.substring(1)
  })
    .join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(el => '#' + el)
  }
  return []
}

setRandomColor(true)