// cart toggle
const cartID = 'cart';

const cartTarget = document.getElementById(cartID);
const cartToggle = document.querySelector(`button[aria-controls=${cartID}]`);

const matchCartState = () => {
  cartToggle.setAttribute('aria-expanded', cartTarget.dataset.expanded);
}

const toggleCartState = () => {
  cartTarget.dataset.expanded = (cartTarget.dataset.expanded == 'false')
    ? 'true'
    : 'false';
  matchCartState();
}

matchCartState();
cartToggle.addEventListener('click', (e) => toggleCartState());

// grid switch
const gridSelect = document.getElementById('product-layout');
const layoutList = document.getElementById('main-list');

const changeGridlayout = () => {
  const toLayout = gridSelect.value;
  layoutList.dataset.layout = toLayout;
};

gridSelect.addEventListener('change', (e) => changeGridlayout());

// Product state

const productListId = 'main-list';
const productList = document.getElementById(productListId);
const productsInCart = new Map([[
  '1',false], ['2', true], ['3', true], ['4', false], ['5', true], ['6', true]]);

const getProductInCart = (productId) => 
  cartTarget.querySelector(`[data-product="${productId}"]`);
const getProductInList = (productId) =>
  productList.querySelector(`[data-product="${productId}"]`);

const addProductToCart = (productId)=>{
  productsInCart.set(productId, true);
  matchProductStates();
}
const removeProductFromCart = (productId)=>{
  productsInCart.set(productId, false);
  matchProductStates();
}
const matchProductStates = () => {
  productsInCart.forEach((inCart, productId)=>{
    // Sync the cart state
    const cartProduct = getProductInCart(productId);
    if(inCart) cartProduct.removeAttribute('hidden');
    else cartProduct.setAttribute('hidden', 'hidden');

    // Sync the list state
    const listProduct = getProductInList(productId);
    const addButton = listProduct.querySelector('button');
    addButton.setAttribute('aria-pressed', inCart);
  })
}
matchProductStates();

// generic toggle
const toggleBtns = document.querySelectorAll(`product-detail button[data-toggle]`);

const pressToggle = (btn) => {
  const wasPressed = btn.getAttribute('aria-pressed') === 'true';
  const productId = btn.closest('product-detail').dataset.product;
  const action = btn.dataset.toggle;

  if(wasPressed && action === 'add' || action === 'remove'){
    removeProductFromCart(productId);
  } else {
    addProductToCart(productId);
  }
}

const attachToggleListener = (btn) => {
  btn.addEventListener('click', (e) => pressToggle(btn));
}

toggleBtns.forEach(attachToggleListener);// cart toggle
