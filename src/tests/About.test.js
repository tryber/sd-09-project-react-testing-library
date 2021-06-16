import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requisito 02', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const tagH2 = container.querySelector('h2');
    expect(tagH2.textContent).toBe('About Pokédex');
  });

  test('Contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const twoPokedex = getAllByText(/Pokédex/);
    expect(twoPokedex.length).toBe(2);
  });

  test('Contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imgAbout = getByAltText('Pokédex');
    expect(imgAbout.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
