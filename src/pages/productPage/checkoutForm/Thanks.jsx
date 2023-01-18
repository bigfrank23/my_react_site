import React from 'react'
import thanksImg from '../../../thanks.jpg'
// thanks_for_the_purchase
const Thanks = () => {
  return (
    <div style={{width: '100%', height:'100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={thanksImg} alt="" style={{width: '50%', height: '50%', objectFit: 'contain'}} />
    </div>
  )
}

export default Thanks