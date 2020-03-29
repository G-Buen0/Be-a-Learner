import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import './styles.css'
import studyingImg from '../../assets/people-studying.jpg'
import logo from '../../assets/logo.svg'
import api from '../../services/api'


export default function Logon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try{
            const response = await api.post('sessions', { id })
            
            localStorage.setItem('schoolId', id)
            localStorage.setItem('schoolName', response.data.name)

            history.push('/profile')
        }catch(err) {
            alert('Falha no login. Tente novamente.')
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Student"/>
                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className= "back-link" to="/register">
                        <FiLogIn size={16} color="#0069e9"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={studyingImg} alt="Students"/>
        </div>
    )
}