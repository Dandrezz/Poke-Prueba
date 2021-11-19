import { Provider } from 'react-redux';
import './App.css'

import TablePokemons from './components/TablePokemons'
import FormularioPokemons from './components/FormularioPokemons'

import { store } from './store/store';
import Encabezado from './components/Encabezado';


const App = () => {


	return (
		<Provider
			store={ store }
		>
			<div className="container">
				
				<Encabezado />

				<TablePokemons />

				<FormularioPokemons />

			</div>
		</Provider>
	)
}

export default App
