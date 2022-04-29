import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Pokedex, PokemonDetails, Error404 } from './views';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/pokedex' element={<Pokedex />} />
        <Route path='/pokemon/:id' element={<PokemonDetails />} />
        <Route path='*' element={<Error404 linkTo={'/'} />} />
      </Routes>
    </Router>
  );
};

export default App;
