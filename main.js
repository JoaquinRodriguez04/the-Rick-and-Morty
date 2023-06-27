// elements
const list = document.querySelector(".list");
const list_items_links_mobile = document.querySelector(".list-items-links-mobile");
const close = document.querySelector(".close");
const targets_characters = document.querySelector(".targets-characters");
const next = document.querySelector(".next");
const left = document.querySelector(".left");
let number_pages = document.querySelector(".number-span");
const targets_locations = document.querySelector(".targets-locations");
const next2 = document.querySelector(".next-2");
const left2 = document.querySelector(".left-2");
let number_pages2 = document.querySelector(".number-span-2");
const item_characters_mobile = document.querySelector("#characters-mobile");
const item_locations_mobile = document.querySelector("#locations-mobile");
const item_characters_desktop = document.querySelector("#characters-desktop");
const item_locations_desktop = document.querySelector("#locations-desktop");
const sections_targets = document.querySelector(".sections-targets-01");
const sections_targets02 = document.querySelector(".sections-targets-02");

// url - api
const URLApi = fetch("https://rickandmortyapi.com/api/character");
const URLApi2 = fetch("https://rickandmortyapi.com/api/location");

// functions
const characters = async (URL) => {
    const RickAndMortyApi = await URL;
    const data = await RickAndMortyApi.json();

    const dataCharacters = data.results;

    dataCharacters.forEach(character => {
       const div = document.createElement("div");
        div.classList.add("character");
        div.innerHTML = `
       
        <img src="${character.image}" class="img-character" alt="${character.id}">
      
        <div class="info-character">
            <h2 class="name-character">${character.name}</h2>
                       
            <div class="origin-character flex">
                <div class="circle-color"></div>
                <h3 class="title-character">origin:</h3>
                <p class="paragraph-character">${character.origin.name}</p>
            </div>
            <div class="location-character flex">
                <div class="circle-color"></div>
                <h3 class="title-character">Last known location:</h3>
                <p class="paragraph-character">${character.location.name}</p>
            </div>
            <div class="description-character flex">
                <div class="circle-color"></div>
                <h3 class="title-character">description:</h3>
                <p class="paragraph-character des-paragraph">${character.species} - ${character.status} - ${character.gender}</p>
            </div>
        </div>

        `;

        targets_characters.append(div);

    });

};

characters(URLApi);

function reloadCharacters(count){
    fetch("https://rickandmortyapi.com/api/character?page=" + count)
        .then(response => response.json())
        .then(data => {
            const dataCharacters = data.results;
            
            targets_characters.innerHTML= "";

            dataCharacters.forEach(character => {

               const div = document.createElement("div");
                div.classList.add("character");
                div.innerHTML = `
        
                <img src="${character.image}" class="img-character" alt="${character.id}">
                <div class="info-character">
                    <h2 class="name-character">${character.name}</h2>
                               
                    <div class="origin-character flex">
                        <div class="circle-color"></div>
                        <h3 class="title-character">origin:</h3>
                        <p class="paragraph-character">${character.origin.name}</p>
                    </div>
                    <div class="location-character flex">
                        <div class="circle-color"></div>
                        <h3 class="title-character">Last known location:</h3>
                        <p class="paragraph-character">${character.location.name}</p>
                    </div>
                    <div class="description-character flex">
                        <div class="circle-color"></div>
                        <h3 class="title-character">description:</h3>
                        <p class="paragraph-character des-paragraph">${character.species} - ${character.status} - ${character.gender}</p>
                        
                    </div>
                </div>
        
                `;
        
                targets_characters.append(div);
        
            });
        });
};

const locations = async (URL) => {
    const RickAndMortyApi = await URL;
    const data = await RickAndMortyApi.json();

    const dataLocations = data.results;

    dataLocations.forEach(location => {
       const div = document.createElement("div");
        div.classList.add("locations");
        div.innerHTML = `

        <div class="locations">
            <p class="id-location">#${location.id}</p>
            <h2 class="h2-locations">${location.name}</h2>
            <h2 class="h2-locations">${location.type}</h2>
            <h2 class="h2-locations">${location.dimension}</h2>
           <div class="type-location ${location.type}"></div>
        </div>

        `;

        targets_locations.append(div);

    });

};

function reloadLocations(count){
    fetch("https://rickandmortyapi.com/api/location?page=" + count)
        .then(response => response.json())
        .then(data => {
            const dataLocations = data.results;
            
            targets_locations.innerHTML= "";

            dataLocations.forEach(location => {
                const div = document.createElement("div");
                 div.classList.add("locations");
                 div.innerHTML = `
         
                 <div class="locations">
                     <p class="id-location">#${location.id}</p>
                     <h2 class="h2-locations">${location.name}</h2>
                     <h2 class="h2-locations">${location.type}</h2>
                     <h2 class="h2-locations">${location.dimension}</h2>
                    <div class="type-location ${location.type}"></div>
                 </div>
         
                 `;
         
                 targets_locations.append(div);
         
             });
        });
};

// events

// evento para la recargar las paginas de los personajes(reloadCharacters)
counterPages = 1;

next.addEventListener("click", () => {
    counterPages++;
    reloadCharacters(counterPages);
   
    number_pages.innerText = `${counterPages}`;
});

left.addEventListener("click", () => {
    if(counterPages >= 2){
        counterPages--;
        reloadCharacters(counterPages);
        
        number_pages.innerText = counterPages;
    };
});


// evento para la recargar las paginas de las localizaciones(reloadLocations)
counterPages2 = 1;

next2.addEventListener("click", () => {
    counterPages2++;
    reloadLocations(counterPages2);
   
    number_pages2.innerText = `${counterPages2}`;
});

left2.addEventListener("click", () => {
    if(counterPages2 >= 2){
        counterPages2--;
        reloadLocations(counterPages2);
        
        number_pages2.innerText = counterPages2;
    };
});


// eventos para el menu hamburguesa

list.addEventListener("click", () => {
    list_items_links_mobile.classList.add("activate");
});

close.addEventListener("click", () => {
    list_items_links_mobile.classList.remove("activate");
});

document.body.addEventListener("click", (e) => {
    if (!list.contains(e.target)) {
        list_items_links_mobile.classList.remove("activate");
    };
});

// eventos para navegar en las diferentes secciones

item_locations_desktop.addEventListener("click", () => {
    sections_targets.classList.add("disabled");
    sections_targets02.classList.remove("disabled");
    locations(URLApi2);
});

item_locations_mobile.addEventListener("click", () => {
    sections_targets.classList.add("disabled");
    sections_targets02.classList.remove("disabled");
    locations(URLApi2);
});

item_characters_desktop.addEventListener("click", () => {
    sections_targets02.classList.add("disabled");    
    sections_targets.classList.remove("disabled");
});

item_characters_mobile.addEventListener("click", () => {
    sections_targets02.classList.add("disabled");    
    sections_targets.classList.remove("disabled");
});