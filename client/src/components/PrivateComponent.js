import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

// Outlet wrapper che - as props moklsu e handle krse

const PrivateComponent = () => {

    // now apde private component ma authentication base pr navbar nu menu btavsu
    // to localstorage ma kai che user no data k ny e auth nam na variable ma store krsu
    // jo hase to ene blogs btavsu nytar ny bataviye
    const auth = localStorage.getItem('user');

  return (
    <>
        {/* jo local storage ma user store hase to j private components batavo ny tar login page pr navigate kro  */}
        { auth ? <Outlet/> : <Navigate to='/login' />}
    </>
  )
}

export default PrivateComponent

