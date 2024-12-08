url = "https://striveschool-api.herokuapp.com/books"

fetch("https://striveschool-api.herokuapp.com/books")
    .then(raw => raw.json())
    .then((response) => {
        console.log(response)
        stampaLibri(response)
    })



const stampaLibri = (response) => {
    // seleziona il container per le card e crea per ogni elemento dell'array una card con l'immagine, il titolo e il prezzo
    let bookContainer = document.getElementById("book-container")
    bookContainer.innerHTML += response.map(element => {
        return `<div class="card col-12 col-sm-6 col-lg-4" style="width: 18rem;">
                    <img src="${element.img}" class="card-img-top" alt="..." height="450px">
                    <div class="card-body">
                        <h5 class="card-title" style="height: 100px;">${element.title}</h5>
                        <p class="card-text price">${element.price}</p>
                        <button type="button" id="add-to-cart" class="btn btn-outline-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-cart-fill" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </button>
                    </div>
                </div>`
    }).join("");


    // va a richiamare il p contenente il prezzo, va a sostituire il . con la , e aggiunge il simbolo €
    let price = document.querySelectorAll(".price")
    console.log(price);
    
    price.forEach(price => {
        price.textContent = price.textContent.replace(".", ",") + ` €`
    })
}