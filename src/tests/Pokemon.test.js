import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWhithRouter from '../components/RenderWithRouter';
import App from '../App';

const moreDetails = 'More details';
test('Teste se é renderizado um card com as informações de determinado pokémon.',
  () => {
    renderWhithRouter(<App />);
    const nomePok = screen.getByTestId('pokemon-name');
    const tipoPok = screen.getByTestId('pokemonType');
    const pesoPok = screen.getByTestId('pokemon-weight');
    const imgPok = screen.getByAltText('Pikachu sprite');

    expect(nomePok).toHaveTextContent('Pikachu');
    expect(tipoPok).toHaveTextContent('Electric');
    expect(pesoPok).toHaveTextContent('Average weight: 6.0 kg');
    expect(imgPok.src).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

test('Teste se o card do Pokémon contém um link detalhes do Pokémon.',
  () => {
    renderWhithRouter(<App />);
    const linkText = screen.getByText(moreDetails);
    expect(linkText).toBeInTheDocument();
  });

test('Teste se ao clicar no link , é redirecionamento para a página de detalhes.',
  () => {
    const { history } = renderWhithRouter(<App />);
    const linkText = screen.getByText(moreDetails);
    userEvent.click(linkText);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

test('Teste se existe um ícone de estrela nos Pokémons favoritados.',
  () => {
    renderWhithRouter(<App />);
    const detailsPokemon = screen.getByText(moreDetails);
    expect(detailsPokemon).toBeInTheDocument();
    userEvent.click(detailsPokemon);
    const labelForm = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(labelForm);
    const imgFavorito = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorito).toBeInTheDocument();
    expect(imgFavorito.src).toBe('http://localhost/star-icon.svg');
  });
