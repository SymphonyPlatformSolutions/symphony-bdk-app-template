import React from 'react';
import { shallow } from 'enzyme';
import '../../utils/setup-tests';
import Contact from '../../samples/contact-list-app/contact';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <Contact />,
  );
});

describe('A contact list', () => {
  it('Should have a li items', () => {
    expect(wrapper.find('li').length).toEqual(3);
  });
});
