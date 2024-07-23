import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Pages/Navigation';

describe('Navigation Component', () => {
    // Test 1: Renders correctly
  test('renders correctly', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
    const navigationElements = screen.getAllByRole('navigation');
    // Checks if at least one navigation element is rendered
    expect(navigationElements.length).toBeGreaterThan(0);
    // Specifically checks for 2 navigation elements
    expect(navigationElements.length).toBe(2);
  });

  // Test 2: Verifies that navigation links have the correct text and lead to the correct routes
  test('verifies navigation links have correct text and lead to correct routes', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );

    const linksToTest = [
      { text: 'Home', expectedHref: '/' },
      { text: 'About', expectedHref: '/about' },
      { text: 'Menu', expectedHref: '/menu' },
      { text: 'Reservations', expectedHref: '/reservations' },
    ];

    linksToTest.forEach(({ text, expectedHref }) => {
      const links = screen.getAllByText(text);
      expect(links.length).toBeGreaterThan(0);
      links.forEach(link => {
        const closestAnchor = link.closest('a');
        // Ensures the link is wrapped in an <a> tag
        expect(closestAnchor).toBeDefined();
        // Checks that the <a> tag has the correct 'href' attribute
        expect(closestAnchor).toHaveAttribute('href', expectedHref);
      });
    });
  });

// Test 3: Navigates to the correct page on link click
  test('navigates to the correct page on link click', async () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
    const linksToTest = [
      { text: 'Home', expectedComponentText: 'We are a family' },
      { text: 'Home', expectedComponentText: 'highlights' },
      { text: 'Home', expectedComponentText: 'testimonials' },
      { text: 'About', expectedComponentText: 'Our modern, art-adorned space' },
      { text: 'Menu', expectedComponentText: 'Appetizers' },
      { text: 'Reservations', expectedComponentText: 'make your reservation' },
    ];

    linksToTest.forEach(({ text, expectedComponentText }) => {
      const regex = new RegExp(text, 'i');
      const links = screen.getAllByText(regex);
      // Ensures there is at least one link
      expect(links).not.toHaveLength(0);
      links.forEach((link, index) => {
        // Clicks on the current link
        fireEvent.click(link);
        // Checks if the expected text is present in the document
        expect(screen.getByText(new RegExp(expectedComponentText, 'i'))).toBeInTheDocument();
        // Cleans up the DOM and resets the state before the next iteration
        cleanup();
        // Rerenders the Navigation component for the next link
        render(
          <Router>
            <Navigation />
          </Router>
        );
      });
    });
  });

})
