if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', run);
}
else {
    run();
}

function run() {
    addToCommandesToDoFile();
    var terBtn = document.getElementById('terminer-btn');

    if (terBtn != null) {
        terBtn.addEventListener('click', validateCmd);
    }
}

function addToCommandesToDoFile() {
    var commandProducts = JSON.parse(localStorage.getItem('commandes'));
    var products = document.querySelector('.products-descr-employes');
    if ((commandProducts && products)) {
        for (let i = 0; i < commandProducts.length; i++) {
            var userName;
            var toDo = false;
            Object.values(commandProducts[i]).map(product => {
                userName = product.user;
                if (product.status == "En préparation...") {
                    toDo = true;
                }
            });

            if (toDo) {
                document.getElementsByClassName("products-descr-employes")[0].innerHTML += `
                    <div style="border-bottom: 1px solid rgb(180, 29, 29);">
                    Commande ${i + 1} de ${userName}
                `;
                Object.values(commandProducts[i]).map(product => {
                    if (product.status == "En préparation...") {
                        document.getElementsByClassName("products-descr-employes")[0].innerHTML += `
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
                            <div class="product-status">
                                <span id="terminer-btn">Terminer</span>
                            </div>
                        </div>
                        </div>
                    `;
                    }
                });
            }
        }
    }
}

function validateCmd(e) {
    var terminerBtn = e.target.parentElement.parentElement;
    var idProd = parseInt(terminerBtn.getElementsByClassName('product-id')[0].innerHTML);
    var commandProducts = JSON.parse(localStorage.getItem('commandes'));
    for (let i = 0; i < commandProducts.length; i++) {
        Object.values(commandProducts[i]).map(product => {
            if (product.id == idProd) {
                product.status = "Disponible";
            }
        });
    }
    localStorage.setItem("commandes", JSON.stringify(commandProducts));
    document.location.reload();
}
