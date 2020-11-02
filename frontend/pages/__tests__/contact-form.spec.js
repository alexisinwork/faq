import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import ContactForm from '../contact-form'
import { ORDERS } from '../../utils/mocks/mockedOrders'

const setup = () => {
  const wrapper = render(<ContactForm orders={ORDERS} />)

  const heading = wrapper.getByTestId('heading')
  const dropdownMenu = wrapper.getByTestId('dropdown-basic')
  const inputName = wrapper.getByTestId('name-input')
  const inputPhone = wrapper.getByTestId('phone-input')
  const inputEmail = wrapper.getByTestId('email-input')
  const inputMessage = wrapper.getByTestId('message-input')
  const submit = wrapper.getByTestId('submit')
  // In Captcha case operate with classNames
  const captcha = wrapper.container.querySelector('.recaptcha-checkbox')

  return {
    heading,
    dropdownMenu,
    inputName,
    inputPhone,
    inputEmail,
    inputMessage,
    captcha,
    submit,
    ...wrapper,
  }
}

describe('<ContactForm /> ', () => {
  it('loads and displays header', () => {
    const { heading } = setup()
    expect(heading).toHaveTextContent('Contact Form')
  })

  describe('has a Order reference dropdown that is', () => {
    it('visible', () => {
      const { dropdownMenu } = setup()
      expect(dropdownMenu).toBeDefined()
    })

    it('interactable', async () => {
      let dropdownItems = []
      const { dropdownMenu } = setup()
      fireEvent.click(dropdownMenu)
      
      await waitFor(() => {
        dropdownItems = screen.getAllByTestId('dropdown-item')
        expect(dropdownItems.length).toEqual(6)
      })

      const firstOrder = dropdownItems[0]
      fireEvent.click(firstOrder)
      expect(dropdownMenu).toHaveTextContent('AXG543')
    })
  })

  describe('has a Name input that is', () => {
    it('visible', () => {
        const { inputName } = setup()
        expect(inputName).toBeDefined()
    })

    it('interactable', () => {
        const { inputName } = setup()
        fireEvent.change(inputName, { target: { value: 'Haujahha!' } })
        expect(inputName.value).toBe('Haujahha!')
    })
  })

  describe('has a Phone input that is', () => {
    it('visible', () => {
        const { inputPhone } = setup()
        expect(inputPhone).toBeDefined()
    })

    it('interactable', () => {
        const { inputPhone } = setup()
        fireEvent.change(inputPhone, { target: { value: 'Haujahha!' } })
        expect(inputPhone.value).toBe('Haujahha!')
    })
  })

  describe('has a Email input that is', () => {
    it('visible', () => {
        const { inputEmail } = setup()
        expect(inputEmail).toBeDefined()
    })

    it('interactable', () => {
        const { inputEmail } = setup()
        fireEvent.change(inputEmail, { target: { value: 'Haujahha!' } })
        expect(inputEmail.value).toBe('Haujahha!')
    })
  })

  describe('has a Message area that is', () => {
    it('visible', () => {
        const { inputMessage } = setup()
        expect(inputMessage).toBeDefined()
    })

    it('interactable', () => {
        const { inputMessage } = setup()
        fireEvent.change(inputMessage, { target: { value: 'Haujahha!' } })
        expect(inputMessage.value).toBe('Haujahha!')
    })
  })

  describe('has a ReCaptcha that is', () => {
    it('visible', () => {
        const { captcha } = setup()
        expect(captcha).toBeDefined()
    })
  })

  describe('has a Submit button that is', () => {
    it('visible', () => {
        const { submit } = setup()
        expect(submit).toBeDefined()
    })

    it('disabled', () => {
      const { submit } = setup()
      expect(submit).toBeDisabled()
    })
  })
})