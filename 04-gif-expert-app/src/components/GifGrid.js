import React from "react";
import { useFetchGifs } from "../hooks/useFetchGifs";
import {GifGridItem }from './GifGridItem'
import PropTypes from 'prop-types'

export const GifGrid = ({ category }) => {

  const { data:images, loading} = useFetchGifs(category);

  // getGifs();

  return (
    <>
    <h3 className='animate__animated animate__fadeIn font-mono mb-5 mt-5 text-base text-2xl text-gray-800'>{category}</h3>

    {loading && <p className='font-mono animate__animated animate__flash text-gray-800'>Loading</p>}

    <div className='card-grid'>

      {
        images.map( img  => (
          <GifGridItem
          key={img.id}
          {...img}
          />
        ))
      }

    </div>
    </>

  );
};

GifGrid.propTypes = {
  category: PropTypes.string.isRequired
}