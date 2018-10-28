import axios from 'axios';
import { API_BASE_URL } from 'DollarzApp/src/env';

export const fetchCustomerStripeSources = accessToken => {
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken,
  };

  return axios
    .get(`${API_BASE_URL}/api/getCustomerCards`, { headers })
    .then(({ data }) => {
      return data.customerCards;
    })
    .catch(error => {
      return Promise.reject(error.message);
    });
};

export const doPayment = (offer, customerCard, accessToken) => {
  const body = {
    tokenId: customerCard.tokenId,
    offerName: offer.name,
    amount: Number(offer.price),
    cardId: customerCard.card.cardId,
  };
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken,
  };
  return axios
    .post(`${API_BASE_URL}/api/doPayment`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return Promise.reject(Error(error));
    });
};

export const createUser = (username, password) => {
  const body = {
    username,
    password,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  return axios
    .post(`${API_BASE_URL}/api/createCustomer`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return Promise.reject(Error('error', { error }));
    });
};

export const checkAuth = accessToken => {
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken,
  };

  return axios
    .get(`${API_BASE_URL}/api/checkAuth`, { headers })
    .then(() => {
      return Promise.resolve();
    })
    .catch(() => {
      return Promise.reject(Error('Authentication failed'));
    });
};

export const login = (username, password) => {
  const body = {
    username,
    password,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  return axios
    .post(`${API_BASE_URL}/api/login`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return Promise.reject(Error('Login error', error));
    });
};

export const fetchStripeOrders = accessToken => {
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken,
  };
  return axios.get(`${API_BASE_URL}/api/getStripeOrders`, { headers }).then(result => {
    return result.data.orders.data;
  });
};

export const refundStripeOrder = (accessToken, chargeId) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken,
  };

  const body = { chargeId: chargeId };

  return axios
    .post(`${API_BASE_URL}/api/refundStripeOrder`, body, { headers })
    .then(result => {
      return result.data;
    })
    .catch(console.log);
};
