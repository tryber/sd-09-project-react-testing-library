import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWhithRouter from '../components/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';
test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
  () => {
    renderWhithRouter(<App />);
    const string = ('This intelligent Pokémon roasts hard berries '
    + 'with electricity to make them tender enough to eat.');
    const linkDatalhes = screen.getByText(moreDetails);
    userEvent.click(linkDatalhes);

    const textoDetalhes = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    const headingSumario = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const textoSumario = screen.getByText('Summary');
    expect(textoDetalhes).toBeInTheDocument();
    expect(linkDatalhes).not.toBeInTheDocument();
    expect(headingSumario).toBeInTheDocument();
    expect(textoSumario).toBeInTheDocument();
    expect(textoSumario.nextSibling.textContent).toBe(string);

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

test('Teste se existe na página uma seção com os mapas de localizações do pokémon',
  () => {
    renderWhithRouter(<App pokemons={ pokemons } />);
    const linkDatalhes = screen.getByText(moreDetails);
    userEvent.click(linkDatalhes);

    const textoMapas = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(textoMapas).toBeInTheDocument();

    const imgLocalizacao = screen.getAllByAltText('Pikachu location');
    expect(pokemons[0].foundAt.length).toBe(imgLocalizacao.length);
    expect(imgLocalizacao[0].src).toBe(
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(imgLocalizacao[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
  () => {
    renderWhithRouter(<App />);
    const linkDatalhes = screen.getByText(moreDetails);
    userEvent.click(linkDatalhes);

    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    expect(checkBox.checked).toBeTruthy();
    userEvent.click(checkBox);
    expect(checkBox.checked).toBeFalsy();
    expect(checkBox.previousSibling.textContent).toBe('Pokémon favoritado?');
  });
