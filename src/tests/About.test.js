import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the About component', () => {
  test('the component About should render', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    userEvent.click(aboutLink);
    const pokedexInfo = getByText(/This application simulates a Pokédex/i);
    const headingLevel2 = getByRole('heading', { level: 2 });
    const image = getByRole('img');
    expect(pokedexInfo).toBeInTheDocument();
    expect(headingLevel2).toBeInTheDocument();
    expect(headingLevel2).toHaveTextContent('About Pokédex');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
