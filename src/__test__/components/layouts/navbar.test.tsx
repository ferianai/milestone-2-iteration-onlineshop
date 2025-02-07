import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layouts/Navbar';

// Mock the useRouter hook
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
      pathname: '/',  
      query: {},
      push: jest.fn(),
      replace: jest.fn(),
    }),
  }));

// Mock localStorage and cookies for testing
beforeEach(() => {
  // Reset the mock values before each test
  localStorage.clear();
  document.cookie = "";
});

test('navbar renders with Home text', () => {
  const footerText = render(<Navbar />);
  expect(footerText).toMatchSnapshot();
});

test('handleLogout clears localStorage, cookies, and redirects to login page', () => {
  // Set up initial localStorage and cookies
  localStorage.setItem('access_token', 'test_access_token');
  localStorage.setItem('refresh_token', 'test_refresh_token');
  localStorage.setItem('user_email', 'user@example.com');
  localStorage.setItem('user_name', 'Test User');
  document.cookie = "access_token=test_access_token; path=/";
  document.cookie = "refresh_token=test_refresh_token; path=/";

  // Render the Navbar component
  render(<Navbar />);

  // Ensure the 'Logout' button is rendered
  const logoutButton = screen.getByText('Logout');
  expect(logoutButton).toBeInTheDocument();

  // Simulate click on the logout button
  fireEvent.click(logoutButton);

  // Check that the localStorage items were removed
  expect(localStorage.getItem('access_token')).toBeNull();
  expect(localStorage.getItem('refresh_token')).toBeNull();
  expect(localStorage.getItem('user_email')).toBeNull();
  expect(localStorage.getItem('user_name')).toBeNull();

  // Check that cookies are cleared
  expect(document.cookie).toBe(''); // Assuming cookies are cleared correctly

  // Check that the state variables were updated to null
  expect(screen.queryByText('Test User')).toBeNull();

  // Check that the router push method was called to redirect to the login page
  const router = useRouter();
  expect(router.push).toHaveBeenCalledWith('/auth/login');
});
