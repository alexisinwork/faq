import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import withTestRouter from '../../../utils/withTestRouter'
import App from '..'

const setup = () => {
  const push = jest.fn();

  const wrapper = render(withTestRouter(<App />,
    {
      push,
      pathname: "/order-details"
    }
  ))

  const heading = wrapper.getByTestId('heading')
  const input = wrapper.getByTestId('search-input')
  const contactForm = wrapper.getByTestId('contact-form')
  const orderDetails = wrapper.getByTestId('order-details')

  return {
    heading,
    input,
    contactForm,
    orderDetails,
    push,
    ...wrapper,
  }
}
// fireEvent.click(screen.getByText('Load Greeting'))
// await waitFor(() => screen.getByRole('heading'))
// expect(screen.getByTestId('heading')).toHaveTextContent('hello there')
// expect(screen.getByTestId('button')).toHaveAttribute('disabled')
describe('<App /> ', () => {
  it('loads and displays header', () => {
    const { heading } = setup()
    expect(heading).toHaveTextContent('Help Center')
  })

  describe('has a search input that is', () => {
    it('visible', () => {
      const { input } = setup()
      expect(input).toBeDefined()
    })

    it('interactable', () => {
      const { input } = setup()
      fireEvent.change(input, { target: { value: 'Order...' } })
      expect(input.value).toBe('Order...')
    })
  })

  describe('has Contact form and Order Details cards where', () => {
    describe('Contact Form card is', () => {
      it('visible', () => {
        const { contactForm } = setup()
        expect(contactForm).toBeDefined()
      })
  
      it('redirecting to /contact-page', () => {
        const { contactForm, push } = setup()
        fireEvent.click(contactForm)
        expect(push).toHaveBeenCalledWith("/contact-form");
      })
    })

    describe('Order Details card is', () => {
      it('visible', () => {
        const { orderDetails } = setup()
        expect(orderDetails).toBeDefined()
      })
  
      it('redirecting to /contact-page', () => {
        const { orderDetails, push } = setup()
        fireEvent.click(orderDetails)
        expect(push).toHaveBeenCalledWith("/order-details");
      })
    })
  })
})