function getColumn() {
  const keyLock = document.createElement("i");
  keyLock.classList.add("fa-solid", "fa-lock-open");
  keyLock.dataset.type = "lock";

  const buttonLock = document.createElement("button");
  buttonLock.dataset.type = "lock";

  const titleColor = document.createElement("h1");
  titleColor.dataset.type = "copy";

  const createdColumn = document.createElement("div");
  createdColumn.classList.add("column");

  buttonLock.append(keyLock);
  createdColumn.append(titleColor, buttonLock);

  return createdColumn;
};