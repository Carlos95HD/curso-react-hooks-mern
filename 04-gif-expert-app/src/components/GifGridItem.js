import React from 'react'
import PropTypes from 'prop-types';

export const GifGridItem = ( { title, url} ) => {

  return (
    <div className='card animate__animated animate__fadeIn'>
      <img src={url} alt={ title } className='text-center'/>
      <p className='font-sans text-gray-800'>{ title }</p>
    </div>
  )
}

GifGridItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}