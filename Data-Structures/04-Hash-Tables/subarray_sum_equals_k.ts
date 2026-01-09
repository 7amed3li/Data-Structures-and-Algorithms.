// =================================================================
// Problem: Subarray Sum Equals K (مجموع المصفوفة الفرعية يساوي K)
// Description: Find the total number of continuous subarrays whose sum equals to k
// Category: Hash Tables, Array, Prefix Sum
// Source: LeetCode #560 (MEDIUM - متوسطة)
// Date: 9 Jan 2026
// =================================================================

// =================================================================
// 📚 What is Subarray Sum Equals K? (يعني أيه مجموع المصفوفة الفرعية؟)
// =================================================================
//
// 🇬🇧 English:
// Given an array of integers `nums` and an integer `k`, return the total number 
// of continuous subarrays whose sum equals to `k`.
// 
// Example:
//   nums = [1, 1, 1], k = 2
//   Subarrays:
//   - [1, 1] (index 0, 1) -> Sum = 2 ✅
//   - [1, 1] (index 1, 2) -> Sum = 2 ✅
//   Result = 2
//
// 🇸🇦 بالعربي:
// عندك مصفوفة أرقام `nums` ورقم `k`، المطلوب منك تعد كام "جزء متصل" (Subarray) 
// من المصفوفة دي مجموع أرقامه بيساوي `k`.
//
// مثال:
//   nums = [1, 1, 1], k = 2
//   الأجزاء الممكنة:
//   - [1, 1] (من أول عنصر للتاني) -> مجموعهم 2 ✅
//   - [1, 1] (من تاني عنصر للتالت) -> مجموعهم 2 ✅
//   النتيجة = 2
//

// -----------------------------------------------------------------
// 📝 Problem Statement (نص المسألة)
// -----------------------------------------------------------------
//
// 🇬🇧 English:
// Given an array of integers `nums` and an integer `k`, return the total number 
// of subarrays whose sum equals to `k`.
// A subarray is a contiguous non-empty sequence of elements within an array.
//
// 🇸🇦 بالعربي:
// مطلوب دالة تأخذ مصفوفة `nums` ورقم `k`.
// رجع عدد المصفوفات الفرعية (subarrays) اللي مجموع عناصرها بيساوي `k`.
// ملاحظة: المصفوفة الفرعية لازم تكون عناصر ورا بعض (متصلة).
//

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
//  First Intuition (الفكرة الأولى):
//    Let's check every possible subarray.
//    Loop from i = 0 to n, and j = i to n... sum up elements... check if sum == k.
//    That's O(N²) or O(N³) depending on implementation. Too slow for large arrays! ❌
//
//  The Optimal Insight (الفكرة العبقرية):
//    Use Prefix Sums and a Hash Map!
//    
//    Mathematical Idea:
//    Sum(i, j) = PrefixSum(j) - PrefixSum(i-1)
//    We want: Sum(i, j) == k
//    So:      PrefixSum(j) - PrefixSum(i-1) == k
//    Or:      PrefixSum(j) - k == PrefixSum(i-1)
//
//    So, while iterating, if we calculate current `Sum`, we check if `Sum - k` 
//    has appeared before using a Hash Map.
//
// 🇸🇦 التفكير المنطقي:
//
//  الفكرة الأولى (البسيطة):
//    نجرب كل المصفوفات الفرعية الممكنة. نعمل loop جوه loop ونحسب المجموع.
//    ده هيدينا تعقيد O(N²) وده بطيء جداً لو المصفوفة كبيرة! ❌
//
//  الفكرة الذكية (Prefix Sum + Hash Map):
//    فكرة رياضية بسيطة: مجموع أي جزء في النص بيساوي المجموع التراكمي لحد آخره 
//    ناقص المجموع التراكمي لحد قبله.
//    
//    احنا عايزين: المجموع الحالي - مجموع سابق = k
//    بمعنى تاني: المجموع الحالي - k = مجموع سابق
//
//    فإحنا هنمشي ونحسب المجموع التراكمي، ونسأل الـ Map:
//    "هل شوفت (المجموع الحالي - k) قبل كده؟"
//    لو أيوة، يبقى لقينا subarray مجموعه k!
//

// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

