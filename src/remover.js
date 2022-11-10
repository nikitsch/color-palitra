function deleteColumn(event, infoSpace) {
  let selectedСolumn = event.target.closest(".column")
  selectedСolumn?.remove()
  updateColumnsState()

  let colorAddedPage = selectedСolumn.firstChild.textContent.substring(1)
  let locationHash = getColorsList()

  let arrayColors = locationHash.replace(/[#-]/g, '').match(/.{1,6}/g)
  let indexDeletedColor = arrayColors.indexOf(`${colorAddedPage}`)

  indexDeletedColor == -1 ? arrayColors.splice(0, 1) : arrayColors.splice(indexDeletedColor, 1)

  let newHash = '#' + arrayColors.join('-')

  setColorsList(newHash)

  if (columns[0]) colorInfoTable()

  if (!columns.length) {
    document.body.append(createBasement(infoSpace));
  }
}