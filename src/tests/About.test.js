import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('should have pokedex informations in the page', () => {
  const { getByRole, container } = render(<About />);

  const h2 = getByRole('heading', { level: 2 });
  expect(h2).toHaveTextContent('About Pokédex');

  const paragraphs = container.getElementsByTagName('p');
  expect(paragraphs).toHaveLength(2);

  const img = getByRole('img');
  expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
