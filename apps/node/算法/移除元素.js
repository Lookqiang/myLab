/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  //   let left = 0
  //   let right = nums.length
  //   while (left < right) {
  //     if (nums[left] === val) {
  //       nums[left] = nums[right - 1]
  //       right--
  //     }
  //     else {
  //       left++
  //     }
  //   }
  //   console.log(left, nums)
  //   return left

  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      nums[i++] = nums[j];
    }
  }
  console.log(i, nums);
  return i;
}

const nums = [0, 1, 2, 2, 3, 0, 4, 2];
const val = 2;

// 2, nums = [2,2,_,_]
removeElement(nums, val);

// 双指针
// 1、可在原数组上进行
