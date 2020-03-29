import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import {FiPower, FiTrash2} from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function Profile() {
    const [classes, setClasses] = useState([])
    const history = useHistory()
    const schoolName = localStorage.getItem('schoolName')
    const schoolId = localStorage.getItem('schoolId')


    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: schoolId,
            }
        }).then(response => {
                setClasses(response.data);
        })
    }, [schoolId]);

    async function handleDeleteClass(id){
        try{
            await api.delete(`classes/${id}`, {
                headers: {
                    Authorization: schoolId
                }
            })

            setClasses(classes.filter(Class => Class.id !== id))
        }catch (err){
            alert('Erro ao deletar caso. Tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear()
        
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Student"/>
                <span>Bem vindo(a), {schoolName}</span>

                <Link className="button" to="/classes/new">Cadastrar nova aula</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#0069e9"/>
                </button>
            </header>

            <h1>Aulas cadastradas</h1>

            <ul>
                {classes.map(Class => (
                    <li key={Class.id}>
                        <strong>AULA:</strong>
                        <p>{Class.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{Class.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Class.value}</p>

                        <button onClick={() => handleDeleteClass(Class.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

}