const zoneBtn = document.getElementById('zone-btn');
const zoneDlg = document.getElementById('zone-dlg');

if (typeof zoneDlg.showModal !== 'function') {
  zoneDlg.hidden = true;
}

zoneBtn.addEventListener('click', () => {
  if (typeof zoneDlg.showModal === "function") {
    zoneDlg.showModal();
  } else {
    document.body.style = "background: red";
  }
});

zoneDlg.addEventListener('click', function (event) {
  const rect = zoneDlg.getBoundingClientRect();
  const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
  if(isInDialog === false) {
    zoneDlg.close();
  }
});
