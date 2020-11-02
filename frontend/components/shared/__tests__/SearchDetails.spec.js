import { render, fireEvent, waitFor } from '@testing-library/react'
import { SearchDetails } from '..'

const setup = (searchInput = '') => {
  const setSearchInput = jest.fn();
  const onSearch = jest.fn();

  const wrapper = render(<SearchDetails
    searchInput={searchInput}
    searchUpdate={setSearchInput}
    onSearch={onSearch}
    searchId={'search-input'}
    submitId={'submit'}
  />)

  const input = wrapper.getByTestId('search-input')
  const submit = wrapper.getByTestId('submit')

  return {
    input,
    submit,
    setSearchInput,
    onSearch,
    ...wrapper,
  }
}

describe('<SearchDetails /> ', () => {
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

    it('has working callback', () => {
      const { input, setSearchInput } = setup()

      fireEvent.change(input, { target: { value: 'Order...' } })

      expect(setSearchInput).toHaveBeenCalled()
      expect(setSearchInput).toHaveBeenCalledWith('Order...')
    })
  })

  describe('has a submit search button that is', () => {
    it('visible', () => {
      const { submit } = setup()

      expect(submit).toBeDefined()
    })

    it('trigger callback on click', async () => {
      const { submit, onSearch } = setup('Hiyakuka')

      fireEvent.click(submit)

      expect(onSearch).toHaveBeenCalled();
    })
  })
})