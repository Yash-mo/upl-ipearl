import React from 'react'

export default function MessageBox({message}) {
  console.log(message)
  return (
    <div className='w-100 mt-2' style={{background:"pink",borderRadius:"10px", color:"#f15500", padding:"1rem",backgroundColor:"red" }}>
        <span className=''>{message}</span>
    </div>
  )
}
