import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import OutfitPage from './views/OutfitPage';
import EurekaPage from './views/EurekaPage';
import { Test } from './views/TestPage';
import './styles/App.css'
import { InventoryForm } from './components/inventory/InventoryForm';


export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/OutfitPage" element={<OutfitPage />} />
      <Route path="/EurekaPage" element={<EurekaPage />} />
      <Route path="/Test" element={<Test />} />
      <Route path="/Form" element={<InventoryForm />} />
      {/* <Route path="/item/:name" element={<EurekaPage />} /> */}
    </Routes>
  );
};

export default App;
