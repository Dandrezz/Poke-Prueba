import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../reducers/rootReducer'
import { useForm } from '../hooks/useForm'
import { useEffect } from 'react'
import { newPokemon, requestsPokemons, selectPokemon } from '../actions/pokemonActions'

import { DropdownButton, Dropdown } from 'react-bootstrap';

import pokemonApi from '../api/pokemonApi'
import Swal from 'sweetalert2'

interface formPokemosValuesTypes{
    nombre: '',
    imagen: '',
    ataque: 0,
    defensa: 0,
    tipo: ''
}

const FormularioPokemons = () => {

    const dispatch = useDispatch()

    const { pokemonSelecionado, pokemonNuevo } = useSelector((state: RootState) => state.pokemons)

    const [ formPokemosValues , handleInputChange, setValues  ] = useForm({
        nombre: '',
        imagen: '',
        ataque: 0,
        defensa: 0,
        tipo: ''
    })

    const { nombre, imagen, ataque, defensa, tipo } = formPokemosValues

    useEffect(() => {
        if( pokemonSelecionado !== null ){
            setValues({
                nombre: pokemonSelecionado.name,
                imagen: pokemonSelecionado.image,
                ataque: pokemonSelecionado.attack,
                defensa: pokemonSelecionado.defense,
                tipo: pokemonSelecionado.type
            })
        }else{
            setValues({
                nombre: '',
                imagen: '',
                ataque: 0,
                defensa: 0,
                tipo: ''
            })
        }
    }, [pokemonSelecionado])

    const handleChangeType = ( value:string ) => {
        setValues({
            ...formPokemosValues,
            tipo: value
        })
    }

    const handleClickSave = async () => {

        if( nombre === '' || imagen === '' || tipo === ''){

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Existe campos vacios',
            })       
            
        }

        const pokemonToSave = {
            name: nombre,
            attack: ataque,
            defense: defensa,
            hp: 100,
            idAuthor: 1,
            image: imagen,
            type: tipo
        }

        if ( pokemonSelecionado === null ){
            try {
                await pokemonApi.post(`/?idAuthor=1`,pokemonToSave)
                Swal.fire({
                    icon: 'success',
                    title: 'Pokemon guardado',
                    showConfirmButton: false,
                    timer: 500
                })
                dispatch( requestsPokemons() )
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ocurrió mal!',
                })             
            }
        }else{
            try {
                await pokemonApi.put(`/${pokemonSelecionado.id}`, pokemonToSave)
                Swal.fire({
                    icon: 'success',
                    title: 'Pokemon actualizado',
                    showConfirmButton: false,
                    timer: 500
                })
                dispatch( requestsPokemons() )
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ocurrió mal!',
                })             
            }
        }
    }

    return (
        <div className="contenedor-formulario mb-3">
            <div
                style={{ textAlign: 'center' }}
                className="mb-3 pt-3"
            >{ (pokemonNuevo || pokemonSelecionado === null) ? 'Nuevo Pokémon' : pokemonSelecionado.name }</div>

            <div className="mb-3 row justify-content-evenly">
                <div className="row col-4">
                    <div className="col-4">Nombre:</div>
                    <input 
                        type="text" 
                        className="col form-control" 
                        name="nombre"
                        value={nombre}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="row col-4">
                    <div className="col-4">Ataque:</div>
                    <input 
                        className="col form-range" 
                        type="range" 
                        min="0" 
                        max="100"
                        name="ataque"
                        value={ataque}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="mb-3 row justify-content-evenly">
                <div className="row col-4">
                    <div className="col-4">Imagen:</div>
                    <input 
                        className="col form-control" 
                        type="text" 
                        name="imagen"
                        value={imagen}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="row col-4">
                    <div className="col-4">Defensa:</div>
                    <input 
                        className="col form-range" 
                        type="range" 
                        min="0" 
                        max="100"
                        name="defensa"
                        value={defensa}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="mb-3 row justify-content-center">
                <div className="col-4 row" style={{ textAlign:'center' }}>
                    <DropdownButton className="col" id="dropdown-basic-button" title="Tipo">
                        <Dropdown.Item onClick={()=>{handleChangeType("water")}} >water</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleChangeType("fire")}} >fire</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleChangeType("normal")}} >normal</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleChangeType("bug")}} >bug</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleChangeType("poison")}} >poison</Dropdown.Item>
                    </DropdownButton>
                    <input 
                        className="col form-control"
                        type="text" 
                        name="tipo"
                        value={tipo}
                        readOnly={true}
                    />
                </div>
            </div>

            <div className="row justify-content-center pb-3">
                <button 
                    className="col-2 btn btn-primary" 
                    disabled={ !pokemonSelecionado && !pokemonNuevo }
                    onClick={ handleClickSave }    
                >
                    <FontAwesomeIcon icon={faSave} /> Guardar
                </button>
                    &nbsp;
                <button 
                    className="col-2 btn btn-primary"
                    onClick={()=>{dispatch(newPokemon());dispatch(selectPokemon(null))}}>
                    <FontAwesomeIcon icon={faTimes} /> Cancelar
                </button>
            </div>

        </div>
    )
}

export default FormularioPokemons
