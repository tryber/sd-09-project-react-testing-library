import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/RenderWithRouter';

describe('Testes para o componente <Pokemon detail />', () => {
  it('Verifica se o texto `nome detail` foi renderizado', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    userEvent.click(screen.getByText('More details'));
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  it('Verifica se o texto `nome detail` não foi renderizado', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    userEvent.click(screen.getByText(/More details/i));
    expect(screen.queryByText(/More details/i)).toBeNull();
  });

  it('Verifica se há um heading h2 com o texto `Summary`', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText(/More details/i));
    const heading = screen.getByText(/Summary/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se há um parágrafo com o resumo do pokémon', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText(/More details/i));
    const heading = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se há um heading h2 com o texto `Game Locations of <name>`', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText(/More details/i));
    const heading = screen.getByText(/Game Locations of Pikachu/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se há mapas indicando a localização do pokémon', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText(/More details/i));
    const altText = screen.getAllByAltText(/Pikachu location/i);
    expect(altText.length).toBe(2);
  });

  it('Verifica se há um atributo src com a URL da localização', () => {
    renderWithRouter(<App />);

    const path = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

    userEvent.click(screen.getByText(/More details/i));
    const altText = screen.getAllByAltText(/Pikachu location/i);
    expect(altText[0]).toHaveProperty('src', path);
  });

  it('Verifica funcionamento do checkbox para favoritar um pokémon', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText(/More details/i));
    const checkbox = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);
    screen.getByAltText(/Pikachu is marked as favorite/i);
  });
});
