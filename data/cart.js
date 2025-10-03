const removeTimeout = {};

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// cart = [
//   {
//     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     quantity: 2,
//   },
//   {
//     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//     quantity: 1,
//   },
// ];

export function addToCart(productId) {
  const selectElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const selectedQuantity = Number(selectElement.value);
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
    });
  }

  const added = document.querySelector(`.js-added-cart-${productId}`);
  added.classList.add("added");
  clearTimeout(removeTimeout[productId]);

  removeTimeout[productId] = setTimeout(() => {
    added.classList.remove("added");
  }, 2000);

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  console.log(newCart);

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  console.log(cartQuantity);

  return cartQuantity;
}
