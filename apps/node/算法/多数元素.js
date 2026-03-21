// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

// 示例 ：
// 输入：nums = [2,2,1,1,1,2,2]
// 输出：2

/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
  const len = nums.length;
  const obj = {};
  for (let i = 0; i < len; i++) {
    obj[nums[i]] ? obj[nums[i]]++ : (obj[nums[i]] = 1);
    if (obj[nums[i]] > len / 2) {
      return nums[i];
    }
  }
}

const nums = [2, 2, 1, 1, 1, 2, 2];

console.log(majorityElement(nums));

//

// let majorityElement1 = function (nums) {
//   let len = nums.length
//   let arr = []
//   while (len) {
//     console.log(arr, nums[len - 1] === arr[arr.length - 1] || arr[arr.length - 1] === undefined)
//     if (nums[len - 1] === arr[arr.length - 1] || arr[arr.length - 1] === undefined) {
//       arr.push(nums[len - 1])
//     }
//     else {
//       arr.pop()
//     }
//     len--
//   }
//   console.log(arr)
// }

// [2, 2, 1, 1, 1, 2, 2]
function majorityElement1(nums) {
  let max = -1;
  let cnt = 0;
  for (let i = 0; i < nums.length; i++) {
    console.log(cnt);
    if (max == nums[i]) {
      cnt++;
    } else if (--cnt < 0) {
      max = nums[i];
      cnt++;
    }
  }
  //   console.log(max)
  return max;
}

majorityElement1(nums);
