import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Test the about page', () => {
  const renderApp = () => renderWithRouter(<About />);

  it('Should have all informations about pokedex', () => {
    const { getByText } = renderApp();
    const textPokedex = getByText(/This application simulates a Pokédex/i);

    expect(textPokedex).toBeInTheDocument();
  });

  it('should have a heading h2 with information about pokedex', () => {
    const { getByRole } = renderApp();
    const Heading = getByRole('heading');

    expect(Heading).toBeInTheDocument();
    expect(Heading.innerHTML).toBe('About Pokédex');
  });

  it('should have two paragraphs about pokedex', () => {
    const { getAllByText } = renderApp();
    const paragraphs = getAllByText(/Pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  it('should have one image of pokedex', () => {
    const { getByRole } = renderApp();
    const pokedexImage = getByRole('img');
    const pokedexImageImg = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.getAttribute('src')).toBe(pokedexImageImg);
  });
});
