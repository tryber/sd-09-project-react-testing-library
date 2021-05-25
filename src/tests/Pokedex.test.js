import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWhithRouter from '../components/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const proximoPokemon = 'Próximo pokémon';
test('Testa se a página contém um heading h2 com o texto Encountered pokémons.',
  () => {
    renderWhithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

test('Testa se aparece o próximo Pokémon ao clicar no botão Próximo pokémon.',
  () => {
    renderWhithRouter(<App pokemons={ pokemons } />);
    const btnProximoPokemon = screen.getByTestId('next-pokemon');
    expect(btnProximoPokemon).toHaveTextContent(proximoPokemon);

    pokemons.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
      userEvent.click(btnProximoPokemon);
    });
  });

test('Teste se é mostrado apenas um Pokémon por vez.',
  () => {
    renderWhithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

test('Teste se a Pokédex tem os botões de filtro.',
  () => {
    renderWhithRouter(<App />);
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    const buttonNext = screen.getByRole('button', { name: proximoPokemon });

    expect(buttonsType[0]).toHaveTextContent('Electric');
    userEvent.click(buttonsType[0]);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    expect(buttonsType[1]).toHaveTextContent('Fire');
    userEvent.click(buttonsType[1]);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();

    expect(buttonsType[2]).toHaveTextContent('Bug');
    expect(buttonsType[3]).toHaveTextContent('Poison');
    expect(buttonsType[4]).toHaveTextContent('Psychic');
    expect(buttonsType[5]).toHaveTextContent('Normal');
    expect(buttonsType[6]).toHaveTextContent('Dragon');
  });

test('Teste se a Pokédex contém um botão para resetar o filtro',
  () => {
    renderWhithRouter(<App />);
    const btnProxPokemon = screen.getByRole('button', { name: proximoPokemon });
    const btnResetar = screen.getByRole('button', { name: 'All' });
    const btnNormal = screen.getByRole('button', { name: 'Normal' });

    userEvent.click(btnNormal);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    expect(btnProxPokemon).toBeDisabled();

    userEvent.click(btnResetar);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(btnProxPokemon);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

test('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.',
  () => {
    renderWhithRouter(<App />);
    const array = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    array.forEach((item) => expect(
      screen.getByRole('button', { name: item }),
    ).toBeInTheDocument());
  });

test('Botão `Próximo` deve ser desabilitado quando tiver um só pokémon.',
  () => {
    renderWhithRouter(<App />);
    const btnProxPokemon = screen.getByRole('button', { name: proximoPokemon });
    const btnNormal = screen.getByRole('button', { name: 'Normal' });
    expect(btnProxPokemon).not.toBeDisabled();
    userEvent.click(btnNormal);
    expect(btnProxPokemon).toBeDisabled();
  });
