let pokemons = []
const URL_API = "https://pokeapi.co/api/v2/pokemon";
const boxButtons = document.querySelector(".main__buttons")
const conatinerPokemon = document.getElementById("pokemonDetail")
//Función que obtiene los Pokemon's de la API
const getPokemonsFromApi = async (url) => {
    try {
        const { data } = await axios.get(url);
        console.log(data.results);
        return data.results;
    } catch (error) {
        console.log(error)
        alert('Usuario, ocurrió un error')
        return{ results: []};
    }

};

//Función que obtiene un Pokemon de la API
const getPokemonFromApi = async (url) => {
    try {
        const { data } = await axios.get(url);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
        alert('Usuario, ocurrió un error')
        return{};
    }

}

//Función que pinta los botones de los Pokemon's 
const printPokemonsButtons =  (pokemonsList, container) => {
    container.innerHTML = "";
    pokemonsList.forEach(poke => {
        container.innerHTML += `
        <button data-url=${poke.url} class="btn btn-primary">${poke.name}</button>`;
        console.log(poke.url);
    });
}

//pintar detalles del pokemon
const printDetailsPokemon = (pokemon,container) => {
    container.innerHTML = `
    <article>
        <figure>
            <img src = ${pokemon.sprites.front_default} alt=${pokemon.name}>
        </figure>
        <h3>${pokemon.name}</h3>
    </article>
    `;
}


document.addEventListener("DOMContentLoaded", async () => {
    //Ejecutamos Función que ontiene los pokemones cada vez que se recargue la pagina
    pokemons = await getPokemonsFromApi(URL_API);
    printPokemonsButtons(pokemons, boxButtons)
});

document.addEventListener("click", async (e) => {
    const urlPokemon = e.target.getAttribute("data-url")
    if(urlPokemon){
        const pokemon = await getPokemonFromApi(urlPokemon);
        printDetailsPokemon (pokemon, conatinerPokemon)
    }
})