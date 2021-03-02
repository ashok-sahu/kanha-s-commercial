import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as UserActions from '../../actions/userActions'

const Logout = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(UserActions.Logout())
    },[dispatch])
    return <Redirect to='/'/>
}

export default Logout
