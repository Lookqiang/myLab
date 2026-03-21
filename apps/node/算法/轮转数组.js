// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function rotate(nums, k) {
  const numsLen = nums.length;
  const step = k;
  while (k) {
    const end = nums[numsLen - 1];
    let slow = numsLen - 1;

    for (let fast = numsLen - 2; fast >= 0; fast--) {
      nums[slow--] = nums[fast];
    }
    nums[0] = end;
    k--;
    console.log(`向右轮转 ${step - k} 步:`, nums);
  }
}

const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

rotate(nums, k);

// 数组翻转
