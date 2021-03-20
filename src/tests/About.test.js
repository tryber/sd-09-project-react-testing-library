import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import { About } from '../components';

describe('Second requirement, testing the About.js component', () => {
  it('has the info about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraphOnAboutPage1 = 'This application simulates a Pokédex, ';
    const paragraphOnAboutPage2 = 'a digital encyclopedia containing all Pokémons';
    const fullParagraphOnAboutPage = paragraphOnAboutPage1 + paragraphOnAboutPage2;
    const infoAbout = getByText(fullParagraphOnAboutPage);
    expect(infoAbout).toBeInTheDocument();
  });

  it('has a heading with text `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutHeading = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('has a Pokédex image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImage = getByRole('img');
    expect(pokedexImage).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
