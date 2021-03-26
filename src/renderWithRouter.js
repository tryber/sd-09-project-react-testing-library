//src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  // console.log({...render(<Router history={history}>{component}</Router>), history})
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

export default renderWithRouter;
