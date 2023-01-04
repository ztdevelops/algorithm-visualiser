import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SortingVisualiserComponent from './components/SortingVisualiser/SortingVisualiserComponent'
import NavbarComponent from './components/Navbar/NavbarComponent';

function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <SortingVisualiserComponent/>
    </div>
  );
}

export default App;
