let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component with smaller size and yellow border
function PokemonCard(props) {
  return React.createElement(
    "div",
    { 
      className: "bg-cover bg-center text-black rounded-lg p-2 m-2 shadow-lg relative border-4 border-yellow-500", // Added yellow border
      style: { 
        width: '180px', // Smaller width
        height: '250px', // Shorter height
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoAcLVlxju9toJVw-ilTUkqLmrgdEs5z3ifg&s')" // Background image
      }
    },
    React.createElement(
      "div",
      { className: "absolute top-2 right-2 bg-white bg-opacity-70 rounded-full px-2 py-1 text-xs font-bold text-black" }, 
      `#${props.id}`  // ID display
    ),
    React.createElement(
      "div",
      { className: "flex justify-center items-center mb-1" },
      React.createElement("div", {
        className: "rounded-full border-4 border-yellow-500 overflow-hidden w-20 h-20 flex items-center justify-center" // Adjust the circle size to smaller
      },
      React.createElement("img", { 
        src: props.image, 
        alt: props.name, 
        className: "w-full h-full object-cover" 
      })),
    ),
    React.createElement(
      "h2", 
      { className: "text-lg font-bold text-white text-center mt-1" }, // Smaller font for name
      props.name
    ),
    React.createElement(
      "div",
      { className: "flex justify-center items-center mt-1" }, 
      React.createElement(
        "p", 
        { className: "text-sm text-white mr-1" }, // Smaller font for type
        "Type:"
      ),
      React.createElement(
        "p", 
        { className: "text-sm text-white" }, 
        props.types
      )
    ),
    React.createElement(
      "div",
      { className: "flex justify-between mt-2" },
      React.createElement(
        "button",
        {
          className: "bg-red-500 text-white px-2 py-1 rounded-md transition-transform transform hover:scale-110 hover:bg-red-600",
          style: { width: '70px' } // Smaller button width
        },
        `${props.height} m`
      ),
      React.createElement(
        "button",
        {
          className: "bg-purple-500 text-white px-2 py-1 rounded-md transition-transform transform hover:scale-110 hover:bg-purple-600",
          style: { width: '70px' } // Smaller button width
        },
        `${props.weight} kg`
      )
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        id: pokemon.id,  // Pass the id here
        name: pokemon.name,
        types: pokemon.types.join(", "),  // Join types with comma
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        height: pokemon.height,  // Ensure height is passed
        weight: pokemon.weight   // Ensure weight is passed
      })
    )
  );
}


// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "text-white" },
    React.createElement(
      "header",
      { className: "mb-4 text-center" },
      React.createElement(
        "h1",
        {
          className: "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-lg p-2"
        },
        "Pokedex"
      ),
      React.createElement(
        "p",
        {
          className: "text-lg mt-2 text-gray-300 italic"
        },
        "Explore and discover your favorite Pokémon with detailed stats, types, and more!"
      )
    ),
    React.createElement(PokemonList, null)
  );
}


// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
