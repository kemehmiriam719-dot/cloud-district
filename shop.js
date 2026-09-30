const productsGrid =
    document.getElementById("products-grid");

const filterLinks =
    document.querySelectorAll(
        ".shop-sidebar a[data-filter-type], " +
        ".shop-sidebar a[data-filter-brand]"
    );


// ========================================
// CART STORAGE KEY
// ========================================

const CART_KEY = "cloudDistrictCart";


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(productList) {

    if (!productsGrid) {
        console.error("products-grid was not found.");
        return;
    }

    productsGrid.innerHTML = "";

    // ========================================
    // NO PRODUCTS
    // ========================================

    if (productList.length === 0) {

        productsGrid.innerHTML = `
            <div class="no-products">
                <h2>No products found</h2>

                <p>
                    We are currently updating
                    this collection.
                </p>
            </div>
        `;

        return;
    }


    // ========================================
    // CREATE PRODUCT CARDS
    // ========================================

    productList.forEach(product => {

        const productCard =
            document.createElement("article");

        productCard.className =
            "product-card";


        productCard.innerHTML = `

            <div class="product-card-image">

                <a
                    href="product.html?id=${product.id}"
                >

                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                    >

                </a>

            </div>


            <div class="product-card-brand">
                ${product.brand}
            </div>


            <h2>
                ${product.name}
            </h2>


            <!-- ========================================
                 PRODUCT PRICE
            ========================================= -->

            <div class="product-card-price">

                <span class="product-card-original-price">
                    $${Number(
                        product.originalPrice
                    ).toFixed(2)}
                </span>

                <span class="product-card-sale-price">
                    $${Number(
                        product.price
                    ).toFixed(2)}
                </span>

            </div>


            <!-- ========================================
                 ADD TO CART
            ========================================= -->

            <button
                type="button"
                class="add-to-cart-shop"
                data-product-id="${product.id}"
            >
                ADD TO CART
            </button>

        `;

        productsGrid.appendChild(productCard);

    });


    // ========================================
    // ADD TO CART BUTTONS
    // ========================================

    const addToCartButtons =
        document.querySelectorAll(
            ".add-to-cart-shop"
        );

    addToCartButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        this.dataset.productId
                    );

                const product =
                    products.find(
                        item =>
                            Number(item.id) ===
                            productId
                    );

                if (!product) {

                    console.error(
                        "Product not found:",
                        productId
                    );

                    return;
                }

                addProductToCart(
                    product,
                    this
                );

            }
        );

    });

}


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addProductToCart(
    product,
    button
) {

    let cart =
        JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];


    const existingProduct =
        cart.find(
            item =>
                Number(item.id) ===
                Number(product.id)
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity || 1
            ) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            brand: product.brand,

            price: product.price,

            originalPrice:
                product.originalPrice,

            image:
                product.images[0],

            quantity: 1

        });

    }


    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );


    button.textContent =
        "ADDED TO CART";

    button.classList.add(
        "added"
    );


    setTimeout(() => {

        button.textContent =
            "ADD TO CART";

        button.classList.remove(
            "added"
        );

    }, 1500);


    updateCartCount();

}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];


    const cartCount =
        document.querySelector(
            ".cart-count"
        );


    if (!cartCount) {
        return;
    }


    const totalItems =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantity || 1
                    );

            },
            0
        );


    cartCount.textContent =
        totalItems;

}


// ========================================
// FILTER PRODUCTS
// ========================================

function filterProducts(
    type,
    value
) {

    let filteredProducts = [];


    if (type === "brand") {

        filteredProducts =
            products.filter(
                product =>

                    String(
                        product.brand
                    ).toLowerCase() ===

                    String(
                        value
                    ).toLowerCase()
            );

    }

    else if (type === "type") {

        filteredProducts =
            products.filter(
                product =>

                    String(
                        product.type
                    ).toLowerCase() ===

                    String(
                        value
                    ).toLowerCase()
            );

    }


    displayProducts(
        filteredProducts
    );

}


// ========================================
// SIDEBAR FILTERS
// ========================================

filterLinks.forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const brand =
                this.dataset.filterBrand;

            const type =
                this.dataset.filterType;


            if (brand) {

                filterProducts(
                    "brand",
                    brand
                );

            }

            else if (type) {

                filterProducts(
                    "type",
                    type
                );

            }

        }
    );

});


// ========================================
// READ URL PARAMETERS
// ========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const selectedBrand =
    urlParams.get("brand");


const selectedType =
    urlParams.get("type");


const selectedSort =
    urlParams.get("sort");


// ========================================
// NEW ARRIVALS
// ========================================

if (selectedSort === "latest") {

    /*
        The newest products are treated as the
        products appearing last in products.js.

        Reverse them so the newest appear first.
    */

    const latestProducts =
        [...products]
            .reverse();


    displayProducts(
        latestProducts
    );

}


// ========================================
// BRAND FILTER
// ========================================

else if (selectedBrand) {

    filterProducts(
        "brand",
        selectedBrand
    );

}


// ========================================
// TYPE FILTER
// ========================================

else if (selectedType) {

    filterProducts(
        "type",
        selectedType
    );

}


// ========================================
// DEFAULT SHOP
// ========================================

else {

    displayProducts(
        products
    );

}


// ========================================
// INITIAL CART COUNT
// ========================================

updateCartCount();