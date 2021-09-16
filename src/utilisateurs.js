if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', run);
}
else {
    run();
}

function run() {
    var buttonsCart = document.getElementsByClassName('add_to_cart');
    for (let i = 0; i < buttonsCart.length; i++) {
        buttonsCart[i].addEventListener('click', addToCart);
    }

    var plusCustom = document.getElementsByClassName('plus2');
    var minusCustom = document.getElementsByClassName('minus2');

    for (let i = 0; i < plusCustom.length; i++) {
        plusCustom[i].addEventListener('click', plusCustomCart);
        minusCustom[i].addEventListener('click', minusCustomCart);
    }

    var addToCartCustomButton = document.getElementsByClassName('add_to_cart2');
    addToCartCustomButton[0].addEventListener('click', addToCartCustom);

    var pr = document.getElementsByClassName('price-range')[0];
    pr.addEventListener('input', updateRange);

    var bouquetsBasiques = document.getElementById("bouquets_basiques");
    bouquetsBasiques.addEventListener('click', function () {
        var custom = document.getElementById("custom");
        var bouquets = document.getElementsByClassName("bouquets")[0];
        custom.style.display = 'none';
        bouquets.style.display = '';
    });

    var bouquetsCustom = document.getElementById("bouquets_custom");
    bouquetsCustom.addEventListener('click', function () {
        var bouquets = document.getElementsByClassName("bouquets")[0];
        var custom = document.getElementById("custom");
        bouquets.style.display = 'none';
        custom.style.display = 'inherit';
    });

    $('.bouquet_img').hover(
        function () {
            $(this).animate({ width: '+=100', height: '+=100' });
        },
        function () {
            $(this).animate({ width: '-=100', height: '-=100' });
        }
    );

}

function updateRange() {
    var priceRange = parseInt(document.getElementById('range-p').value);
    document.getElementById('price-range-number').innerHTML = priceRange;

    var bouquets = document.getElementsByClassName('bouquet');

    var prices = document.getElementsByClassName('bouquet_price_s');
    for (let i = 0; i < bouquets.length; i++) {
        if (parseInt(prices[i].innerHTML) > priceRange) {
            prices[i].parentElement.parentElement.style.display = 'none';
        }
        else {
            prices[i].parentElement.parentElement.style.display = 'inline-block';
        }
    }
}

class Product {
    constructor(id, user, name, price, img, quantity, status) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quantity = quantity;
        this.status = status;
    }
}

function addToCartCustom() {
    var lastId2 = 0;
    var cartProducts2 = JSON.parse(sessionStorage.getItem('products'));
    if (cartProducts2 != null) {
        Object.values(cartProducts2).map(product => {
            lastId2 = product.id;
        });
    }

    var imgCustom = "images/bouquet-perso.png";
    var priceCustom = document.getElementById("prix-total-custom").innerText;
    var user = document.getElementById("user-name").innerHTML

    if (priceCustom != "0") {
        var prod = new Product(lastId2 + 1, user, "Bouquet personnalisé", priceCustom, imgCustom, 1, "En préparation...");
        resetCustom();
        addToSessionStorage(prod);
    }
}

function addToCart(e) {
    var lastId = 0;
    var cartProducts = JSON.parse(sessionStorage.getItem('products'));
    if (cartProducts != null) {
        Object.values(cartProducts).map(product => {
            lastId = product.id;
        });
    }

    var product = e.target.parentElement.parentElement
    var img = product.getElementsByClassName('bouquet_img')[0].src
    var price = product.getElementsByClassName('bouquet_price')[0].innerText
    var name = product.getElementsByClassName('bouquet_descr')[0].innerText
    var user = document.getElementById("user-name").innerHTML
    var pr = new Product(lastId + 1, user, name, price, img, 1, "Disponible");
    addToSessionStorage(pr);
}

function addToSessionStorage(product) {
    var cartProducts = JSON.parse(sessionStorage.getItem('products'));

    if (cartProducts != null) {
        if (cartProducts[product.name] == undefined) {
            cartProducts = {
                ...cartProducts,
                [product.name]: product
            }
        }
        else {
            cartProducts[product.name].quantity += 1;
        }
    }
    else {
        product.quantity = 1;
        cartProducts = {
            [product.name]: product
        }
    }
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
}

function plusCustomCart(t) {
    var productPrice = parseFloat(t.target.parentElement.getElementsByClassName('price')[0].innerHTML);
    var productQuan = parseFloat(t.target.parentElement.getElementsByClassName('quan')[0].innerHTML);

    t.target.parentElement.getElementsByClassName('quan')[0].innerHTML = productQuan + 1;
    document.getElementById("prix-total-custom").innerHTML = parseFloat(document.getElementById("prix-total-custom").innerHTML) + productPrice;
}

function minusCustomCart(t) {
    var productPrice = parseFloat(t.target.parentElement.getElementsByClassName('price')[0].innerHTML);
    var productQuan = parseFloat(t.target.parentElement.getElementsByClassName('quan')[0].innerHTML);

    if (productQuan >= 1) {
        t.target.parentElement.getElementsByClassName('quan')[0].innerHTML = productQuan - 1;
    }
    if ((productPrice <= document.getElementById("prix-total-custom").innerHTML) && productQuan >= 1) {
        document.getElementById("prix-total-custom").innerHTML = parseFloat(document.getElementById("prix-total-custom").innerHTML) - productPrice;

    }
}

function resetCustom() {
    var productQuan = document.getElementsByClassName('quan');
    var productPrice = document.getElementById("prix-total-custom");

    for (let i = 0; i < productQuan.length; i++) {
        productQuan[i].innerHTML = `0`;
    }
    productPrice.innerHTML = `0`;
}