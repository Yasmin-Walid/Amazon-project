import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../scripts/utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';



/* ../../data/cart.js
'../../data/products.js' */
export function renderOrderSummary (){

    let cartSummaryHTML = '';

    const today = dayjs();
    const deliveryDate = today.add(7, 'days'); /* The add function is in the external library */

    /* const dateString = deliveryDate.format('dddd, MMMM D'); */

    cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const  matchingProduct = getProduct (productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
        const today = dayjs ();
        const deliveryDate = today.add (
            deliveryOption.deliveryDays,
            'days'
        );

        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );


        cartSummaryHTML +=
            `
        <div class= "cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
            </div>
        </div>
    `;
    });


    function deliveryOptionHTML(matchingProduct, cartItem) {

            let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs ();
            const deliveryDate = today.add (
                deliveryOption.deliveryDays,
                'days'
            );

            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            const priceString =
            deliveryOption.priceCents === 0 /* acts as if statement if true then the value after the ? if false then the value after the column */
            ? 'FREE'
            : `$ ${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


    html +=
            `
        <div class="delivery-option js-delivery-option"
        data-product-id  = "${matchingProduct.id}"
        data-delivery-option-id = "${deliveryOption.id}"
        >
            <input type="radio"
            ${ isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-$${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
            ${priceString} - Shipping
            </div>
            </div>
            </div>
            `
        });
        return html;
    }



    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);

                const container = document.querySelector(`.js-cart-item-container-${productId}`);

                container.remove();
            });
        });

        document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {

            const {productId, deliveryOptionId} = element.dataset
            element.addEventListener('click', () => {
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            });

        });
};
renderOrderSummary(); /* update the data to regenerate the html*/