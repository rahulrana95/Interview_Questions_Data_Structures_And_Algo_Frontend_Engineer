/**
 * Problem statement - Find the gcd of factorial of arrays elements
 * Level: Easy
 * ETC: 2-3 mins 
 */


/**
 * @param {array} arr
 * @param {number} n
 * @return {number}
 */

// approach - 

/**
 *Here GCD will be the factorial of minimum element in array
 *Because There will be common factor in every elements
 *Eg - [2,4,6,7]
 *2! - 1*2
 *4! - 1*2*3*4
 *6! - 1*2*3*4*5*6
 *7! - 1*2*3*4*5*6*7
 *Here common factors are - 1*2 = 2
 *which is required GCD (Common factor way to find GCD)
*/

var factorial = function(num){
    var fact=1;
    for(let i=2;i<=num;i++){
        fact*=i;
    }
    return fact;
}

 var gcdOfFact = function(arr,n){
     let minInArrEle = Math.min(...arr);
     return factorial(minInArrEle)

 }
gcdOfFact([65,12,34,56,7,3],6); //6
