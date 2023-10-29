import axios from "axios";
import { server } from "../store";

const getParties = async () => {
  const response = await axios.get(`${server}/parties`,);
  return response.data;
};

const getPartyDetails = async (debit) => {
  const response = await axios.post(`${server}/party-details`, { id: debit }, '', {
    withCredentials: true
  });
  return response.data;
};

const getPartyTra = async (info) => {
  const response = await axios.post(`${server}/party-transaction`, info, '', {
    withCredentials: true
  });
  return response.data;
};

const typeWiseTra = async (info) => {
  const response = await axios.post(`${server}/type-wise-transaction`, info, '', {
    withCredentials: true
  });
  return response.data;
};

const accountWiseTra = async (info) => {
  const response = await axios.post(`${server}/account-wise-transaction`, info, '', {
    withCredentials: true
  });
  return response.data;
};

const incomeState = async (info) => {
  const response = await axios.post(`${server}/income-statement`, info, '', {
    withCredentials: true
  });
  return response.data;
};



const partyService = {
  getParties,
  getPartyDetails,
  getPartyTra,
  typeWiseTra,
  accountWiseTra,
  incomeState,
};

export default partyService;
