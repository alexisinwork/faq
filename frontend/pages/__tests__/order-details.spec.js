import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import OrderDetails from '../order-details/[orderRef]'
import { ORDERS } from '../../utils/mocks/mockedOrders'

const setup = (orderRef = 'AXG543') => {
  const wrapper = render(withTestRouter(
    <OrderDetails orders={ORDERS} />,
    {
      push,
      pathname: `/order-details/${orderRef}`,
      query = { orderRef }
    }
  ))

  const heading = wrapper.getByTestId('heading')
  const searchInput = wrapper.getByTestId('order-search')
  const searchBtn = wrapper.getByTestId('search-button')
  const orderWrapper = wrapper.getByTestId('order')
  const orderReference = wrapper.getByTestId('order-reference')
  const orderIcon = wrapper.getByTestId('order-icon')
  const orderDeliveryStatus = wrapper.getByTestId('order-delivery-status')
  const orderCost = wrapper.getByTestId('order-cost')

  return {
    heading,
    searchInput,
    searchBtn,
    orderWrapper,
    orderReference,
    orderIcon,
    orderDeliveryStatus,
    orderCost,
    showOrder,
    ...wrapper,
  }
}

describe('<OrderDetails /> ', () => {
  it('loads and displays header', () => {
    const { heading } = setup()
    expect(heading).toHaveTextContent('Order Details')
  })

  describe('has a Search input that is', () => {
    it('visible', () => {
      const { searchInput } = setup()
      expect(searchInput).toBeDefined()
    })

    it('has visible button', () => {
      const { searchBtn } = setup()
      expect(searchBtn).toBeDefined()
    })
  })

  describe('has an Order wrapper that is', () => {
    it('not visible', () => {
      const { orderWrapper } = setup()
      expect(orderWrapper).not.toBeDefined()
    })

    it('visible after search', async () => {
      const { orderWrapper, showOrder } = setup()
      await showOrder()
      expect(orderWrapper).toBeDefined()
    })

    describe('and has ', () => {
      it('order reference', async () => {
        const { orderReference, showOrder } = setup()
        await showOrder()
        expect(orderReference).toHaveTextContent('AXG543')
      })

      it('order delivery icon', async () => {
        const { orderIcon, showOrder } = setup()
        await showOrder()
        expect(orderIcon).toBeDefined()
      })

      it('order delivery status', async () => {
        const { orderDeliveryStatus, showOrder } = setup()
        await showOrder()
        expect(orderDeliveryStatus).toBeDefined('Not delivered')
      })

      it('order cost', async () => {
        const { orderCost, showOrder } = setup()
        await showOrder()
        expect(orderCost).toHaveTextContent('8.20')
      })
    })
  })
})