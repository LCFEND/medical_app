import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders app without errors', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> 
      <App />
    </MemoryRouter>
  );

  // Example test (modify according to your app)
  const navbarElement = screen.getByRole('navigation'); // Check if the Navbar is rendered
  expect(navbarElement).toBeInTheDocument();
});
