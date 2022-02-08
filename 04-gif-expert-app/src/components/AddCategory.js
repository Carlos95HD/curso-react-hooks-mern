import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const AddCategory = ( {setCategories} ) => {

  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    // console.log( e.target.value )
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('HandleSubmit', inputValue)
    if ( inputValue.trim().length > 2 ) {
      setCategories( catg => [inputValue,...catg] )
      setInputValue('')
    }
  }


  return (
    <form onSubmit={ handleSubmit }>
      {/* <p>{inputValue}</p> */}
      <input 
      className='mb-4 mt-2 shadow-lg p-2 font-mono rounded focus:outline-none'
      placeholder='Search'
      type='text'
      value= { inputValue }
      onChange={ handleInputChange }
      />

    </form>
  )
}

AddCategory.propTypes = {
  setCategories: PropTypes.func.isRequired
}