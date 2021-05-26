import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const paragraphs = getByText(/This application simulates a Pokédex/i);
  expect(paragraphs).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const h2 = getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('About Pokédex');
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const paragraphs = getAllByText(/Pokémons/i);
  expect(paragraphs.length).toBe(2);
});

test('Teste se a página contém determinada imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const imgSrc = (
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
  );
  const img = getByRole('img');
  expect(img.src).toBe(imgSrc);
});
