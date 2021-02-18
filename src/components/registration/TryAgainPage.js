import React, {useState}from 'react'
const initialState = ''

export default function TryAgainPage() {
    const [formData, setFormData] = useState(initialState)
    const [previousInputs, setPreviousInputs] = useState([])

    return (
        <div>
            <input value={formData} onChange={e=>{setFormData(e.target.value)}} type='text'/>
            <button 
            onClick={ () => {setPreviousInputs([...previousInputs, formData]) }}
            >Send</button>
            {
                previousInputs.map(e => {
                   return <h1>{e}</h1>
                })
            }
        </div>
    )
}
