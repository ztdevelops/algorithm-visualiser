import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SortingVisualiser from './sort/visualise'
import NavbarComponent from './components/navbar';

function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <SortingVisualiser/>
    </div>
  );
}

export default App;
