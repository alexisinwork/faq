import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import OrderDetails from '../order-details/[orderRef]'
import withTestRouter from '../../utils/mocks/withTestRouter'
import { ORDERS } from '../../utils/mocks/mockedOrders'

const setup = (orderRef = 'AXG543') => {
  let heading, searchInput, searchBtn, orderWrapper,
      orderReference, orderDeliveryStatus, orderCost
  const push = jest.fn();

  const wrapper = render(withTestRouter(
    <OrderDetails orders={ORDERS} />,
    {
      push,
      pathname: `/order-details/${orderRef}`,
      query: { orderRef }
    }
  ))

  heading = wrapper.getByTestId('heading')
  searchInput = wrapper.getByTestId('order-search')
  searchBtn = wrapper.getByTestId('search-button')

  if (ORDERS.find(order => order.reference === orderRef)) {
    orderWrapper = wrapper.getByTestId('order')
    orderReference = wrapper.getByTestId('order-reference')
    orderDeliveryStatus = wrapper.getByTestId('order-delivery-status')
    orderCost = wrapper.getByTestId('order-cost')
  }

  return {
    heading,
    searchInput,
    searchBtn,
    orderWrapper,
    orderReference,
    orderDeliveryStatus,
    orderCost,
    push,
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

    it('reloading to /AXG543', () => {
      const { searchBtn, push } = setup()
      fireEvent.click(searchBtn)
      expect(push).toHaveBeenCalledWith("AXG543");
    })
  })

  describe('has an Order wrapper that is', () => {
    it('not visible for non-existent order', () => {
      const { orderWrapper } = setup('123')
      expect(orderWrapper).not.toBeDefined()
    })

    it('visible after search if order exist', () => {
      const { orderWrapper } = setup()
      expect(orderWrapper).toBeDefined()
    })

    describe('and has', () => {
      it('order reference', () => {
        const { orderReference } = setup()
        expect(orderReference).toHaveTextContent('AXG543')
      })

      it('order delivery status', () => {
        const { orderDeliveryStatus } = setup()
        expect(orderDeliveryStatus).toHaveTextContent('Not delivered')
      })

      it('order delivery status', () => {
        const { orderDeliveryStatus } = setup('ATU499')
        expect(orderDeliveryStatus).toHaveTextContent('Delivered')
      })

      it('order cost', () => {
        const { orderCost } = setup()
        expect(orderCost).toHaveTextContent('8.2')
      })
    })
  })
})