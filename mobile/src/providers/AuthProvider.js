import React, { useState } from 'react'
import { Alert } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import Api from '../services/api'

const { Provider }  = AuthContext

const AuthProvider = ({ children }) => {
    const [fetching, setFetching] = useState(false)
    const [isLogged, setLogged] = useState(false)

    async function login ({ email, password }) {
        setFetching(true)
        setTimeout(async () => {
            const response = await Api.login({ email, password })
            if (!response.ok) {
                Alert.alert('Ops!', 'Aconteceu algum erro ao conectar a Api')
                return    
            }
            setLogged(true)
            setFetching(false)
        }, 5000)
    }
    
    function logout() {
        setLogged(false)
    }

    return (
        <Provider value={{ isLogged, fetching, login, logout }}>
            {children}
        </Provider>
    )
}

export default AuthProvider