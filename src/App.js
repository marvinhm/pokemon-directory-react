import './App.css';

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
          <tr>
            <td>Bulbasaur</td>
            <td>Grass, Poison</td>
          </tr>
        </tbody>   
       
       </table>
    </div>
  );
}

export default App;
