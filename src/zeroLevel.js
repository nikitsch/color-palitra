function createBasement() {
  let amountMenu = document.querySelector('.amount_menu');
  amountMenu.classList.add("basement_adder");

  const textBase = document.createElement("p");
  textBase.classList.add("basement_text");
  textBase.append('There are not many bright pages in life, so add them ...');

  const pageBasement = document.createElement("div");
  pageBasement.classList.add("basement");

  pageBasement.append(textBase);

  return pageBasement;
}