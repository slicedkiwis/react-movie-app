import './App.css';
import Layout from './containers/Layout';
import Sidebar from './containers/Sidebar';
import Main from './containers/Main';
import { useState } from 'react';
function App() {
  const [genre,setGenre] = useState(null) 
  return (
    <div className="App">
      <Layout>
          <Sidebar setGenre = {setGenre}/>
          <Main genre = {genre}/>
      </Layout>
    </div>
  );
}

export default App;
