import { getGifs } from "../../helpers/getGifs";


describe('Prueba gif grid items', () => {

  test('Debe traer 10 elementos', async() => {
    const gifs = await getGifs('Goku')

    expect(gifs.length).toBe( 10 )
  })

  test('Debe traer 0 elementos', async() => {
    const gifs = await getGifs('')

    expect(gifs.length).toBe( 0 )
  })

})
