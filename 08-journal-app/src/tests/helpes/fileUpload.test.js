import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary'

cloudinary.config({ 
  cloud_name: 'dmaatw3qn', 
  api_key: '136844322723325', 
  api_secret: 'goDvjXuaFIstIEi7xEARwqgHdhc',
  secure: true
});

describe('Pruebas en fileUpload', () => {

  // test('should cargar un archivo y retornar el URL', async () => {
    
  //   const resp = await fetch('https://webpack.js.org/icon-pwa-512x512.d3dae4189855b3a72ff9.png');
  //   const blob = await resp.blob();

  //   const file = new File([blob], 'image.png'); // Creamos el archivo
  //   const url = await fileUpload( file ); // subimos el archivo con la funcion a cloudinary

  //   expect( typeof url ).toBe('string');

  //   //Borrar imagen por id con sdk de cloudinary
  //   const segments = url.split('/');
  //   const imageId = segments[segments.length - 1].replace('.png', '');
  //   await cloudinary.v2.api.delete_resources( imageId );
  // });

  test('should retornar un error', async () => {
    const file = new File([], 'image.png');
    const url = await fileUpload( file );

    expect( url ).toBe(null);
  });
  

});
