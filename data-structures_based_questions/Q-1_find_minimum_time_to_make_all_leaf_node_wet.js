/**
 * Problem Statement: Not available anywhere
 * Level: Medium
 * Tags: Google, dfs, minheap
 * ETC: 5-7 mins
 * Concept covered: DFS, Min Heap
 * Time Complexity: first one: O(n), followup: nO(Logn), inserting n nodes where each one takes logn so nlogn, extracting is logn
 */

//  function node() {
//    this.name = '';
//    this.childrens = [{
//      node: {}, time: 0
//    },...];
//  }

 funtion minimumTimeToMakeAllLeafNodeWet(root) {
   const minTime = {
     time: -INFINITE;
   }

   minTimeLeafNodes(root, minTime);
 }

 function minTimeLeafNodes(root, minTime, currNodeTimeTaken) {
   if (!root) return;

   // leaf node check
   if (root.childrens.length === 0) {
    if (currNodeTimeTaken > minTime.time) {
      minTime.time = currNodeTimeTaken;
    }
    return;
   }

   root.childrens.forEach((node) => {
    minTimeLeafNodes(node, minTime, currNodeTimeTaken + node.time);
   });

   return;
 }



 /**
  * Follow up question of above
  */

function orderOfNodesGettingWet(root) {
  const heap = new minHeap();
  heap.add(root);
  while(!heap.empty()) {
    const minTimeNode = heap.extractMin();

    console.log(minTimeNode);

    minTimeNode.childrens.forEach((node) => {
      node.time += minTimeNode.time;
      heap.add(node);
    });
  }
}
