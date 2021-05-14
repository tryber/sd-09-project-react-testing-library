import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Verificando About Pokedéx', () => {
  const { getByText } = render(<About />);
  const aboutPoke = getByText('About Pokédex');
  expect(aboutPoke).toBeInTheDocument();
});

test('Verificando tags p', () => {
  render(<About />);
  const paragrafos = document.querySelectorAll('p');
  expect(paragrafos.length).toBe(2);
});

test('Verificando foto', () => {
  const { getByRole } = render(<About />);
  const img = getByRole('img');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
