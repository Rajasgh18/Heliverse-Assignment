import {
  Routes,
  Route
} from 'react-router-dom';
import Team from './pages/team';
import Home from './pages/home';
import NotFound from './pages/not-found';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/team/:id' element={<Team />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;