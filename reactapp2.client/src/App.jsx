
import './App.css';
import AddProducts from './component/AddProduct';
import ViewDataTable from './component/ViewDataTable';

function App() {

    return (
        <div>
            <h1 id="tabelLabel">Product Table</h1>
            <ViewDataTable />
            <AddProducts
            />
        </div>
    );
    
}

export default App;