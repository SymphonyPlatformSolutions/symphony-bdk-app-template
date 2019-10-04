import React from 'react';
import MainPageContainer from './main-page/container';

const INNER_QUERY = 'queryObj';

function getInnerQuery(query) {
  if (!query) {
    return { page: 'app' };
  }

  const part = query.split(`${INNER_QUERY}=`);

  return JSON.parse(decodeURIComponent(decodeURIComponent(part[1])));
}

function route() {
  const currentQuery = window.location.href.split('?')[1];
  const queryObj = getInnerQuery(currentQuery);
  const currentPage = queryObj.page || 'app';
  switch (currentPage) {
    case 'config':
    case 'app':
      return <MainPageContainer />;
    default:
      return <p>Oops! Page error.</p>;
  }
}

const LocationRouter = () => route();

export default LocationRouter;
