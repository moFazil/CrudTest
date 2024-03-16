
import './App.css';
import { Boot } from "./Component/Boot";
import { Routes,Route } from 'react-router-dom';
import AllFruits from './Component/Crude_1';
import AddFruit from './Component/crude_2';
import UpdateFruit from './Component/update';
import Posts from './Component/Search';

function App() {
  return (
    <div className="App">
     <Boot> 
     
     <Routes>
      <Route path='/' element={<AllFruits/>}></Route>
      <Route path='/add-fruits' element={<AddFruit></AddFruit>}></Route>
      <Route path='/up/:id' element={<UpdateFruit/>} ></Route>
      
     </Routes>
     <Posts/>
     </Boot>
     
     
    </div>
  );
}

export default App;
