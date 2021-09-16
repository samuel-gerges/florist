if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', run);
}
else {
    run();
}

function run() {
    addToCommandesFile();
}

function addToCommandesFile() {
    var commandProducts = JSON.parse(localStorage.getItem('commandes'));
    var products = document.querySelector('.products-descr-commandes');
    var term = true;
    var notHisCmd = true;
    if ((commandProducts && products)) {
        products.innerHTML = `
            <div class="products-descr-commandes-terminees">
                <p>Commandes terminées</p>
            </div>
            <div class="products-descr-commandes-encours">
                <p>Commandes en cours</p>
            </div>`;
        for (let i = 0; i < commandProducts.length; i++) {
            Object.values(commandProducts[i]).map(product => {
                if (product.status == 'En préparation...') term = false;
                if (product.user == document.getElementById("user-name").innerHTML) {
                    notHisCmd = false;
                }
                else {
                    notHisCmd = true;
                }
            });
            if (!notHisCmd) {
                if (term) {
                    products.getElementsByClassName("products-descr-commandes-terminees")[0].innerHTML += `
                        <div style="border-bottom: 1px solid rgb(180, 29, 29);">
                        Commande ${i + 1}
                    `;
                    Object.values(commandProducts[i]).map(product => {
                        products.getElementsByClassName("products-descr-commandes-terminees")[0].innerHTML += `
                            <div class="product">
                                <div class="product-img">
                                    <span><img src=${product.img} style="width: 100px; height: 100px;" class="product_img"></span>
                                </div>
                                <div class="product-descr">
                                    <span>${product.name}</span>
                                </div>
                                <div class="product-quantity">
                                    <span>${product.quantity}</span>
                                </div>
                                <div class="product-price">
                                    <span>${product.price}</span>
                                </div>
                                <div class="product-status">
                                    <span>${product.status}</span>
                                </div>
                            </div>
                            </div>
                        `;
                    });
                }
                else {
                    products.getElementsByClassName("products-descr-commandes-encours")[0].innerHTML += `
                        <div style="border-bottom: 1px solid rgb(180, 29, 29);">
                        Commande ${i + 1}
                    `;
                    Object.values(commandProducts[i]).map(product => {
                        products.getElementsByClassName("products-descr-commandes-encours")[0].innerHTML += `
                            <div class="product">
                                <div class="product-img">
                                    <span><img src=${product.img} style="width: 100px; height: 100px;" class="product_img"></span>
                                </div>
                                <div class="product-descr">
                                    <span>${product.name}</span>
                                </div>
                                <div class="product-quantity">
                                    <span>${product.quantity}</span>
                                </div>
                                <div class="product-price">
                                    <span>${product.price}</span>
                                </div>
                                <div class="product-status">
                                    <span>${product.status}</span>
                                </div>
                                </div>
                                </div>
                                `;
                    });
                }
            }
        }
    }
}