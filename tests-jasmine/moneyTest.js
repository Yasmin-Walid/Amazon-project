import {formatCurrency} from '../scripts/utils/money.js';

describe ('test suite : formatcurrency', () => {

it('converts cents into dollars', () => {
   expect (formatCurrency (2095)).toEqual('20.95');
});
});