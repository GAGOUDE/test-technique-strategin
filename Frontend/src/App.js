import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  return (
    <Routes>
      <Route path='/main' exact element={<Main />} />
      <Route path='/register' exact element={<Register />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/' exact element={<Navigate  replace to="/login" />} />
    </Routes>
  );
}

export default App;
