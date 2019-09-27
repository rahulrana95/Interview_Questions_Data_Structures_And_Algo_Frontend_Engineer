/**
 * Time Complexity: O(k)
 */

 // Remove k elements from array to maximise the sum of removed elements.
 // you cam remove only from start or from end.

function maximiseSumOfKRemoveElements (arr = [], k) {
  if (arr.length === 0) return;

  let start = 0;
  let end = 0;

  let maxSum = -INFINITE;

  let currSum = 0;

  while(start < k) {
    currSum = currSum = arr[start];
    start++;
  }

  start = start - 1;

  if (currSum > maxSum) maxSum = currSum;
  // keep removing last element from left and keep adding right one to sum
  while(end < k) {
    currSum = currSum - arr[start] + arr[arr.length - 1 - end];
    
    if (currSum > maxSum) maxSum = currSum;
    end++;
    start--;
  };

  return maxSum;

}