/**
 * Optimal Solution: Prefix Sum with Hash Map
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
function subarraySum(nums: number[], k: number): number {
    // Map to store frequency of prefix sums
    // بنخزن تكرار المجاميع التراكمية هنا
    // key = prefix sum, value = count of occurrences
    const map = new Map<number, number>();

    // Initialize with sum 0 appearing once
    // (This handles the case where a subarray starting from index 0 equals k)
    // بنبدأ إن المجموع صفر ظهر مرة واحدة (عشان لو أول جزء مجموعه k يتحسب صح)
    map.set(0, 1);

    let count = 0;
    let currentSum = 0;

    for (const num of nums) {
        currentSum += num;

        // Check if (currentSum - k) exists in map
        // بنشوف هل (المجموع الحالي - k) ظهر قبل كده؟
        if (map.has(currentSum - k)) {
            count += map.get(currentSum - k)!;
        }

        // Record the current sum in the map
        // سجل المجموع الحالي في الـ Map
        map.set(currentSum, (map.get(currentSum) || 0) + 1);
    }

    return count;
}

// -----------------------------------------------------------------
// 3. Visual Explanation (شرح بصري)
// -----------------------------------------------------------------
//
// nums = [1, 2, 3], k = 3
// Map starts: {0: 1}
//
// 1. i=0, num=1
//    currentSum = 1
//    Need (1 - 3) = -2 in map? No.
//    Update Map: {0: 1, 1: 1}
//
// 2. i=1, num=2
//    currentSum = 1 + 2 = 3
//    Need (3 - 3) = 0 in map? Yes! Count = 1 (from map.get(0))
//    Found subarray: [1, 2] (Sum=3) ✅
//    Update Map: {..., 3: 1}
//
// 3. i=2, num=3
//    currentSum = 3 + 3 = 6
//    Need (6 - 3) = 3 in map? Yes! Count = 1 (from map.get(3))
//    Found subarray: [3] (Sum=3) ✅
//    Update Map: {..., 6: 1}
//
// Total Count = 2
//

// -----------------------------------------------------------------
// 4. Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Time Complexity: O(N) ✅
//   - We iterate through the array once.
//   - Map operations (get/set) are O(1) on average.
//
// Space Complexity: O(N) ✅
//   - In worst case, all prefix sums are distinct, so Map stores N entries.
//

// -----------------------------------------------------------------
// 5. Test Cases (اختبارات)
// -----------------------------------------------------------------

function displayResult(nums: number[], k: number, expected: number) {
    const start = performance.now();
    const result = subarraySum(nums, k);
    const end = performance.now();
    
    console.log(`\n🔹 Input: nums=[${nums}], k=${k}`);
    console.log(`   🔸 Result:   ${result}`);
    console.log(`   ✅ Expected: ${expected}`);
    console.log(`   ⏱️ Time:     ${(end - start).toFixed(4)}ms`);
    
    if (result === expected) {
        console.log("   🟢 PASS");
    } else {
        console.log("   🔴 FAIL");
    }
}

console.log("=".repeat(50));
console.log("🧪 Testing Subarray Sum Equals K");
console.log("=".repeat(50));

displayResult([1, 1, 1], 2, 2);
displayResult([1, 2, 3], 3, 2);
displayResult([1, -1, 1], 0, 2);    // Negative numbers handled naturally (1, -1 sum to 0)
displayResult([3, 4, 7, 2, -3, 1, 4, 2], 7, 4); 
// Subarrays: [3,4], [7], [7, 2, -3, 1], [1, 4, 2]

// -----------------------------------------------------------------
// 6. Interview Tips (نصائح للمقابلات)
// -----------------------------------------------------------------
//
// 🎯 Key points to mention:
// 1. "Prefix Sum" is the key pattern here. Whenever you see "Sum of subarray", think Prefix Sum.
// 2. The naive solution is O(N^2), but Hash Map optimizes lookups to O(1), making total O(N).
// 3. This works with negative numbers too (unlike Sliding Window which usually requires positive nums).
//
// 🎯 نصائح للمقابلة:
// 1. مفتاح الحل هنا هو "Prefix Sum". أول ما تسمع "مجموع مصفوفة فرعية"، فكر في الـ Prefix Sum.
// 2. الحل البديهي O(N^2)، لكن الـ Hash Map بيخلينا ندور في O(1)، فالحل كله بيبقى O(N).
// 3. الطريقة دي بتشتغل بامتياز مع الأرقام السالبة (على عكس الـ Sliding Window اللي غالباً بيحتاج أرقام موجبة).
//

// -----------------------------------------------------------------
// 7. Key Takeaways (الدروس المستفادة)
// -----------------------------------------------------------------
//
// 1️⃣ Equation: sum(i, j) = prefixSum[j] - prefixSum[i-1].
// 2️⃣ Hash Map stores (prefixSum -> frequency).
// 3️⃣ Initialize Map with {0: 1} to handle subarrays starting from index 0.

// 🏁 End of Problem
