import updatePageView from '../updatePageView'

const successResult = "Some data";
const getSuccess = jest.fn(() => Promise.resolve(successResult));
const getFail = jest.fn(() => Promise.reject(new Error()));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

describe('updatePageView is', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("updating real pageViews", async () => {
    fetch.mockImplementationOnce(() => Promise.resolve("Yahoo!"));
    
    const res = await updatePageView('home')

    expect(res).toEqual("Yahoo!")
    expect(fetch).toHaveBeenCalledTimes(1);
  }) 
})