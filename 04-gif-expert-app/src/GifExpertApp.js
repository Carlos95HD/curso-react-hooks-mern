import React from 'react';
import { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';

const GifExpertApp = ({ defaultCategories = [] }) => {

  // const categories = [ 'One Punch', 'Samurai X', 'Dragon Ball' ];
  const [categories, setCategories] = useState( defaultCategories )

  // const handleAdd = () => {
  //   setCategories([...categories, 'Simpsons'])
  // }

  return (
    <>
    <h2 className='text-4xl font-mono text-gray-800 animate__animated animate__backInLeft'>GifExpert-App</h2>
    <AddCategory setCategories={setCategories}/>
    <hr />

    <ol className='mt-2'>
      { 
        categories.map( category => (
              <GifGrid 
              key={category}
              category={category}
              />
        ))
      }
    </ol>

    </>
  )

}
export default GifExpertApp;