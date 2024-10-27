import {formatCurrency} from '../scripts/utils/money.js';


console.log('test suite : formatcurrency');
/* test case 1 (basic test case) */
console.log ('converts cents into dollars');
if (formatCurrency (2095) === '20.95'){
  console.log ('passed');  
} else {
    console.log('failed');
};

/* test case 2 (edge test case) */

console.log ('works with zero');
if (formatCurrency(0) === '0.00'){
    console.log ('passed');  
} else {
    console.log('failed');
}

/* test case 3 (edge test case)*/
console.log ('rounds up to the nearest cent');
if (formatCurrency (2000.5) === '20.01'){
    console.log ('passed');  
  } else {
      console.log('failed');
  };
 