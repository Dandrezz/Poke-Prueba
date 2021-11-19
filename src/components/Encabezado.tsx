import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { newPokemon, searchPokemon } from '../actions/pokemonActions'
import { useState } from 'react'

const Encabezado = () => {

    const dispatch = useDispatch()

    const [filtro, setFiltro] = useState('')

    return (
        <>
            <div className="mb-2 mt-3 fw-bold">Lista de Pokemon</div>
            <div className="mb-2 row justify-content-between">
                <div className="col-3" >
                    <input 
                        className="form-control" 
                        type="text" 
                        value={ filtro }
                        onChange={ (e)=> { setFiltro(e.target.value),dispatch( searchPokemon( e.target.value )) }}
                    />
                </div>
                <div className="col-2 d-grid">
                    <button
                        className="btn btn-primary"
                        onClick={()=>dispatch(newPokemon())}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Nuevo
                    </button>
                </div>
            </div>
        </>
    )
}

export default Encabezado
