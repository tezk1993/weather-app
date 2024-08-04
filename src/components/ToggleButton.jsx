import React, { useState } from 'react'

export const ToggleButton = ({toggleText,toggleState,toggleFunc}) => {

  
const handleCheckboxChange = () => {
    
    toggleFunc(!toggleState)
    console.log(toggleState);
}
  return (
    <label  className="relative group w-full h-full bg-gray-100 border-white border-4 rounded-full select-none cursor-pointer flex justify-between hover:shadow-md hover:shadow-slate-400 transition-shadow duration-300" >
        <input 
            type="checkbox" 
            checked= {toggleState}
            onChange={handleCheckboxChange}
            className="peer appearance-none hidden"
            />
        <div className="
            w-1/2 h-full  bg-amber-300 rounded-full  shadow-blue-300 absolute left-0
            
            peer-checked:left-1/2 

            transition-all duration-1000
            ease-in-out"
        >
            <span className='flex items-center justify-center h-full text-white peer-checked:text-black'>
                <i className='text-blue-500 text-xl fas fa-temperature-low '></i>
            </span>
        </div>
        <span className='transition delay-200 duration-300 relative w-30 h-full flex items-center justify-center font-bold text-gray-700 opacity-0 peer-checked:opacity-100 ml-[25%] text-xl'>F</span>
        <span className='transition delay-200 duration-300 relative w-30 h-full flex items-center justify-center font-bold text-gray-700 opacity-100 peer-checked:opacity-0 mr-[25%] text-xl'>C</span>
        
    </label>
  )
}
