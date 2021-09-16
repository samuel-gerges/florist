if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', run);
}
else {
    run();
}

function run() {
    if (sessionStorage.getItem('products') != null) {
        document.getElementById('cart-content').innerHTML = `
        <div id="cart-header">
                <span class="column" id="column1">Produit</span>
                <span class="column" id="column2">Quantité</span>
                <span class="column" id="column3">Prix</span>
            </div>

            <div class="products-descr">
                
            </div>`;

        document.getElementById('body').innerHTML += `
        <div class="prix_total">Prix total : <span id="total-price"></span>€</div>
        <br>
        <div class="commander"><a href="achat">Commander</a></div>`;
    }
    else {
        document.getElementById('cart-content').innerHTML = `
        <p>Votre panier est vide!</p>`
        var cmdBtn = document.getElementsByClassName('commander')[0];
    }


    addToCartFile();
    document.getElementsByClassName('commander')[0].addEventListener('click', function () {
        addCommandToLocalStorage();
        sessionStorage.removeItem('products');
    });

    var remBtn = document.getElementsByClassName('remove_button');
    for (let i = 0; i < remBtn.length; i++) {
        var btni = remBtn[i];
        btni.addEventListener('click', removeProd);
    }
}

function addCommandToLocalStorage() {
    var cartProducts = JSON.parse(sessionStorage.getItem('products'));
    var commandProducts = JSON.parse(localStorage.getItem('commandes'));

    if (commandProducts != null) {
        commandProducts.push(cartProducts);
        localStorage.setItem("commandes", JSON.stringify(commandProducts));
    }
    else {
        var cartProducts2 = [cartProducts];
        localStorage.setItem("commandes", JSON.stringify(cartProducts2));
    }
}

function addToCartFile() {
    var cartProducts = JSON.parse(sessionStorage.getItem('products'));
    var products = document.querySelector('.products-descr');
    if ((cartProducts && products)) {
        products.innerHTML = ``;
        Object.values(cartProducts).map(product => {
            products.innerHTML += `
            <div class="product">
            <div class="product-id" style="display: none;">
                ${product.id}
            </div>
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
                <div class="button">
                    <button class="remove_button" type="button">
                        Supprimer
                    </button>
                </div>
            </div>
            `;
            if(document.getElementById("total-price").innerHTML != "") {
                document.getElementById("total-price").innerHTML = parseFloat(document.getElementById("total-price").innerHTML) + parseFloat(product.price);
            }
            else {
                document.getElementById("total-price").innerHTML = parseFloat(product.price);
            }
        });
    }
}

function removeProd(e) {
    var terminerBtn = e.target.parentElement.parentElement;
    var idProd = parseInt(terminerBtn.getElementsByClassName('product-id')[0].innerHTML);

    var cartProducts = JSON.parse(sessionStorage.getItem('products'));
    Object.values(cartProducts).map(product => {
        if (product.id == idProd) {
            delete cartProducts[product.name];
        }
    });
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    document.location.reload();
}