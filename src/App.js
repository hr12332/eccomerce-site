import './App.css';
import Routing from './routing/Routing';
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
     <Routing/>
     </Provider>
  );
}

export default App;
