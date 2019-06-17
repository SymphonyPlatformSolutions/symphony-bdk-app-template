import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllowedUserRooms, fetchUserContacts } from 'reducers/users/actions';

export class RoomsSelectorContainer extends React.Component {
  state = {
    selectedStreamId: '',
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getAllowedUserRooms();
  }

  handleRoomChange = (threadId) => {
    const { actions } = this.props;
    if (!threadId) {
      this.setState({ selectedStreamId: '' });
    } else {
      this.setState({ selectedStreamId: threadId });
      actions.fetchUserContacts(threadId);
    }
  }


    buildList = contacts => (contacts && contacts.length > 0 ? (
      <ul title="contact-list">
        { contacts.map(contact => (<li key={contact.id}>{contact.name}</li>))}
      </ul>
    ) : <p>Select a Room</p>)


    render() {
      const { rooms, contacts } = this.props;
      const { selectedStreamId } = this.state;
      return (
        <>
          <select
            title="room-selector"
            value={selectedStreamId}
            onChange={e => this.handleRoomChange(e.target.value)}
          >
            <option hidden>Select a chat room</option>
            {rooms && rooms.map(room => (
              <option
                alt="Room Option"
                label={room.name}
                key={room.threadId}
                value={room.threadId}
              />
            ))}
          </select>
          { this.buildList(contacts)}
        </>
      );
    }
}

RoomsSelectorContainer.propTypes = {
  rooms: PropTypes.array,
  contacts: PropTypes.array,
  actions: PropTypes.object,
};

RoomsSelectorContainer.defaultProps = {
  rooms: null,
  contacts: null,
  actions: null,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllowedUserRooms,
    fetchUserContacts,
  }, dispatch),
});

const mapStateToProps = state => ({
  rooms: state.user.allowedUserRooms,
  contacts: state.user.contacts,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSelectorContainer);
