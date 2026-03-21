// 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
// 元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。

// 考虑 nums 的唯一元素的数量为 k。去重后，返回唯一元素的数量 k。

// nums 的前 k 个元素应包含 排序后 的唯一数字。下标 k - 1 之后的剩余元素可以忽略。

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// let removeElement = function (nums, val) {
//   //   let left = 0
//   //   let right = nums.length
//   //   while (left < right) {
//   //     if (nums[left] === val) {
//   //       nums[left] = nums[right - 1]
//   //       right--
//   //     }
//   //     else {
//   //       left++
//   //     }
//   //   }
//   //   console.log(left, nums)
//   //   return left

//   let i = 0
//   for (let j = 0; j < nums.length; j++) {
//     if (nums[j] !== val) {
//       nums[i++] = nums[j]
//     }
//   }
//   console.log(i, nums)
//   return i
// }

function removeElement(nums) {
  let i = 0;

  let count = 0;
  for (let j = 0; j < nums.length; j++) {
    if (count < 2 && nums[i - 1] === nums[j]) {
      nums[i++] = nums[j];
      count++;
    } else if (nums[i - 1] !== nums[j]) {
      nums[i++] = nums[j];
      count = 1;
    }
    console.log(i, nums);
  }
}

const nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];

// 2, nums = [2,2,_,_]
removeElement(nums);

// i  j   count  nums[i]

// 0  0   1        0

// 1  1   2         0

// 2  3
