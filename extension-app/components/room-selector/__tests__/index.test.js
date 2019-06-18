import React from 'react';
import { shallow } from 'enzyme';
import { simplifyRooms, filterAllowedRooms } from 'utils/helpers/help-functions';
import { RoomsSelectorContainer } from '../index';

let wrapper;

const rawRooms = [
  {
    id: 1,
    name: 'Room A',
    threadId: 'abc/def//ghi+jkl==',
    memberAddUserEnabled: true,
    userIsOwner: true,
    publicRoom: false,
  },
  {
    id: 2,
    name: 'Room B',
    threadId: 'abc/def//ghi+123==',
    memberAddUserEnabled: false,
    userIsOwner: false,
    publicRoom: false,
  },
  {
    id: 3,
    name: 'Room C',
    threadId: 'abc/def//ghi+456==',
    memberAddUserEnabled: true,
    userIsOwner: false,
    publicRoom: true,
  },
];

const actions = {
  getAllowedUserRooms: jest.fn(() => rawRooms),
  fetchUserContacts: jest.fn(),
};

beforeEach(() => {
  wrapper = shallow(
    <RoomsSelectorContainer
      rooms={simplifyRooms(filterAllowedRooms(rawRooms))}
      actions={actions}
    />,
  );
});

describe('The RoomsSelectorContainer', () => {
  it('Should handle "componentDidMount"', () => {
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().props.actions.getAllowedUserRooms).toHaveBeenCalled();
  });

  it('Should handle "handleRoomChange" when room is selected', () => {
    wrapper.instance().handleRoomChange('abc');
    expect(wrapper.instance().state.selectedStreamId).toEqual('abc');
    expect(actions.fetchUserContacts).toHaveBeenCalled();
  });
  //
  it('Should handle "handleRoomChange" when room is cleared', () => {
    wrapper.instance().handleRoomChange(null);
    expect(wrapper.instance().state.selectedStreamId).toEqual('');
  });
  //
  it('Should render a "select" element', () => {
    expect(wrapper.find('select').exists()).toBeTruthy();
  });
});
