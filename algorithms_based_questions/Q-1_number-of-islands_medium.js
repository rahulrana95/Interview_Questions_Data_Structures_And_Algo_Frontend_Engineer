/**
 * Problem Statement link: https://leetcode.com/problems/number-of-islands/submissions/
 * Level: Easy
 * Tags: Google, Backtracking
 * ETC: 5-7 mins
 * Concept covered: backtracking in graphs
 */

/**
 * 
 * @param {Array} grid its a 2d array
 * @param {Number} r number of row
 * @param {Number} c number of columns
 */
function dfs(grid,  r,  c) {
  let nr = grid.length;
  let nc = grid[0].length;

  grid[r][c] = '0';
  if (r - 1 >= 0 && grid[r-1][c] == '1') dfs(grid, r - 1, c);
  if (r + 1 < nr && grid[r+1][c] == '1') dfs(grid, r + 1, c);
  if (c - 1 >= 0 && grid[r][c-1] == '1') dfs(grid, r, c - 1);
  if (c + 1 < nc && grid[r][c+1] == '1') dfs(grid, r, c + 1);
}
var numIslands = function(grid) {
   let nr = grid.length;
  if (!nr) return 0;
  let nc = grid[0].length;

  let num_islands = 0;
  for (let r = 0; r < nr; ++r) {
    for (let c = 0; c < nc; ++c) {
      if (grid[r][c] == '1') {
        ++num_islands;
        dfs(grid, r, c);
      }
    }
  }

  return num_islands;
};