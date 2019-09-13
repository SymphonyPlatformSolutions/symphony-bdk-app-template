import React, { useState, useEffect } from 'react';
import {
  PhoneInputField, Box, Button, Text, InputField,
} from 'sms-sdk-toolbox-ui';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  showInviteSuccess,
  showInviteError,
} from 'reducers/invites/actions';
import { frontendURL, setupLinkPrefix } from '../../../utils/system/setup-url';
import {
  StyledModal,
  StyledHeader,
  StyledNameBox,
  StyledLabel,
  StyledForm,
  FormErrorMessage,
} from './theme';

const SendInviteForm = ({
  hideModal,
  values,
  isValid,
  isSubmitting,
  errors,
  handleChange,
  handleSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [internalErrors, setInternalErrors] = useState({
    name: 'initial',
    surname: 'initial',
    email: 'initial',
    phoneNumber: 'initial',
  });

  useEffect(() => {
    setOpen(true);
  });

  const handleOnBlur = () => {
    setInternalErrors({
      name: errors.name ? 'error' : 'initial',
      surname: errors.surname ? 'error' : 'initial',
      email: errors.email ? 'error' : 'initial',
      phoneNumber: errors.phoneNumber && values.phoneNumber.length > 0 ? 'error' : 'initial',
    });
  };

  const openClassName = open ? 'open' : null;

  const nameErrors = errors.name || errors.surname;

  const isError = value => value === 'error';

  const phoneInputSyntheticEvent = (value) => {
    handleChange({
      target: {
        value,
        id: 'phoneNumber',
      },
    });
  };

  const stopCascade = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const logoUrl = `${frontendURL()}${setupLinkPrefix()}/assets/app-icon.svg`;

  return (
    <StyledModal className={openClassName}>
      <StyledForm onSubmit={stopCascade} title="Create Incident Form" onKey>
        <StyledHeader horizontal>
          <img alt="wechat" src={logoUrl} width="32px" height="32px" />
          <StyledLabel style={{ marginLeft: '5px' }}>WeChat</StyledLabel>
        </StyledHeader>
        <Box>
          <Text style={{ padding: 0 }}>Invite Users</Text>
          <Box horizontal justify="space-between">
            <StyledNameBox>
              <StyledLabel>Name</StyledLabel>
              <InputField
                data-testid="nameinput"
                id="name"
                inputState={internalErrors.name}
                onBlur={handleOnBlur}
                value={values.name}
                onChange={handleChange}
                placeholder="Enter text here"
              />
            </StyledNameBox>
            <StyledNameBox style={{ marginLeft: '10px' }}>
              <StyledLabel>Surname</StyledLabel>
              <InputField
                id="surname"
                data-testid="surnameinput"
                inputState={internalErrors.surname}
                onBlur={handleOnBlur}
                value={values.surname}
                onChange={handleChange}
                placeholder="Enter text here"
              />
            </StyledNameBox>
          </Box>
          <FormErrorMessage showError={isError(nameErrors)}>{nameErrors}</FormErrorMessage>
          <Box>
            <StyledLabel>Email</StyledLabel>
            <InputField
              data-testid="emailinput"
              id="email"
              inputState={internalErrors.email}
              onBlur={handleOnBlur}
              value={values.email}
              onChange={handleChange}
              placeholder="email address"
            />
            <FormErrorMessage showError={isError(internalErrors.email)}>{errors.email}</FormErrorMessage>
          </Box>
          <Box>
            <StyledLabel>PhoneNumber</StyledLabel>
            <PhoneInputField
              data-testid="phonenumberinput"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="+1 (702) 123-4567"
              inputState={internalErrors.phoneNumber}
              value={values.phoneNumber}
              onBlur={handleOnBlur}
              onChange={phoneInputSyntheticEvent}
            />
            <FormErrorMessage showError={isError(internalErrors.phoneNumber)}>{errors.phoneNumber}</FormErrorMessage>
          </Box>
          <Box horizontal justify="center" style={{ marginTop: '10px' }}>
            <Button type="primary" fill="outlined" onClick={hideModal}>Cancel</Button>
            <Button
              buttonRole="submit"
              data-testid="sendinvite"
              type="submit"
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
              style={{ marginLeft: '10px' }}
              onClick={handleSubmit}
            >
              Send Invite
            </Button>
          </Box>
        </Box>
      </StyledForm>
    </StyledModal>
  );
};

const FormValidator = withFormik({
  mapPropsToValues: () => ({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
  }),
  validationSchema: () => Yup.object().shape({
    name: Yup.string().min(1, 'Name must be  at least 1 character long'),
    surname: Yup.string().min(1, 'Surname must be  at least 1 character long'),
    email: Yup.string().email('Email must be valid'),
    phoneNumber: Yup.string().test('phoneNumber', 'Must be a valid number', isValidPhoneNumber),
  }),
  handleSubmit: async (values, { setSubmitting, props: { callBack, actions: { toastError, toastSuccess } } }) => {
    try {
      setSubmitting(true);
      setSubmitting(false);
      toastSuccess();
      callBack();
    } catch (e) {
      toastError();
      setSubmitting(false);
    }
  },
})(SendInviteForm);

SendInviteForm.propTypes = {
  hideModal: PropTypes.func.isRequired,
  values: PropTypes.array,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

SendInviteForm.defaultProps = {
  values: [],
  isValid: false,
  isSubmitting: false,
  errors: {},
  handleChange: () => {},
  handleSubmit: () => {},
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toastSuccess: showInviteSuccess,
    toastError: showInviteError,
  },
  dispatch),
});

export default connect(null, mapDispatchToProps)(FormValidator);
