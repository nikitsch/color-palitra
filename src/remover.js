function deleteColumn(event) {
  if (columns.length > 1) {
    let target = event.target.closest(".column")
    target.remove()
    updateColumnsState()
  }
}