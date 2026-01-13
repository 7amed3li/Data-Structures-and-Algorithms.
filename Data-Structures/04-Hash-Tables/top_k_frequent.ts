// =================================================================
// Problem: Top K Frequent Elements
//          (العناصر الأكثر تكراراً)
// Description: Given an integer array nums and an integer k, return 
//              the k most frequent elements.
// Category: Hash Tables, Heap, Bucket Sort
// Source: LeetCode #347 (MEDIUM 🟡)
// Date: 13 Jan 2026
// =================================================================

// =================================================================
// 📚 Problem Understanding (فهم المسألة)
// =================================================================
//
// 🇬🇧 English:
// You are given an array of integers `nums` and an integer `k`.
// You need to return the `k` most frequently occurring elements.
// The answer can be in any order.
//
// Example:
//   Input: nums = [1,1,1,2,2,3], k = 2
//   Output: [1,2]
//   Explanation: 1 appears 3 times, 2 appears 2 times, 3 appears 1 time.
//                So the top 2 frequent elements are 1 and 2.
//
// 🇸🇦 بالعربي:
// عندك مصفوفة أرقام `nums` ورقم `k`.
// المطلوب: ترجع الـ `k` عناصر اللي بتتكرر أكتر حاجة في المصفوفة.
// الترتيب مش مهم في الإجابة.
//
// مثال:
//   المدخلات: nums = [1,1,1,2,2,3], k = 2
//   الخرج: [1,2]
//   الشرح: الرقم 1 ظهر 3 مرات، الرقم 2 ظهر مرتين، الرقم 3 مرة واحدة.
//         يبقى أكتر 2 عناصر تكراراً هم 1 و 2.
//
// 💡 Key Constraints (قيود مهمة):
//    - 1 <= nums.length <= 10^5
//    - k is in the range [1, number of unique elements]
//    - It's guaranteed that the answer is unique
//    - Time complexity should be better than O(n log n)
//

// -----------------------------------------------------------------
// 📝 My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
// 🇬🇧 Step-by-step thinking:
// 1️⃣ First, I need to COUNT how many times each number appears.
//    → Use a HashMap (frequency map)
//
// 2️⃣ Then, I need to find the top K frequent ones.
//    → Multiple approaches possible:
//       a) Sort by frequency (O(n log n)) ❌ Too slow!
//       b) Use a Min Heap of size K (O(n log k)) ✅ Good
//       c) Use Bucket Sort (O(n)) ✅ OPTIMAL!
//
// 🇸🇦 الخطوات بالعربي:
// 1️⃣ أول حاجة: لازم أعد كل رقم ظهر كام مرة.
//    → نستخدم HashMap (خريطة التكرارات)
//
// 2️⃣ ثاني حاجة: نلاقي أكتر K عناصر تكراراً.
//    → في طرق كتير:
//       أ) نرتب حسب التكرار (O(n log n)) ❌ بطيء!
//       ب) نستخدم Min Heap بحجم K (O(n log k)) ✅ كويس
//       ج) نستخدم Bucket Sort (O(n)) ✅ الأمثل!
//
// 💡 Why Bucket Sort?
//    Since frequencies range from 1 to n (array length),
//    we can create buckets where index = frequency.
//    Then scan from highest frequency down to get top K!
//

// -----------------------------------------------------------------
// 🐢 Solution 1: Brute Force (Sorting)
// -----------------------------------------------------------------
//
// 🇬🇧 Approach:
// 1. Count frequencies using HashMap
// 2. Convert map to array of [number, frequency] pairs
// 3. Sort by frequency in descending order
// 4. Take first K elements
//
// 🇸🇦 الطريقة:
// 1. نعد التكرارات باستخدام HashMap
// 2. نحول الـ map لمصفوفة من أزواج [رقم، تكرار]
// 3. نرتب حسب التكرار تنازلياً
// 4. ناخد أول K عناصر

function topKFrequentBruteForce(nums: number[], k: number): number[] {
    // Step 1: Count frequencies
    // الخطوة 1: عد التكرارات
    const freqMap = new Map<number, number>();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Step 2: Convert to array and sort by frequency
    // الخطوة 2: تحويل لمصفوفة وترتيب حسب التكرار
    const sortedByFreq = Array.from(freqMap.entries())
        .sort((a, b) => b[1] - a[1]); // Sort descending by frequency

    // Step 3: Take top K elements
    // الخطوة 3: أخذ أول K عناصر
    return sortedByFreq.slice(0, k).map(pair => pair[0]);
}

// 📊 Complexity:
// Time: O(n log n) - due to sorting
// Space: O(n) - for the frequency map
//

// -----------------------------------------------------------------
// ⚡ Solution 2: Optimal (Bucket Sort)
// -----------------------------------------------------------------
//
// 🇬🇧 Approach:
// 1. Count frequencies using HashMap
// 2. Create buckets: array where index = frequency
// 3. Place each number in its frequency bucket
// 4. Scan buckets from end (highest freq) and collect K elements
//
// 🇸🇦 الطريقة:
// 1. نعد التكرارات باستخدام HashMap
// 2. نعمل buckets: مصفوفة مكان الـ index = التكرار
// 3. نحط كل رقم في الـ bucket بتاع تكراره
// 4. نمسح الـ buckets من الآخر (أعلى تكرار) وناخد K عناصر

