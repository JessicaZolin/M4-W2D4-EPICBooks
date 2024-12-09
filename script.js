url = "https://striveschool-api.herokuapp.com/books"

fetch("https://striveschool-api.herokuapp.com/books")
    .then(raw => raw.json())
    .then((response) => {
        let res = response
        console.log(res)
        stampaLibri(response)
    })
    .catch((err) => console.log(err))


// funzione che carica e visualizza tutti i libri nella pagina
const stampaLibri = (res) => {
    // seleziona il container per le card e crea per ogni elemento dell'array una card con l'immagine, il titolo e il prezzo
    let bookContainer = document.getElementById("book-container")
    bookContainer.innerHTML += res.map(element => {
        return `<div class="card col-sm-6 col-lg-3 mb-4" id ="book_${element.asin}">
                    <div class="card h-100">
                        <img src="${element.img}" class="card-img-top" alt="${element.title}" height="450px">
                        <div class="card-body">
                            <h5 class="card-title" style="height: 100px;">${element.title}</h5>
                            <p class="card-text price ps-1">Price: ${element.price.toFixed(2)} €</p>
                            <button type="button" class="btn btn-outline-dark add-to-cart col-12 d-flex justify-content-center align-items-center" onclick="addToCart('${element.img}', '${element.title}', '${element.price}', '${element.asin}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg><span class="ps-2">Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>`
    }).join("");


    // va a richiamare il p contenente il prezzo, va a sostituire il . con la , 
    let price = document.querySelectorAll(".price")
    console.log(price);

    price.forEach(price => {
        price.textContent = price.textContent.replace(".", ",")
    })
}

// funzione per aggiungere un prodotto al carrello
let cart = []
let total = 0
const addToCart = (img, title, price, asin) => {
    // colora il bordo della card se viene aggiunta al carrello
    const book = document.querySelector("#book_" + asin)
    book.style.border = "2px solid red";

    // aggiunge elementi all'array cart se non già presenti per aggiornare numero items carrello
    let existingItem = cart.find(item => item.asin === asin)
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            asin: asin,
            title: title,
            price: (Number(price)).toFixed(2),
            quantity: 1
        })
    }
    updateCartDisplay();

    // crea items nel carrello se viene aggiunto
    let cartItems = document.getElementById("cartItems")
    cartItems.innerHTML += `<li class="list-group-item">
                                <div class="d-flex gap-3">
                                    <img src="${img}" class="col-4 h-50"
                                        alt="...">
                                    <div>
                                        <h6 class="card-title" style="height: 75px;">${title}</h6>
                                        <p class="m-0">Quantity: 1</p>
                                        <p class="price">${(Number(price)).toFixed(2)} €</p>
                                        <button type="button" id="delete-from-cart" class="btn btn-outline-dark d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                            </svg><span class="ps-2" onclick="removeFromCart('${asin})">Delete from cart</span>
                                        </button>
                                    </div>
                                </div>
                            </li>`
    let price2 = document.querySelectorAll(".price")
    console.log(price2);

    price2.forEach(price => {
        price.textContent = price.textContent.replace(".", ",")
    })

    // somma i prezzi man mano che gli elementi vengono aggiunti al carrello
    const cartTotal = document.getElementById("cartTotal")
    total += Number(price)
    console.log(total);
    cartTotal.innerText = total.toFixed(2).replace(".", ",");

}


// funzione per aggiornare il carrello
function updateCartDisplay() {
    let cartButton = document.getElementById("number-of-articles");
    cartButton.textContent = cart.length
}

