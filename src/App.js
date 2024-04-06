import './App.css';
import pokemon from'./pokemon.json';
import PropTypes from "prop-types"

const PokemonRow = ({ pokemon }) => {
  return (
      <tr>
        <td>{pokemon.name.english}</td>
        <td>{pokemon.type.join(", ")}</td>
      </tr> 
  )
}

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  })
}

function App() {
  return (
    <div className="App" style={
      {margin: "auto", width: 800, paddingTop: "1rem"}
    }>
      <h1 className='title'>Pokemon Search</h1> 
      <table style={{ width: "100%  " }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemon
            .slice(0, 151 )
            .map((pokemon) => (
            <PokemonRow key={pokemon.id} pokemon={pokemon}/>
          ))}
        </tbody>   
       
       </table>
    </div>
  );
}

export default App;
