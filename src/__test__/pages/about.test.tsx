import { render, screen } from '@testing-library/react';
import AboutPage from '@/pages/about';

describe('AboutPage', () => {
  it('renders the About Page', () => {
    const page = render(<AboutPage />);
    console
    expect(page).toMatchSnapshot();
  });
});
