import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = ''; /* By initializing productsHTML as an empty string, you set up a base to which you can append HTML content later in the code. It acts as a container that will eventually hold the complete HTML structure for all the products. */

/* the role of the product parameter:  For each iteration, the current product object is passed to the callback function as the product parameter. This allows you to access the properties of the current product, such as image, name, rating, and priceCents. */
products.forEach((product) => {

  /* productsHTML= productsHTML + '' */

  productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>
  
            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>
    `;

});

document.querySelector('.js-products-grid').
  innerHTML = productsHTML;

  function updateCartQuantity (){
  let cartQuantity = 0; /*  This variable is declared and initialized to the value `0`.
  It likely keeps track of the number of items*/
 cart.forEach((cartItem) => {
   cartQuantity += cartItem.quantity;
   document.querySelector('.js-cart-quantity')/* to add the cartQuantity on the web page */
   .innerHTML = cartQuantity;

 });
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; /* the productID gets converted from kebab-case to camelCase */
      addToCart (productId);
      updateCartQuantity ();


    })
  });