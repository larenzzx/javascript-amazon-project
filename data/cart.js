const removeTimeout = {};

export const cart = [];

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
}
