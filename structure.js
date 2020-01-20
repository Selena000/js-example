const arr = [1, 2, 4, 3, 6]

function getNum(sum, array) {
	let left = 0
	let right = array.length - 1
	let tempArr = []
	const arr = array.sort() // 从小到大排序

	while (left < right) {
		if (arr[left] + arr[right] > sum) {
			right --
		}

		if (arr[left] + arr[right] < sum) {
			left ++
		}

		if (arr[left] + arr[right] === sum) {
			return [arr[left], arr[right]]
		}
	}

	return tempArr.join('-')
}
// 两数之和
var twoSum = function(nums, target) {
    var left = 0;
    var right = nums.length - 1
    nums = nums.sort()
    var arr = []

    while(left < right) {
      if ((nums[left] + nums[right]) === target) {
        arr = [left, right]
        break
      }
      if ((nums[left] + nums[right]) > target) {
        right--
      }
      if ((nums[left] + nums[right]) < target) {
        left++
      }
    }
    
    return arr
};

console.log(twoSum(arr, 7))