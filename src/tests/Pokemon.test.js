import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test if a card is rendered with the information of a certain Pokémon.', () => {
  test('If the name, type, weight and image of the Pokémon is shown the screen', () => {
    renderWithRouter(<App />);
    const buttonPsychic = screen.getByRole('button', {
      name: /Psychic/,
    });
    userEvent.click(buttonPsychic);
    const alakazam = screen.getByText('Alakazam');
    const psychic = screen.getByTestId('pokemonType');
    const averageWeight = screen.getByText(/average weight: 48\.0 kg/i);
    const img = screen.getByRole('img', {
      name: /alakazam sprite/i,
    });
    expect(alakazam).toBeInTheDocument();
    expect(psychic).toHaveTextContent('Psychic');
    expect(averageWeight).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch('https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
  });
  test('if there is a star icon on favorite Pokémon', () => {
    renderWithRouter(<App />);
    const buttonPsychic = screen.getByRole('button', {
      name: /Psychic/,
    });
    userEvent.click(buttonPsychic);
    const moreDetailsPsychic = screen.getByRole('link', {
      name: /More details/,
    });
    userEvent.click(moreDetailsPsychic);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const favoriteStar = screen.getByRole('img', {
      name: /Alakazam is marked as favorite/,
    });
    expect(favoriteStar.src).toMatch(/star-icon.svg/);
    const navFavoritePokémons = screen.getByRole('navigation').children[2];
    userEvent.click(navFavoritePokémons);
    const divAlakazam = screen.getByText('Alakazam');
    expect(divAlakazam).toBeInTheDocument();
  });
});
