import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testes do componente Pokemon Details', () => {
  const textButtonDetails = 'More details';
  it('Teste se as informaçẽos detalhadas do pokemon está na tela', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByText(textButtonDetails);
    userEvent.click(buttonDetails);
    const title = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(screen.getByText(/This intelligent Pokémon roasts hard berries with/i))
      .toBeInTheDocument();
    expect(screen.getByText(/electricity to make them tender enough to eat./i))
      .toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(buttonDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    const habitat = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const imgSrcMap = [
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    renderWithRouter(<App />);
    userEvent.click(screen.queryByText(textButtonDetails));
    const imgsMap = screen.getAllByAltText(/pikachu location/i);
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    })).toBeInTheDocument();

    expect(screen.getByText(habitat[0])).toBeInTheDocument();
    expect(screen.getByText(habitat[1])).toBeInTheDocument();
    expect(imgsMap).toHaveLength(2);
    expect(imgsMap[0].src).toContain(imgSrcMap[0]);
    expect(imgsMap[1].src).toContain(imgSrcMap[1]);
    expect(imgsMap[0].alt).toBe('Pikachu location');
    expect(imgsMap[1].alt).toBe('Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokemon', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByText(textButtonDetails);
    userEvent.click(buttonDetails);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    userEvent.click(screen.getByText('Favorite Pokémons'));
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    userEvent.click(screen.getByText('Home'));

    userEvent.click(screen.getByText(textButtonDetails));
    userEvent.click(checkbox);
    userEvent.click(screen.getByText('Favorite Pokémons'));
    // expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });
});
