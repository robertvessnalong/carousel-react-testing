import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', () => {
  render(<Carousel />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
});

it('works when you click the left arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();

  // // move backwards in the carousel
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();
});

it('show left and right arrow', function () {
  const { getByTestId } = render(<Carousel />);
  const rightArrow = getByTestId('right-arrow');
  const leftArrow = getByTestId('left-arrow');

  // Exepct to have hide on first image
  expect(leftArrow).toHaveClass('hide');
  fireEvent.click(rightArrow);

  // Expect not to have hide on second image
  expect(leftArrow).not.toHaveClass('hide');
  expect(rightArrow).not.toHaveClass('hide');

  // Expect to have hide on third image
  fireEvent.click(rightArrow);
  expect(rightArrow).toHaveClass('hide');
});
