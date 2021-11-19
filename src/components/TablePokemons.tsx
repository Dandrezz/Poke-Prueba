import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

import imageNotFound from '../images/imageNotFound.png'
import pokemonApi from '../api/pokemonApi'
import { useDispatch, useSelector } from 'react-redux'
import { requestsPokemons, selectPokemon } from '../actions/pokemonActions'
import { RootState } from '../reducers/rootReducer'
import Swal from 'sweetalert2'

export interface PokemonAPI {
    id: number;
    name: string;
    image: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
    idAuthor: number;
}

const TablePokemons = () => {

    const [listaPokemonsFiltrados, setListaPokemonsFiltrados] = useState<Array<PokemonAPI>>([])

    const dispatch = useDispatch()

    const { filtro, pokemonsObtenidos } = useSelector((state: RootState) => state.pokemons)

    useEffect(() => {
        dispatch( requestsPokemons() )
    }, [])

    useEffect(() => {
        setListaPokemonsFiltrados(pokemonsObtenidos)
    }, [pokemonsObtenidos])

    useEffect(() => {

        if(pokemonsObtenidos!==null)
            setListaPokemonsFiltrados(pokemonsObtenidos.filter(pokemon => pokemon.name.toUpperCase().includes(filtro.toUpperCase())))

    }, [filtro])

    const handleDeleteClick = (id:number) => {
        Swal.fire({
            title: '¿Esta seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, barrarlo!'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const resp = await pokemonApi.delete(`/${id}`)
                Swal.fire(
                    '¡Borrado!',
                    'El registro ha sido borrado',
                    'success'
                )
                dispatch( requestsPokemons() )
            }
        })
    }

    return (
        <table className="table table-bordered tabla-de-pokemons mb-2">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Ataque</th>
                    <th>Defensa</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaPokemonsFiltrados && listaPokemonsFiltrados.map((pokemon, index) => (
                    <tr
                        key={index}
                    >
                        <td>{pokemon.name}</td>
                        <td style={{ textAlign: 'center' }}>
                            <img
                                style={{ height: '35px' }}
                                src={pokemon.image ? pokemon.image : imageNotFound}
                                alt="imagen" />
                        </td>
                        <td>{pokemon.attack}</td>
                        <td>{pokemon.defense}</td>
                        <td>
                            <div className="row justify-content-evenly">
                                <div className="col-2">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => dispatch(selectPokemon(pokemon))}
                                    >
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                </div>
                                <div className="col-2">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={()=>handleDeleteClick(pokemon.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TablePokemons
