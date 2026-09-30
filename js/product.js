// ========================================
// GET PRODUCT FROM URL
// ========================================

const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get("id")) || 1;


// ========================================
// FIND PRODUCT
// ========================================

const product = products.find(
    item => Number(item.id) === productId
);


if (!product) {

    document.body.innerHTML = `
        <div style="
            padding: 100px 20px;
            text-align: center;
            font-family: Arial, sans-serif;
        ">
            <h2>Product not found.</h2>

            <p>
                The product you are looking for
                could not be found.
            </p>

            <a href="shop.html">
                Return to Shop
            </a>
        </div>
    `;

    throw new Error("Product not found");
}


// ========================================
// PRODUCT VARIABLES
// ========================================

let quantity = 1;

let selectedImage =
    product.images &&
    product.images.length > 0
        ? product.images[0]
        : "";


// Check whether the product actually has
// real flavour choices.

const rawFlavours =
    Array.isArray(product.flavours)
        ? product.flavours
        : [];


const placeholderFlavours = [
    "Various Flavours",
    "Various Options"
];


const realFlavours = rawFlavours.filter(
    flavour =>
        !placeholderFlavours.includes(
            String(flavour).trim()
        )
);


let selectedFlavour =
    realFlavours.length > 0
        ? realFlavours[0]
        : "";


// ========================================
// PRODUCT INFORMATION
// ========================================

const productName =
    document.getElementById("product-name");

const productBrand =
    document.getElementById("product-brand");

const productDescription =
    document.getElementById("product-description");

const oldPrice =
    document.getElementById("old-price");

const productPrice =
    document.getElementById("product-price");


if (productName) {
    productName.textContent = product.name;
}


if (productBrand) {
    productBrand.textContent = product.brand;
}


if (productDescription) {

    // Allows <br> in product descriptions
    // such as the e-liquid descriptions
    // in products.js.

    productDescription.innerHTML =
        product.description || "";
}


if (oldPrice) {

    oldPrice.textContent =
        `$${Number(
            product.originalPrice || product.price
        ).toFixed(2)}`;
}


if (productPrice) {

    productPrice.textContent =
        `$${Number(
            product.price || 0
        ).toFixed(2)}`;
}


// ========================================
// MAIN PRODUCT IMAGE
// ========================================

const mainImage =
    document.getElementById(
        "main-product-image"
    );


if (mainImage && selectedImage) {

    mainImage.src = selectedImage;

    mainImage.alt = product.name;
}


// ========================================
// PRODUCT THUMBNAILS
// ========================================

const thumbnailsContainer =
    document.getElementById(
        "product-thumbnails"
    );


if (
    thumbnailsContainer &&
    Array.isArray(product.images)
) {

    thumbnailsContainer.innerHTML = "";


    product.images.forEach(
        (image, index) => {

            const thumbnail =
                document.createElement("img");


            thumbnail.src = image;

            thumbnail.alt =
                `${product.name} image ${index + 1}`;


            if (index === 0) {

                thumbnail.classList.add(
                    "active"
                );

            }


            thumbnail.addEventListener(
                "click",
                function () {

                    if (mainImage) {

                        mainImage.src = image;

                    }


                    selectedImage = image;


                    document
                        .querySelectorAll(
                            ".product-thumbnails img"
                        )
                        .forEach(
                            img =>
                                img.classList.remove(
                                    "active"
                                )
                        );


                    thumbnail.classList.add(
                        "active"
                    );

                }
            );


            thumbnailsContainer.appendChild(
                thumbnail
            );

        }
    );

}


// ========================================
// FLAVOURS
// ========================================

const flavourContainer =
    document.getElementById(
        "flavour-options"
    );


const flavourSection =
    document.querySelector(
        ".product-options"
    );


if (flavourContainer) {

    flavourContainer.innerHTML = "";

}


// ========================================
// NO REAL FLAVOURS
// ========================================

