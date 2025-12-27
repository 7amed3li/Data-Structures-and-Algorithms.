// =================================================================
// Problem: Two Sum (مسألة اليوم - 27 Dec 2024)
// Description: Given an array of integers and a target,
//              return indices of the two numbers that add up to target.
// Category: Hash Tables, Arrays
// Source: LeetCode #1 (Most Famous Interview Question!)
// Difficulty: Easy
// =================================================================

// -----------------------------------------------------------------
// 📝 Problem Statement (نص المسألة)
// -----------------------------------------------------------------
//
// Given an array of integers `nums` and an integer `target`,
// return the indices of the two numbers such that they add up to `target`.
//
// You may assume that each input would have exactly one solution,
// and you may not use the same element twice.
//
// Example 1:
//   Input: nums = [2, 7, 11, 15], target = 9
//   Output: [0, 1]
//   Explanation: nums[0] + nums[1] = 2 + 7 = 9
//
// Example 2:
//   Input: nums = [3, 2, 4], target = 6
//   Output: [1, 2]
//   Explanation: nums[1] + nums[2] = 2 + 4 = 6
//
// Example 3:
//   Input: nums = [3, 3], target = 6
//   Output: [0, 1]
//

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
// >> The Brute-Force Approach (الحل الساذج)
//    For each number, check all other numbers to find the complement.
//    - Time Complexity: O(n²) - Two nested loops
//    - Space Complexity: O(1) - No extra space
//
//    >> (شرحي بالعربي)
//    الفكرة البسيطة: لكل رقم في المصفوفة، أدور على باقي الأرقام
//    وأشوف لو مجموعهم = target
//    المشكلة: بطيء جداً لأن عندي حلقتين متداخلتين
//
// >> The Optimal Approach (الحل الأمثل - باستخدام Hash Map)
//    Key Insight: If I need two numbers a + b = target,
//                 then b = target - a (the complement)
//    
//    I can use a Hash Map to store each number and its index.
//    For each number, I check if its complement exists in the map.
//    
//    - Time Complexity: O(n) - Single pass
//    - Space Complexity: O(n) - HashMap storage
//
//    >> (شرحي بالعربي)
//    الفكرة الذكية: لو عايز رقمين مجموعهم = target
//    يبقى لو عندي الرقم الأول (a)، الرقم التاني لازم يكون (target - a)
//    
//    هستخدم Map عشان أخزن كل رقم مع الـ index بتاعه
//    لكل رقم، هشوف لو الـ complement بتاعه موجود في الـ Map
//    لو موجود = لقيت الإجابة!
//    لو مش موجود = أضيف الرقم ده للـ Map وأكمل
//

// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

// Brute-Force Solution - O(n²)
function twoSumBruteForce(nums: number[], target: number): number[] {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }

    return []; // No solution found
}

// Optimal Solution - O(n) using Hash Map
function twoSumOptimal(nums: number[], target: number): number[] {
    // Map to store: number -> its index
    const numToIndex = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const complement = target - currentNum; // الرقم اللي محتاجه

        // Check if complement exists in our map
        if (numToIndex.has(complement)) {
            // Found it! Return both indices
            return [numToIndex.get(complement)!, i];
        }

        // Store current number with its index
        numToIndex.set(currentNum, i);
    }

    return []; // No solution found
}

// -----------------------------------------------------------------
// 3. Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Brute-Force:
//   - Time: O(n²) - لكل عنصر بنمر على كل العناصر التانية
//   - Space: O(1) - مش بنستخدم مساحة إضافية
//
// Optimal (Hash Map):
//   - Time: O(n) - بنمر على المصفوفة مرة واحدة بس!
//   - Space: O(n) - بنخزن كل الأرقام في الـ Map
//
// Why is Hash Map O(1) lookup?
//   لأن الـ Map بيستخدم Hash Table داخلياً
//   البحث والإضافة بياخدوا O(1) في المتوسط
//

// -----------------------------------------------------------------
// 4. Test Cases (اختبارات)
// -----------------------------------------------------------------

console.log("=".repeat(50));
console.log("🎯 Two Sum Problem - Test Cases");
console.log("=".repeat(50));

// Test Case 1
const test1 = [2, 7, 11, 15];
const target1 = 9;
console.log("\n📌 Test 1:");
console.log(`   Input: nums = [${test1}], target = ${target1}`);
console.log(`   Brute-Force: [${twoSumBruteForce(test1, target1)}]`);
console.log(`   Optimal:     [${twoSumOptimal(test1, target1)}]`);
console.log(`   Expected:    [0, 1]`);

// Test Case 2
const test2 = [3, 2, 4];
const target2 = 6;
console.log("\n📌 Test 2:");
console.log(`   Input: nums = [${test2}], target = ${target2}`);
console.log(`   Brute-Force: [${twoSumBruteForce(test2, target2)}]`);
console.log(`   Optimal:     [${twoSumOptimal(test2, target2)}]`);
console.log(`   Expected:    [1, 2]`);

// Test Case 3
const test3 = [3, 3];
const target3 = 6;
console.log("\n📌 Test 3:");
console.log(`   Input: nums = [${test3}], target = ${target3}`);
console.log(`   Brute-Force: [${twoSumBruteForce(test3, target3)}]`);
console.log(`   Optimal:     [${twoSumOptimal(test3, target3)}]`);
console.log(`   Expected:    [0, 1]`);

console.log("\n" + "=".repeat(50));
console.log("✅ All tests completed!");
console.log("=".repeat(50));


// -----------------------------------------------------------------
// 5. Key Takeaways (الدروس المستفادة)
// -----------------------------------------------------------------
//
// 1. Hash Map هو صديقك! 🗺️
//    كل ما تحتاج تبحث عن حاجة، فكر في Hash Map
//
// 2. Complement Pattern مهم جداً
//    بدل ما تدور على رقمين، دور على الـ complement بتاع كل رقم
//
// 3. Trade-off: Time vs Space
//    الحل الأمثل أسرع O(n) لكن بيستخدم مساحة أكتر O(n)
//    الـ Brute-Force أبطأ O(n²) لكن مش بيستخدم مساحة
//
