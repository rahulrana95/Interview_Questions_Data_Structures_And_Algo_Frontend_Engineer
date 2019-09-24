/**
 * Problem Statement link: https://leetcode.com/problems/fizz-buzz/
 * Level: easy
 * Tags: Google
 * ETC: 2-3 mins 
 */


/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  const mapping = {
      3: 'Fizz',
      5: 'Buzz',
      15: 'FizzBuzz'
  };
  
  const ans =[]

  let i=1;
  while(i<= n) {
      if (i%15 === 0) {
          ans.push(mapping[15]);
      } else if (i%5 === 0) {
           ans.push(mapping[5]);
      } else if (i%3 === 0) {
          ans.push(mapping[3]);
      } else {
          ans.push(i.toString());
      }
      i++;
  };
  
  return ans;
};