// ========================================
// CLOUD DISTRICT HOMEPAGE
// ========================================


// ========================================
// FEATURED PRODUCTS
// ========================================

const featuredContainer =
    document.getElementById("featured-products");


function displayFeaturedProducts() {

    if (!featuredContainer) {
        return;
    }


    // ========================================
    // FEATURED PRODUCT SELECTION
    // ========================================

    const featuredSelections = [

        {
            brand: "Lost Mary",
            name: "BM5000",
            originalPrice: 70,
            price: 65
        },

        {
            brand: "Vaporesso",
            name: "XROS 4 KIT",
            originalPrice: 80,
            price: 75
        },

        {
            brand: "OXVA",
            name: "XLIM GO",
            subtitle: "1.2 ohms",
            originalPrice: 45,
            price: 40
        },

        {
            brand: "Dry Herbs",
            name: "Might + Medic"
        },

        {
            brand: "HQD",
            name: "HQD Maxx 25000"
        },

        {
            brand: "Alibarbar",
            name: "Alibabar Ingot 9000",
            originalPrice: 55,
            price: 50
        },

        {
            brand: "IGET",
            name: "IGET BAR 3500",
            originalPrice: 45,
            price: 40
        },

        {
            brand: "RELX",
            name: "Relx Artisan"
        }

    ];


    const featuredProducts = [];


    // ========================================
    // FIND THE PRODUCTS
    // ========================================

    featuredSelections.forEach(selection => {

        const product =
            products.find(item =>
                String(item.brand).toLowerCase() ===
                String(selection.brand).toLowerCase()
            );


        if (product) {

            featuredProducts.push({
                ...product,

                featuredName:
                    selection.name,

                featuredSubtitle:
                    selection.subtitle || "",

                featuredOriginalPrice:
                    selection.originalPrice !== undefined
                        ? selection.originalPrice
                        : product.originalPrice,

                featuredPrice:
                    selection.price !== undefined
                        ? selection.price
                        : product.price
            });

        }

    });


    // ========================================
    // CREATE FEATURED PRODUCT CARDS
    // ========================================

    let html = "";


    featuredProducts.forEach(product => {

        const isSale =
            Number(product.featuredPrice) <
            Number(product.featuredOriginalPrice);


        html += `

            <div class="featured-card">


                ${
                    isSale
                        ? `
                            <span class="featured-sale-badge">
                                SALE
                            </span>
                          `
                        : ""
                }


                <a
                    href="product.html?id=${product.id}"
                    class="featured-image"
                >

                    <img
                        src="${product.images[0]}"
                        alt="${product.featuredName}"
                    >

                </a>


                <div class="featured-info">


                    <p class="featured-brand">
                        ${product.brand}
                    </p>


                    <h3 class="featured-name">
                        ${product.featuredName}
                    </h3>


                    ${
                        product.featuredSubtitle
                            ? `
                                <p class="featured-subtitle">
                                    ${product.featuredSubtitle}
                                </p>
                              `
                            : ""
                    }


                    <div class="featured-price">


                        ${
                            isSale
                                ? `
                                    <span class="featured-old-price">
                                        $${Number(
                                            product.featuredOriginalPrice
                                        ).toFixed(2)}
                                    </span>
                                  `
                                : ""
                        }


                        <span class="featured-sale-price">

                            $${Number(
                                product.featuredPrice
                            ).toFixed(2)}

                        </span>


                    </div>


                    <a
                        href="product.html?id=${product.id}"
                        class="featured-view-button"
                    >
                        VIEW PRODUCT
                    </a>


                </div>


            </div>

        `;

    });


    featuredContainer.innerHTML =
        html;

}


// ========================================
// LATEST PRODUCTS
// ========================================

const latestContainer =
    document.getElementById("latest-products");


function displayLatestProducts() {

    if (!latestContainer) {
        return;
    }


    /*
        Latest products are the newest products
        in products.js.

        The last 8 products are displayed.
    */

    const latestProducts =
        products
            .slice(-8)
            .reverse();


    let html = "";


    latestProducts.forEach(
        product => {


            const isSale =
                Number(product.price) <
                Number(product.originalPrice);


            html += `

                <div class="latest-card">


                    <div class="latest-image">


                        ${
                            isSale
                                ? `
                                    <span class="latest-sale-badge">
                                        SALE
                                    </span>
                                  `
                                : ""
                        }


                        <a
                            href="product.html?id=${product.id}"
                        >

                            <img
                                src="${product.images[0]}"
                                alt="${product.name}"
                            >

                        </a>


                    </div>


                    <div class="latest-info">


                        <p class="latest-brand">
                            ${product.brand}
                        </p>


                        <h3 class="latest-name">
                            ${product.name}
                        </h3>


                        <div class="latest-price">


                            ${
                                isSale
                                    ? `
                                        <span class="latest-old-price">
                                            $${Number(
                                                product.originalPrice
                                            ).toFixed(2)}
                                        </span>
                                      `
                                    : ""
                            }


                            <span class="latest-sale-price">

                                $${Number(
                                    product.price
                                ).toFixed(2)}

                            </span>


                        </div>


                        <a
                            href="product.html?id=${product.id}"
                            class="latest-view-button"
                        >
                            VIEW PRODUCT
                        </a>


                    </div>


                </div>

            `;

        }
    );


    latestContainer.innerHTML =
        html;

}


// ========================================
// RUN HOMEPAGE FUNCTIONS
// ========================================

displayFeaturedProducts();

displayLatestProducts();