if (realFlavours.length === 0) {

    // Hide the entire flavour section
    // instead of showing "Various Flavours".

    if (flavourSection) {

        flavourSection.style.display =
            "none";

    }

}


// ========================================
// REAL FLAVOURS AVAILABLE
// ========================================

else {

    if (flavourSection) {

        flavourSection.style.display =
            "block";

    }


    realFlavours.forEach(
        (flavour, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.textContent = flavour;

            button.classList.add(
                "flavour-button"
            );


            if (index === 0) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    selectedFlavour =
                        flavour;


                    document
                        .querySelectorAll(
                            ".flavour-button"
                        )
                        .forEach(
                            btn =>
                                btn.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );

                }
            );


            flavourContainer.appendChild(
                button
            );

        }
    );

}


// ========================================
// QUANTITY
// ========================================

const quantityDisplay =
    document.getElementById(
        "quantity"
    );


const increaseButton =
    document.getElementById(
        "increase-quantity"
    );


const decreaseButton =
    document.getElementById(
        "decrease-quantity"
    );


// ========================================
// INCREASE
// ========================================

if (increaseButton) {

    increaseButton.addEventListener(
        "click",
        function () {

            quantity++;


            if (quantityDisplay) {

                quantityDisplay.textContent =
                    quantity;

            }

        }
    );

}


// ========================================
// DECREASE
// ========================================

if (decreaseButton) {

    decreaseButton.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

            }


            if (quantityDisplay) {

                quantityDisplay.textContent =
                    quantity;

            }

        }
    );

}


// ========================================
// ADD TO CART
// ========================================

const addToCartButton =
    document.getElementById(
        "add-to-cart"
    );


if (addToCartButton) {

    addToCartButton.addEventListener(
        "click",
        function () {

            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "cloudDistrictCart"
                    )
                ) || [];


            // ========================================
            // CHECK FOR EXISTING PRODUCT
            // ========================================

            const existingProduct =
                cart.find(
                    item => {

                        const sameProduct =
                            Number(item.id) ===
                            Number(product.id);


                        const sameFlavour =
                            String(
                                item.flavour || ""
                            ) ===
                            String(
                                selectedFlavour || ""
                            );


                        return (
                            sameProduct &&
                            sameFlavour
                        );

                    }
                );


            // ========================================
            // INCREASE EXISTING PRODUCT
            // ========================================

            if (existingProduct) {

                existingProduct.quantity =
                    Number(
                        existingProduct.quantity || 1
                    ) + quantity;

            }


            // ========================================
            // ADD NEW PRODUCT
            // ========================================

            else {

                cart.push({

                    id:
                        product.id,

                    name:
                        product.name,

                    brand:
                        product.brand,

                    type:
                        product.type,

                    originalPrice:
                        product.originalPrice,

                    price:
                        product.price,

                    currency:
                        product.currency || "USD",

                    image:
                        selectedImage,

                    flavour:
                        selectedFlavour,

                    quantity:
                        quantity

                });

            }


            // ========================================
            // SAVE CART
            // ========================================

            localStorage.setItem(
                "cloudDistrictCart",
                JSON.stringify(cart)
            );


            // ========================================
            // UPDATE CART COUNT
            // ========================================

            updateCartCount();


            // ========================================
            // BUTTON FEEDBACK
            // ========================================

            const originalText =
                addToCartButton.textContent;


            addToCartButton.textContent =
                "ADDED TO CART";


            addToCartButton.classList.add(
                "added"
            );


            setTimeout(
                function () {

                    addToCartButton.textContent =
                        originalText;

                    addToCartButton.classList.remove(
                        "added"
                    );

                },
                1500
            );

        }
    );

}


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "cloudDistrictCart"
            )
        ) || [];


    const count =
        cart.reduce(
            (
                total,
                item
            ) => {

                return total +
                    Number(
                        item.quantity || 1
                    );

            },
            0
        );


    const cartCount =
        document.querySelector(
            ".cart-count"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


// ========================================
// INITIAL CART COUNT
// ========================================

updateCartCount();