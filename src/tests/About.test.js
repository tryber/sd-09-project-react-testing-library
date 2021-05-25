import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Testa se a página possui o título About Pokédex', () => {
  const { getByRole } = render(<About />);

  const aboutTitle = getByRole('heading', { level: 2 });
  expect(aboutTitle).toBeInTheDocument();
  expect(aboutTitle).toHaveTextContent('About Pokédex');
});

test('Testa se a página possui dois parágrafos com o texto Pokédex', () => {
  const { getByText } = render(<About />);

  const p1 = getByText(/This application simulates a Pokédex/i);
  const p2 = getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );

  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
});

test('Testa se a página possui uma imagem na Pokédex', () => {
  const { getByRole } = render(<About />);

  const image = getByRole('img');
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
