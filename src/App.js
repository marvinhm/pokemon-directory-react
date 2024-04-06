import './App.css';
import pokemon from'./pokemon.json';
import React from 'react';
import PropTypes from "prop-types"

const PokemonRow = ({ pokemon, onSelect }) => {
  return (
      <tr>
        <td>{pokemon.name.english}</td>
        <td>{pokemon.type.join(", ")}</td>
        <button onClick={() => onSelect(pokemon)}>Select!</button>
      </tr> 
  )
}

const PokemonInfo = ({ name, base }) => {
  return (
     <div>
      <h1>{name.english}</h1>
      <table>
        {
          Object.keys(base).map((key) => (
            <tr>
              <td key={key}>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </table>
     </div>
  )
}

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired
  }) 
}

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
  onSelect: PropTypes.func
}

function App() {
  const [ filter, filterSetter ] = React.useState("");
  const [ selectedItem,  selectedItemSetter ] = React.useState(null);

  const onSelect = (pm) => {
    selectedItemSetter(pm);
  }

  return (
    <div className="App" style={
      {margin: "auto", width: 800, paddingTop: "1rem"}
    }>
      <h1 className='title'>Pokemon Search</h1>
      <input value={filter} onChange={(e) => filterSetter(e.target.value)} ></input>
      <div style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
        gridColumnGap: "1rem"
      }}>
        <div className='pokemonListing'>
          <table style={{ width: "100%  " }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead> 
            <tbody>
              {pokemon
                .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()  ))
                .slice(0, 20 )
                .map((pokemon) => (
                <PokemonRow key={pokemon.id} pokemon={pokemon} onSelect={onSelect}/>
              ))}
            </tbody>   
          </table>
        </div>
        
        {selectedItem && (
          <PokemonInfo { ...selectedItem } />
        )}
         
      </div>  
    </div>
  );
}

export default App;
