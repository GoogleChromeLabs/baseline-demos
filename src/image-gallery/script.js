const dialogElem = document.getElementById("dialog");
const dialogImageElem = document.getElementById("dialog-image");
const dialogCreditElem = document.getElementById("dialog-credit");
const showBtns = document.querySelectorAll(".show");
const closeBtn = document.querySelector(".close");

[...showBtns].forEach((showBtn) => {
  showBtn.addEventListener("click", (event) => {
    const listItem = event.currentTarget.closest("li");

    const creditHTML = listItem.querySelector(".credit").innerHTML;
    dialogCreditElem.innerHTML = creditHTML;
    
    const imgSrc = listItem.querySelector("img").getAttribute("src");
    dialogImageElem.setAttribute("src", imgSrc);
    dialogImageElem.addEventListener("load", () => {
      dialogElem.showModal();
    });
  });
});

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});
