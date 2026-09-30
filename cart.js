const cartContent =
    document.getElementById("cart-content");


/* ========================================
   CART SETTINGS
======================================== */

const CART_KEY = "cloudDistrictCart";


// Minimum order amount
const MINIMUM_ORDER = 200;


// Cloud District WhatsApp number
// Keep this for the later WhatsApp step.
const WHATSAPP_NUMBER = "61468107575";


/* ========================================
   GET CART
======================================== */

function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

}


/* ========================================
   SAVE CART
======================================== */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* ========================================
   DISPLAY CART
======================================== */

function displayCart() {

    const cart = getCart();


    console.log(
        "Cloud District cart:",
        cart
    );


    /* ========================================
       UPDATE HEADER CART COUNT
    ======================================== */

    const cartCount =
        document.querySelector(".cart-count");


    if (cartCount) {

        const totalItems =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.quantity || 0
                    ),
                0
            );


        cartCount.textContent =
            totalItems;

    }


    /* ========================================
       EMPTY CART
    ======================================== */

    if (cart.length === 0) {

        cartContent.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    You haven't added any
                    products yet.
                </p>

                <a
                    href="shop.html"
                    class="continue-shopping"
                >
                    CONTINUE SHOPPING
                </a>

            </div>

        `;

        return;

    }


    /* ========================================
       CART TABLE
    ======================================== */

    let html = `

        <div class="cart-table">


            <!-- TABLE HEADER -->

            <div class="cart-table-header">

                <div class="cart-header-product">
                    Product
                </div>

                <div class="cart-header-price">
                    Price
                </div>

                <div class="cart-header-quantity">
                    Quantity
                </div>

                <div class="cart-header-subtotal">
                    Subtotal
                </div>

            </div>

    `;


    let total = 0;


    /* ========================================
       CART PRODUCTS
    ======================================== */

    cart.forEach(
        (item, index) => {

            const price =
                Number(
                    item.price || 0
                );


            const quantity =
                Number(
                    item.quantity || 1
                );


            const originalPrice =
                Number(
                    item.originalPrice || 0
                );


            const itemTotal =
                price * quantity;


            total += itemTotal;


            const image =
                item.image ||
                "images/product/vape14.jpeg";


            html += `

                <div class="cart-item">


                    <!-- PRODUCT -->

                    <div class="cart-product-column">


                        <div class="cart-remove-column">

                            <button
                                class="remove-item"
                                onclick="removeItem(${index})"
                                aria-label="Remove ${item.name}"
                            >
                                ×
                            </button>

                        </div>


                        <div class="cart-item-image">

                            <img
                                src="${image}"
                                alt="${item.name}"
                            >

                        </div>


                        <div class="cart-item-details">

                            <p class="cart-item-brand">
                                ${item.brand || ""}
                            </p>


                            <h2>
                                ${item.name}
                            </h2>


                            <p class="cart-item-flavour">

                                Flavour:

                                <strong>
                                    ${
                                        item.flavour ||
                                        "Not selected"
                                    }
                                </strong>

                            </p>


                            <p class="cart-item-price">

                                <span class="cart-old-price">
                                    $${originalPrice.toFixed(2)}
                                </span>

                                <span class="cart-sale-price">
                                    $${price.toFixed(2)}
                                </span>

                            </p>

                        </div>

                    </div>


                    <!-- PRICE -->

                    <div class="cart-price-column">

                        $${price.toFixed(2)}

                    </div>


                    <!-- QUANTITY -->

                    <div>

                        <div class="cart-quantity">

                            <button
                                type="button"
                                onclick="decreaseQuantity(${index})"
                            >
                                −
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                onclick="increaseQuantity(${index})"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <!-- SUBTOTAL -->

                    <div class="cart-subtotal-column">

                        $${itemTotal.toFixed(2)}

                    </div>


                </div>

            `;

        }
    );


    html += `

        </div>

    `;


    /* ========================================
       ORIGINAL TOTAL
    ======================================== */

    const originalTotal =
        calculateOriginalTotal(cart);


    /* ========================================
       MINIMUM ORDER CHECK
    ======================================== */

    const minimumOrderReached =
        total >= MINIMUM_ORDER;


    const remainingAmount =
        Math.max(
            MINIMUM_ORDER - total,
            0
        );


/* ========================================
   CART SUMMARY + SHIPPING
======================================== */

const shippingCost = 20;

html += `

    <div class="cart-summary">

        <h2 class="cart-summary-title">
            Cart totals
        </h2>


        <!-- SUBTOTAL -->

        <div class="cart-summary-row">

            <span>
                Subtotal
            </span>

            <strong>
                $${total.toFixed(2)}
            </strong>

        </div>


        <!-- SHIPPING -->

        <div class="cart-shipping">

            <div class="cart-summary-label">
                Shipment
            </div>


            <div class="shipping-options">

                <!-- EXPEDITED -->

                <label class="shipping-option">

                    <input
                        type="radio"
                        name="shipping-method"
                        value="20"
                        checked
                        onchange="updateShipping(20)"
                    >

                    <span class="shipping-option-content">

                        <span>
                            Expedited<br>
                            Shipping (2 DAYS):
                        </span>

                        <strong>
                            $20.00
                        </strong>

                    </span>

                </label>


                <!-- TOP PRIORITY -->

                <label class="shipping-option">

                    <input
                        type="radio"
                        name="shipping-method"
                        value="50"
                        onchange="updateShipping(50)"
                    >

                    <span class="shipping-option-content">

                        <span>
                            Top Priority
                            [Same day delivery]:
                        </span>

                        <strong>
                            $50.00
                        </strong>

                    </span>

                </label>


                <!-- SHIPPING ADDRESS -->

                <div class="shipping-address">

                    <p>
                        Shipping to
                        <strong>South Australia</strong>.
                    </p>

                    <a
                        href="#"
                        onclick="changeShippingAddress(event)"
                    >
                        Change address
                    </a>

                </div>

            </div>

        </div>


        <!-- TOTAL -->

        <div class="cart-final-total">

            <span>
                Total
            </span>

            <strong id="cart-final-total-value">
                $${(total + shippingCost).toFixed(2)}
            </strong>

        </div>
`;



/* ========================================
   MINIMUM ORDER
======================================== */

if (!minimumOrderReached) {

    html += `

        <div class="minimum-order-message">

            <strong>
                Minimum order: $${MINIMUM_ORDER.toFixed(2)}
            </strong>

            <p>
                Please add
                $${remainingAmount.toFixed(2)}
                more to your cart to place your order.
            </p>

        </div>


        <button
            type="button"
            class="order-now-button disabled"
            disabled
        >
            MINIMUM ORDER $200
        </button>

    `;

} else {

    html += `

        <button
            type="button"
            class="order-now-button"
            onclick="proceedToCheckout()"
        >
            PROCEED TO CHECKOUT
        </button>

    `;

}


html += `

    </div>

`;


   

    /* ========================================
       DISPLAY
    ======================================== */

    cartContent.innerHTML = html;

}


/* ========================================
   CALCULATE ORIGINAL TOTAL
======================================== */

function calculateOriginalTotal(cart) {

    return cart.reduce(
        (total, item) => {

            const originalPrice =
                Number(
                    item.originalPrice || 0
                );


            const quantity =
                Number(
                    item.quantity || 1
                );


            return total +
                originalPrice * quantity;

        },
        0
    );

}


/* ========================================
   INCREASE QUANTITY
======================================== */

function increaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(
            cart[index].quantity || 1
        ) + 1;


    saveCart(cart);


    displayCart();

}


/* ========================================
   DECREASE QUANTITY
======================================== */

function decreaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    const quantity =
        Number(
            cart[index].quantity || 1
        );


    if (quantity > 1) {

        cart[index].quantity =
            quantity - 1;

    }


    saveCart(cart);


    displayCart();

}


/* ========================================
   REMOVE ITEM
======================================== */

function removeItem(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart(cart);


    displayCart();

}


/* ========================================
   UPDATE SHIPPING
======================================== */

function updateShipping(shippingCost) {

    const cart = getCart();

    const subtotal =
        cart.reduce(
            (sum, item) => {

                return sum +
                    Number(item.price || 0) *
                    Number(item.quantity || 1);

            },
            0
        );


    const finalTotal =
        subtotal + Number(shippingCost);


    const totalElement =
        document.getElementById(
            "cart-final-total-value"
        );


    if (totalElement) {

        totalElement.textContent =
            `$${finalTotal.toFixed(2)}`;

    }

}


/* ========================================
   CHANGE SHIPPING ADDRESS
======================================== */

function changeShippingAddress(event) {

    event.preventDefault();

    alert(
        "Shipping address selection will be added next."
    );

}

/* ========================================
   PROCEED TO CHECKOUT
======================================== */

function proceedToCheckout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const total = cart.reduce(
        (sum, item) => {

            return sum +
                Number(item.price || 0) *
                Number(item.quantity || 1);

        },
        0
    );


    if (total < MINIMUM_ORDER) {

        const remaining =
            MINIMUM_ORDER - total;

        alert(
            `Minimum order is $${MINIMUM_ORDER.toFixed(2)}. ` +
            `Please add $${remaining.toFixed(2)} more to your cart.`
        );

        return;

    }


    window.location.href = "checkout.html";

}

/* ========================================
   ORDER ON WHATSAPP
   DO NOT CHANGE YET
======================================== */

function orderOnWhatsApp() {

    const cart = getCart();


    /* ========================================
       CHECK EMPTY CART
    ======================================== */

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    /* ========================================
       CALCULATE TOTAL
    ======================================== */

    const total =
        cart.reduce(
            (sum, item) => {

                return sum +
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 1
                    );

            },
            0
        );


    /* ========================================
       MINIMUM ORDER CHECK
    ======================================== */

    if (total < MINIMUM_ORDER) {

        const remaining =
            MINIMUM_ORDER - total;


        alert(
            `Minimum order is $${MINIMUM_ORDER.toFixed(2)}. ` +
            `Please add $${remaining.toFixed(2)} more to your cart.`
        );

        return;

    }


    /* ========================================
       CREATE WHATSAPP MESSAGE
    ======================================== */

    let message =
        "Hello Cloud District!\n\n" +
        "I would like to place an order:\n\n";


    cart.forEach(
        (item, index) => {

            const price =
                Number(
                    item.price || 0
                );


            const quantity =
                Number(
                    item.quantity || 1
                );


            const itemTotal =
                price * quantity;


            message +=
                `${index + 1}. ${item.name}\n` +
                `Brand: ${item.brand || ""}\n` +
                `Flavour: ${
                    item.flavour ||
                    "Not selected"
                }\n` +
                `Quantity: ${quantity}\n` +
                `Price: $${price.toFixed(2)}\n` +
                `Item Total: $${itemTotal.toFixed(2)}\n\n`;

        }
    );


    /* ========================================
       ADD TOTAL
    ======================================== */

    message +=
        `Total: $${total.toFixed(2)}\n\n` +
        "Thank you!";


    /* ========================================
       CREATE WHATSAPP URL
    ======================================== */

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(message)}`;


    /* ========================================
       OPEN WHATSAPP
    ======================================== */

    window.open(
        whatsappURL,
        "_blank"
    );

}


/* ========================================
   DISPLAY CART ON PAGE LOAD
======================================== */

displayCart();