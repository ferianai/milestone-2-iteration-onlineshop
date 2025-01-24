import AppShell from "@/components/layouts/AppShell";
import { render } from '@testing-library/react';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',  
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

test('AppShell renders with children', () => {
  const appShell = render(<AppShell children={<div>Test Content</div>} />);
  expect(appShell).toMatchSnapshot();
});

test('AppShell renders correctly', () => {
  const appShell = render(<AppShell children={<div>Test Content</div>} />);
  expect(appShell).toMatchSnapshot();
});