import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  test('Verifica se a página contém um heading h2 "Encountered pokémons" ', () => {
    renderWithRouter(<App />);

    const aboutMeText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(aboutMeText).toBeInTheDocument();
  });
});

test('Teste se é exibido o próximo Pokémon ao clicar no botão Próximo pokémon.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Próximo pokémon/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  fireEvent.click(getByText(/All/i));
});

test('Testa se a Pokédex tem os botões de filtro.', () => {
  const { getAllByTestId, getAllByRole, getByRole } = renderWithRouter(
    <App />,
  );
  const typesLength = 7;
  const button = getAllByTestId('pokemon-type-button');
  expect(button).toHaveLength(typesLength);

  const fire = getAllByRole('button', {
    name: /fire/i,
  });
  const psychic = getAllByRole('button', {
    name: /psychic/i,
  });
  const electric = getAllByRole('button', {
    name: /electric/i,
  });
  const normal = getAllByRole('button', {
    name: /normal/i,
  });
  expect(fire).toHaveLength(1);
  expect(psychic).toHaveLength(1);
  expect(electric).toHaveLength(1);
  expect(normal).toHaveLength(1);

  const buttonAll = getByRole('button', {
    name: /all/i,
  });
  expect(buttonAll).toBeInTheDocument();
});
