const CART_KEY = "cloudDistrictCart";

const MINIMUM_ORDER = 200;


/* =========================================
   GET CART
========================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

}


/* =========================================
   DISPLAY CART
========================================= */

function displayCheckout() {

    const cart = getCart();

    const productsContainer =
        document.getElementById(
            "checkout-products"
        );

    const subtotalElement =
        document.getElementById(
            "checkout-subtotal"
        );

    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    /* =================================
       EMPTY CART
    ================================= */

    if (cart.length === 0) {

        window.location.href =
            "shop.html";

        return;
    }


    let subtotal = 0;

    let html = "";


    /* =================================
       DISPLAY PRODUCTS
    ================================= */

    cart.forEach(item => {

        const price =
            Number(item.price || 0);

        const quantity =
            Number(item.quantity || 1);

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        html += `

            <div class="checkout-product">

                <div class="checkout-product-name">

                    ${item.name}

                    <strong>
                        × ${quantity}
                    </strong>

                </div>

                <div class="checkout-product-price">

                    $${itemTotal.toFixed(2)}

                </div>

            </div>

        `;

    });


    productsContainer.innerHTML = html;


    subtotalElement.textContent =
        `$${subtotal.toFixed(2)}`;


    updateCheckoutTotal(subtotal);

}


/* =========================================
   UPDATE TOTAL
========================================= */

function updateCheckoutTotal(subtotal) {

    const selectedShipping =
        document.querySelector(
            'input[name="checkout-shipping"]:checked'
        );


    const shipping =
        selectedShipping
            ? Number(selectedShipping.value)
            : 20;


    const total =
        subtotal + shipping;


    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    totalElement.textContent =
        `$${total.toFixed(2)}`;

}


/* =========================================
   SHIPPING CHANGE
========================================= */

document
    .querySelectorAll(
        'input[name="checkout-shipping"]'
    )
    .forEach(radio => {

        radio.addEventListener(
            "change",
            () => {

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


                updateCheckoutTotal(
                    subtotal
                );

            }
        );

    });


/* =========================================
   PLACE ORDER
   → SAVE ORDER
   → OPEN LINKTREE
========================================= */

document
    .getElementById("checkout-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        /* =================================
           GET CART
        ================================= */

        const cart = getCart();


        if (cart.length === 0) {

            alert("Your cart is empty.");

            window.location.href =
                "shop.html";

            return;
        }


        /* =================================
           CALCULATE SUBTOTAL
        ================================= */

        const subtotal = cart.reduce(
            (sum, item) => {

                return sum +
                    Number(item.price || 0) *
                    Number(item.quantity || 1);

            },
            0
        );


        /* =================================
           MINIMUM ORDER
        ================================= */

        if (subtotal < MINIMUM_ORDER) {

            const remaining =
                MINIMUM_ORDER - subtotal;


            alert(
                `Minimum order is $${MINIMUM_ORDER.toFixed(2)}. ` +
                `Please add $${remaining.toFixed(2)} more.`
            );


            window.location.href =
                "cart.html";

            return;
        }


        /* =================================
           CUSTOMER INFORMATION
        ================================= */

        const firstName =
            document.getElementById(
                "first-name"
            ).value.trim();


        const lastName =
            document.getElementById(
                "last-name"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const country =
            document.getElementById(
                "country"
            ).value;


        const street =
            document.getElementById(
                "street"
            ).value.trim();


        const apartment =
            document.getElementById(
                "apartment"
            ).value.trim();


        const city =
            document.getElementById(
                "city"
            ).value.trim();


        const state =
            document.getElementById(
                "state"
            ).value;


        const postcode =
            document.getElementById(
                "postcode"
            ).value.trim();


        const orderNotes =
            document.getElementById(
                "order-notes"
            ).value.trim();


        /* =================================
           SHIPPING
        ================================= */

        const selectedShipping =
            document.querySelector(
                'input[name="checkout-shipping"]:checked'
            );


        const shippingCost =
            selectedShipping
                ? Number(selectedShipping.value)
                : 20;


        const shippingMethod =
            shippingCost === 50
                ? "Top Priority - Same day delivery"
                : "Expedited Shipping - 2 DAYS";


        const total =
            subtotal + shippingCost;


        /* =================================
           SAVE COMPLETE ORDER INFORMATION
        ================================= */

        const checkoutData = {

            customer: {

                firstName,

                lastName,

                phone,

                email

            },


            delivery: {

                country,

                street,

                apartment,

                city,

                state,

                postcode

            },


            products: cart,


            shipping: {

                method: shippingMethod,

                cost: shippingCost

            },


            subtotal,

            total,

            orderNotes,


            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(

            "cloudDistrictCheckout",

            JSON.stringify(
                checkoutData
            )

        );


        /* =================================
           CLOUD DISTRICT LINKTREE
        ================================= */

        const LINKTREE_URL =
            "https://linktr.ee/Vapedeliveryexpress001";


        /* =================================
           OPEN LINKTREE
        ================================= */

    window.location.href = "https://linktr.ee/Vapedeliveryexpress001";

    });


/* =========================================
   DISPLAY CHECKOUT
========================================= */

displayCheckout();