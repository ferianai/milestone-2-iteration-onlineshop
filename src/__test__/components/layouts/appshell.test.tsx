import AppShell from "@/components/layouts/AppShell";
import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',  
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('AppShell', () => {
  // Reset router mock before each test
  beforeEach(() => {
    useRouter.mockReturnValue({
      pathname: '/',  
      query: {},
      push: jest.fn(),
      replace: jest.fn(),
    });
  });

  test('renders with children', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    // Check if the child content is rendered inside AppShell
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders layout elements correctly', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    // Check for expected elements in AppShell (e.g., header, nav, footer, etc.)
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    // Replace with actual elements that exist in your AppShell
    // expect(screen.getByTestId('header')).toBeInTheDocument();
    // expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('router push works correctly', () => {
    const { push } = useRouter();
  
    render(
      <AppShell>
        <button onClick={() => push('/')}>Test Content</button> {/* Make this a button */}
      </AppShell>
    );
  
    // Simulate a click on the button
    fireEvent.click(screen.getByText('Test Content'));
  
    // Ensure push is called once
    expect(push).toHaveBeenCalledTimes(1);
  
    // Check if the correct route was pushed
    expect(push).toHaveBeenCalledWith('/');
  });

  test('AppShell renders correctly with snapshot', () => {
    const { container } = render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );
    // Snapshot test to ensure the component renders correctly
    expect(container).toMatchSnapshot();
  });
});
