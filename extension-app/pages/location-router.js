import React from 'react';
import {MODAL_IDS} from 'services/enrichers/entities';
import Sample from './sample';
import ModalForm from '../components/forms/modal-form';

const INNER_QUERY = 'queryObj';

function getInnerQuery(query) {
  if (!query) {
    return {page: 'app'};
  }

  const part = query.split(`${INNER_QUERY}=`);

  return JSON.parse(decodeURIComponent(decodeURIComponent(part[1])));
}

function route() {
  const currentQuery = window.location.href.split('?')[1];
  const queryObj = getInnerQuery(currentQuery);
  const currentPage = queryObj.page || 'app';
  switch (currentPage) {
    case MODAL_IDS.EXAMPLE_MODAL.entity:
      return (<ModalForm />);
    case 'config':
    case 'app':
      return <Sample />;
    default:
      return <p>Oops! Page error.</p>;
  }
}

const LocationRouter = () => route();

export default LocationRouter;
