import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import OutfitPage from './views/OutfitPage';
import ItemZoom from './views/ItemZoom';
import './styles/App.css'


export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/OutfitZoom" element={<OutfitPage />} />
      <Route path="/item/:name" element={<ItemZoom />} />
    </Routes>
  );
};

export default App;
