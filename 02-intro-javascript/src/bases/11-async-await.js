const getImage = async() => {
  try {
    const apiKey = 'NaxrRYxd65PmaG8pNwSPfPPDDJWPz0vW'
    const resp = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
    const {data} = await resp.json();
  
    console.log( data )
    const {url} = data.images.original
  
    const img = document.createElement('img')
    img.src = url;
  
    document.body.appendChild( img )

  } catch (error) {
    // Manejo Error
    console.error( error )
  }

}

getImage().then( console.log())