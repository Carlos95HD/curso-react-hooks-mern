import React from 'react';
import { shallow } from 'enzyme';
import { HookApp } from '../HookApp'

describe('Test HookApp', () => {
  test('Debe mostrar correctamente MatchTestHookApp', () => {

    const wrapper = shallow(<HookApp />)
    expect(wrapper).toMatchSnapshot();

  })

})
