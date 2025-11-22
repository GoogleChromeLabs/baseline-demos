const openDialogBtns = document.querySelectorAll(
  `[data-button*="show-dialog"]`
);
const dialog = document.querySelector('dialog');
const closeDialogBtn = document.getElementById('close');
const dialogForm = document.getElementById('dialog-form');

openDialogBtns.forEach(openDialogBtn => {
  openDialogBtn.addEventListener('click', () => {
    dialog.showModal();
  });
});

closeDialogBtn.addEventListener('click', () => {
  dialog.close();
});

dialogForm.addEventListener('submit', (event) => {
  console.log('Form submitted!');
  event.preventDefault();
  dialog.close();
});