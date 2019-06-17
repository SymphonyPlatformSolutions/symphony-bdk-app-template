import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'reducers';
import RoomsSelectorContainer from 'components/room-selector';

jest.mock('../../../reducers/users/actions'); // use the "action-user" mock under "__mocks__" folder

const feature = loadFeature('extension-app/features/rooms.feature');

defineFeature(feature, (test) => {
  const store = configureStore(); // uses the real store

  const {
    getByText,
    getByTitle,
  } = render(
    <Provider store={store}>
      <RoomsSelectorContainer />
    </Provider>,
  );

  test('Starts initially with no selected room', ({ given, when }) => {
    given('Selector mounted', () => {
      const select = getByTitle(/room-selector/i, { selector: 'select' });
      expect(select).toBeTruthy();
    });

    when('Starts with no selected room', () => {
      const noRoomSelected = getByText(/Select a room/i, { selector: 'p' });
      expect(noRoomSelected).toBeTruthy();
    });
  });

  test('Clicking on the selector shows users allowed rooms', ({
    given, when, then, and,
  }) => {
    given('No room has been selected', () => {
      const select = getByTitle(/room-selector/i, { selector: 'select' });
      expect(select.selectedIndex).toBe(0);
    });

    when(/^I select option (.*)$/, (room) => {
      const select = getByTitle(/room-selector/i, { selector: 'select' });
      const option = select.querySelector(`option[label="${room}"]`);
      fireEvent.change(select, { target: { value: option.value } });
    });

    then(/^Shows (.*) contacts to me$/, (contactsLength) => {
      const contactsList = getByTitle(/contact-list/i, { selector: 'ul' });
      expect(contactsList.childElementCount.toString()).toEqual(contactsLength);
    });

    and(/^Contacts are (.*)$/, (contacts) => {
      const contactsHtmUllelement = getByTitle(/contact-list/i, { selector: 'ul' });
      const contactHtmlLiElements = Array.from(contactsHtmUllelement.children);
      const contactsRendered = contactHtmlLiElements.map(li => li.textContent).join(', ');
      expect(contactsRendered).toEqual(contacts);
    });

    and('Resets the select', () => {
      const select = getByTitle(/room-selector/i, { selector: 'select' });
      select.selectedIndex = 0;
    });
  });
});
