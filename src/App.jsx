import './App.css';
import Layout from './containers/Layout';
import Sidebar from './containers/Sidebar';
import Main from './containers/Main';
function App() {
  return (
    <div className="App">
      <Layout>
          <Sidebar/>
          <Main/>
      </Layout>
    </div>
  );
}

export default App;
