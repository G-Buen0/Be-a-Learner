import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo.svg'

export default function NewClass(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const schoolId = localStorage.getItem('schoolId')
    const history = useHistory()

    async function handleNewClass(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try{
            await api.post('/classes', data, {
                headers: {
                    Authorization: schoolId
                }
            })
            history.push('/profile')
        }catch (err){
            alert('Erro ao cadastrar aula. Tente novamente.')
        }
    }

    return (
        <div className="new-class-container">
        <div className="content">
            <section>
                <img src={logo} alt="Be The Student"/>

                <h1>Cadastrar nova aula</h1>
                <p>Faça uma descrição detalhada para que os alunos não percam nenhuma informação importante.</p>

                <Link className= "back-link" to="/profile">
                    <FiArrowLeft size={16} color="#0069e9"/>
                    Voltar para home
                </Link>
            </section>

            <form onSubmit={handleNewClass}>
                <input 
                    placeholder="Título da aula"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}    
                />

                <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}    
                />

                <button className="button" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    </div>
    )
}