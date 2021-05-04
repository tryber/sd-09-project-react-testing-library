import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText, getByAltText } = render(<About />);

  const aboutText = getByText(/This application simulates a Pokédex/i);

  expect(aboutText).toBeInTheDocument();

  const otherText = getByText(/One can filter Pokémons by type/i);

  expect(otherText).toBeInTheDocument();

  const heading = getByText('About Pokédex');

  expect(heading).toBeInTheDocument();

  const imgAlt = getByAltText('Pokédex');

  expect(imgAlt.getAttribute('src')).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
