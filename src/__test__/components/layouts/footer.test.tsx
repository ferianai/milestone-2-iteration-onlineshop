import { render } from '@testing-library/react';
import Footer from '@/components/layouts/Footer';

test('footer renders with ShopSmart text', () => {
  const footerText = render(<Footer />);
  expect(footerText).toMatchSnapshot();
});
