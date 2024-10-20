export const cart = [];

export function addToCart (productId){
    let matchingItem; /* This variable is declared but not initialized (i.e., no value is assigned at the time of declaration).*/
    cart.forEach((cartItem) => {
     if (productId === cartItem.productId) {
       matchingItem = cartItem;
     }
   });
   if (matchingItem) {  /* means that it is a thruthy value */
     matchingItem.quantity += 1;  /* matchingItem = matchingItem + 1 */
   } else {
     cart.push({
       productId: productId,
       quantity: 1
     });
   }
  };