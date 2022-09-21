import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dmaatw3qn',
  api_key: '136844322723325',
  api_secret: 'goDvjXuaFIstIEi7xEARwqgHdhc',
  secure: true,
});

describe('Pruebas en fileUpload', () => {

  test('debe subir el archivo correctamente a cloudinary', async() => { 

    // const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
    // const resp = await fetch( imageUrl );
    // const blob = await resp.blob();

    // const file = new File([blob], 'foto.jpg');

    // const url = await fileUpload( file );
    // expect( typeof url).toBe('string');

    // const segments = url.split('/');
    // const imageId = segments[segments.length - 1].replace('.png','');

    // const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId, {
    //   resource_type:'image'
    // }]);
  });

  test('debe retornar null', async() => {
    // const file = new File([], 'foto.jpg');

    // const url = await fileUpload( file );
    // expect(url).toBe(null);
  })

});