function topKFrequent(nums: number[], k: number): number[] {
    // Step 1: Count frequencies
    // الخطوة 1: عد التكرارات
    const freqMap = new Map<number, number>();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Step 2: Create frequency buckets
    // الخطوة 2: إنشاء buckets للتكرارات
    // Index represents frequency, value is array of numbers with that frequency
    // الـ Index يمثل التكرار، والقيمة هي مصفوفة الأرقام بهذا التكرار
    const buckets: number[][] = Array(nums.length + 1).fill(null).map(() => []);

    // Step 3: Fill buckets
    // الخطوة 3: ملء الـ buckets
    for (const [num, freq] of freqMap.entries()) {
        buckets[freq].push(num);
    }

    // Step 4: Collect top K elements from highest frequency down
    // الخطوة 4: جمع أعلى K عناصر من أعلى تكرار لأسفل
    const result: number[] = [];
    for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {
        if (buckets[freq].length > 0) {
            result.push(...buckets[freq]);
        }
    }

    return result.slice(0, k); // In case we collected more than k
}

// 📊 Complexity:
// Time: O(n) - we iterate through nums once, then through buckets once
// Space: O(n) - for the frequency map and buckets
//

// -----------------------------------------------------------------
// 🎨 Visual Explanation (شرح بصري)
// -----------------------------------------------------------------
//
// Example: nums = [1,1,1,2,2,3], k = 2
//
// Step 1: Frequency Map
// ┌─────┬──────┐
// │ Num │ Freq │
// ├─────┼──────┤
// │  1  │  3   │
// │  2  │  2   │
// │  3  │  1   │
// └─────┴──────┘
//
// Step 2: Bucket Sort
// Index (Frequency) →  0    1    2    3    4    5    6
//                     [ ] [3] [2] [1] [ ] [ ] [ ]
//                           ↑    ↑    ↑
//                           │    │    └─ freq=3: number 1
//                           │    └────── freq=2: number 2
//                           └─────────── freq=1: number 3
//
// Step 3: Scan from right (highest freq)
// freq=3: collect [1]    → result = [1]
// freq=2: collect [2]    → result = [1, 2]
// We have k=2 elements, STOP! ✅
//
// Output: [1, 2]
//

// -----------------------------------------------------------------
// 📊 Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Let n = length of nums array
//
// 🐢 Brute Force (Sorting):
//    Time: O(n log n) - HashMap construction O(n) + Sorting O(n log n)
//    Space: O(n) - for frequency map and sorted array
//
// ⚡ Optimal (Bucket Sort):
//    Time: O(n) - HashMap O(n) + Bucket filling O(n) + Scanning O(n)
//    Space: O(n) - for frequency map and buckets
//
// 🇸🇦 التحليل:
// - الطريقة العادية: الوقت O(n log n) بسبب الترتيب
// - الطريقة الأمثل: الوقت O(n) باستخدام Bucket Sort
// - المساحة في الحالتين: O(n)
//
// 💡 Interview Tip:
//    Start with brute force, explain it, then optimize to bucket sort.
//    Mention Min Heap approach as alternative: O(n log k).
//

// -----------------------------------------------------------------
// 🧪 Test Cases (اختبارات)
// -----------------------------------------------------------------

console.log("=".repeat(60));
console.log("🔥 Top K Frequent Elements - MEDIUM 🟡");
console.log("=".repeat(60));

function test(nums: number[], k: number, description: string) {
    const resultBrute = topKFrequentBruteForce(nums, k).sort((a, b) => a - b);
    const resultOptimal = topKFrequent(nums, k).sort((a, b) => a - b);
    
    const match = JSON.stringify(resultBrute) === JSON.stringify(resultOptimal);
    
    console.log(`\n${description}`);
    console.log(`Input: nums = [${nums}], k = ${k}`);
    console.log(`Brute Force: [${resultBrute}]`);
    console.log(`Optimal:     [${resultOptimal}]`);
    console.log(`${match ? '✅ PASS - Both solutions match!' : '❌ FAIL - Solutions differ!'}`);
}

// Test 1: Basic example
test([1,1,1,2,2,3], 2, "Test 1: Basic Example");

// Test 2: All unique elements
test([1,2,3,4,5], 3, "Test 2: All Unique Elements");

// Test 3: Single element
test([1], 1, "Test 3: Single Element");

// Test 4: All same elements
test([4,4,4,4,4], 1, "Test 4: All Same Elements");

// Test 5: Large frequency differences
test([1,1,1,1,2,2,3,3,3,4,4,4,4,4], 2, "Test 5: Large Frequency Differences");

// Test 6: Negative numbers
test([-1,-1,-1,2,2,3], 2, "Test 6: Negative Numbers");

// Test 7: k equals unique count
test([5,3,1,1,1,3,5,73,1], 4, "Test 7: K Equals Unique Count");

console.log("\n" + "=".repeat(60));
console.log("✅ Implementation & Testing Completed!");
console.log("💡 Key Takeaway: Bucket Sort achieves O(n) by using");
console.log("   the constraint that frequencies are bounded by array length!");
console.log("=".repeat(60));
