// Question: https://www.geeksforgeeks.org/find-the-missing-number/
// LeetCode: https://leetcode.com/problems/missing-number/submissions/

/**
 * Time complexity: O(n)
 * Space Complexity: O(1)
 */
function FindMissingNumber(arr) {
    if (!arr) {
        return;
    }

    const size = arr.length;
    const sumOfNNumber = (size * (size + 1))/2;
    
    const sumOfElementsOfArr = arr.reduce((sum, curr)=> sum + curr,0) ;

    return sumOfNNumber - sumOfElementsOfArr;
}