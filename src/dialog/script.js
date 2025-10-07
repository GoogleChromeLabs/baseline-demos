const openDialogBtns = document.querySelectorAll(
  `[data-button*="show-dialog"]`
);
const dialog = document.querySelector('dialog');
const closeDialogBtn = document.getElementById('close');

[...openDialogBtns].forEach((openDialogBtn) => {
  openDialogBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  closeDialogBtn.addEventListener('click', () => {
    dialog.close();
  });
});
