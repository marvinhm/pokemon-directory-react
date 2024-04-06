import './App.css';
import React from 'react';
import PropTypes from "prop-types"
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

const PokemonRow = ({ pokemon, onSelect }) => {
  return (
      <tr>
        <td>{pokemon.name.english}</td>
        <td>{pokemon.type.join(", ")}</td>
        <Button variant="contained" onClick={() => onSelect(pokemon)}>Select!</Button>
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

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-columnGap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function App() {
  const [ filter, filterSetter ] = React.useState("");
  const [ selectedItem,  selectedItemSetter ] = React.useState(null);
  const [ pokemon,  pokemonSetter ] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/reacting/pokemon.json')
      .then((res) => res.json())
      .then((data) => pokemonSetter(data))
  }, [])

  const onSelect = (pm) => {
    selectedItemSetter(pm);
  }

  return (
    <Container>
      <Title className='title'>Pokemon Search</Title>
      <Input value={filter} onChange={(e) => filterSetter(e.target.value)} ></Input>
      <TwoColumnLayout>
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
         
      </TwoColumnLayout>  
    </Container>
  );
}

export default App;
