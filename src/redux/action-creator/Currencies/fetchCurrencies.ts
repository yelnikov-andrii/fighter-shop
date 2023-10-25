import axios from 'axios';
import { getCurrenciesError, getCurrenciesSuccess } from '../../slices/currencySlice';

export const fetchCurrencies = (): any => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
      dispatch(getCurrenciesSuccess(response.data));
    } 
    catch(e: any) {
      dispatch(getCurrenciesError('Error can not load currencies'));
    }
  };
};