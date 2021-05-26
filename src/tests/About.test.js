import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const paragraph = getByText(/This application simulates a Pokédex/i);
  expect(paragraph).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  render(<About />);
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(h2).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const paragraph = getByText(/This application simulates a Pokédex/i);
  const paragraph2 = getByText(/One can filter Pokémons by type,/i);
  expect(paragraph).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  render(<About />);
  const containsImg = screen.getByAltText('Pokédex');
  expect(containsImg.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
