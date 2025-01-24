import { render } from '@testing-library/react';
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

test('navbar renders with ShopSmart text', () => {
  const footerText = render(<Navbar />);
  expect(footerText).toMatchSnapshot();
});
