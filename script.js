const BATMAN = "https://api.batmanapi.com/v1/characters/?pagination[pageSize]=83";
const IMG = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
const container = document.getElementById("container");

let data = [];
let images = [];

function getIMG(url) {
    return fetch(url)
        .then(response => response.json())
        .then(objects => {
            images = objects;
        })
        .catch(error => {
            console.log("Error:", error)
        });
}

function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(objects => {
            data = objects.data;
            BAT(data);
            console.log("Personajes:", data);
        })
        .catch(error => {
            console.log("Error:", error)
        });
}


function BAT(array) { 
    container.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        
        const { id , attributes: { name , alias, alive, role, description, creator, first_appearance, gender, abilities}} = array[i];
        
        const personajeEncontrado = images.find(personaje => personaje.name.toLowerCase() === name.toLowerCase() || personaje.name.toLowerCase() === alias.toLowerCase());
        // Verifica si se encontró el personaje
        
        const imagenUrl = personajeEncontrado ? `<img src="${personajeEncontrado.images.md}" alt=""></img>` : `<img src="character-unknown.png" alt=""></img>`;

        let AliveOrDead = alive === true ? `<i class="fa-solid fa-heart-pulse alive"></i> <strong> Alive</strong>` : `<i class="fa-solid fa-heart-crack dead"></i> <strong>Dead</strong>`;

        container.innerHTML += ` 
            <div class="col-10 col-md-4 col-lg-3 m-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom_${id}" aria-controls="offcanvasBottom_${id}">
                <div class="card" id="${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name} (${alias})</h5>
                        <p class="card-text">${description}</p>
                    </div>
                    <div class="card-footer p-2 pb-3">
                        <small><strong>First appearance:</strong> ${first_appearance}</small>
                    </div>
                </div>
            </div>
            <div class="offcanvas" tabindex="-1" id="offcanvasBottom_${id}" aria-labelledby="offcanvasBottom_${id}Label">
                <div class="offcanvas-header col-12 pe-4 pt-3">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body small row">
                    <div class="col-12 col-md-4 col-lg-4">
                        ${imagenUrl}
                    </div>
                    <div class="d-flex flex-column col-12 col-md-7 col-lg-7 mt-3 ps-2">
                        <h3 class="offcanvas-title" id="offcanvasBottomLabel">${name} - ${alias}</h3>
                        <p class="fs-6"> ${AliveOrDead}</p>
                        <hr>
                        <div class="fs-6">
                            <p class="mb-4">${description}</p>
                            <p> <strong>Role:</strong> ${role}</p>
                            <p> <strong>Gender:</strong> ${gender}</p>
                            <p> <strong>Abilities:</strong> ${abilities.map(abil => abil).join(' - ')}</p>
                        </div>
                        <div class="mt-3">
                            <hr>
                            <p> <strong>Creator:</strong> ${creator}</p>
                            <small><strong>First appearance:</strong> ${first_appearance}</small>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

// Función para buscar los personajes
function searchCharacter() {
    const search = document.getElementById("search");

    search.addEventListener("input", function () {
        const input = search.value.toLowerCase();

        if (input!=""){
            let filteredCharacters = data.filter(character => {
                return character.attributes.name.toLowerCase().includes(input) ||
                    character.attributes.alias.toLowerCase().includes(input);
            });
            BAT(filteredCharacters);
        } else {
            BAT(data);
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    getIMG(IMG);
    getData(BATMAN);
    searchCharacter();
});