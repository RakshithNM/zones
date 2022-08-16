console.log('any scripts in host');

const pollBtn = document.getElementById('poll-btn');
const pollDlg = document.getElementById('poll-dlg');

if (typeof pollDlg.showModal !== 'function') {
  pollDlg.hidden = true;
}

pollBtn.addEventListener('click', () => {
  if (typeof pollDlg.showModal === "function") {
    pollDlg.showModal();
  } else {
    document.body.style = "background: red";
  }
});

pollDlg.addEventListener('click', function (event) {
  const rect = pollDlg.getBoundingClientRect();
  const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
  if(isInDialog === false) {
    pollDlg.close();
  }
});
