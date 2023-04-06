// import localStorageMock from '../../../src/testing-resources/mocks/localStorageMock';
import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import AuthenticatedRoute from '../AuthenticatedRoute';

// global.localStorage = localStorageMock;
// TODO:  enhance the tests
describe('localStorage', () => {
  // beforeEach(() => localStorageMock.clear());

  // it('is initialized properly', () => expect(localStorageMock.store).toEqual({}));

  it("redirect if user doesn't exist", async () => {
    render(<AuthenticatedRoute />);
    await waitFor(() => {
      // const user = localStorageMock.getItem('user');
      // expect(user).toBeUndefined();
      // expect(screen.queryByText("Dashboard")).not.toBeInTheDocument;
      // expect(screen.queryByText("login")).toBeInTheDocument;
    });
  });

  // it('sets the value of a user', () => {
  //   localStorageMock.setItem('user', {});
  //   expect(localStorageMock.store).toEqual({ user: {} });
  // });

  // it('gets the value of a user', () => {
  //   localStorageMock.setItem('user', {});
  //   const user = localStorageMock.getItem('user');
  //   expect(user).toStrictEqual({});
  // });
});
