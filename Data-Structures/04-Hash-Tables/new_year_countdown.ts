// =================================================================
// Problem: New Year Countdown - Closest Celebrations 🎆
// Description: Given celebration times from cities worldwide,
//              find the two closest celebrations in time.
// Category: Arrays, Sorting, Sliding Window
// Occasion: Happy New Year 2026! 🎊
// Difficulty: Easy
// =================================================================

// -----------------------------------------------------------------
// 📝 Problem Statement (نص المسألة)
// -----------------------------------------------------------------
//
// It's New Year's Eve! Cities around the world celebrate at different
// times due to their timezones. Given an array of celebration times
// (in minutes from midnight UTC), find the minimum time difference
// between any two celebrations.
//
// Example 1:
//   Input: times = [0, 720, 180, 60]
//   Cities: [Sydney, Tokyo, Dubai, Paris] (simplified)
//   Output: 60
//   Explanation: The closest celebrations are at 0 and 60 (1 hour apart)
//
// Example 2:
//   Input: times = [100, 200, 300, 400]
//   Output: 100
//   Explanation: Each consecutive pair is 100 minutes apart
//
// Example 3:
//   Input: times = [1439, 1, 720]
//   Output: 2
//   Explanation: 1439 (11:59 PM) and 1 (0:01 AM) are only 2 mins apart!
//   Note: We consider circular time (day wraps around)
//

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
// >> The Brute-Force Approach (الحل الساذج)
//    Compare every pair of times and find the minimum difference.
//    - Time Complexity: O(n²) - Two nested loops
//    - Space Complexity: O(1) - No extra space
//
//    >> (شرحي بالعربي)
//    أول فكرة: أقارن كل وقت مع كل الأوقات التانية
//    وأحسب الفرق بينهم، وأحتفظ بأقل فرق
//    المشكلة: بطيء جداً لو عندنا مدن كتير
//
// >> The Optimal Approach (الحل الأمثل - باستخدام الترتيب)
//    Key Insight: If we sort the times, the minimum difference
//    MUST be between two adjacent elements!
//    
//    Why? If a < b < c, then |a-c| > |a-b| and |a-c| > |b-c|
//    So we only need to check neighbors after sorting.
//    
//    - Time Complexity: O(n log n) - Sorting dominates
//    - Space Complexity: O(1) - If we sort in place
//
//    >> (شرحي بالعربي)
//    الفكرة الذكية: لو رتبنا الأوقات، أقل فرق لازم يكون بين عنصرين جنب بعض!
//    
//    ليه؟ لو عندي 3 أرقام مرتبة: a < b < c
//    الفرق بين a و c أكبر من الفرق بين a و b
//    والفرق بين a و c أكبر من الفرق بين b و c
//    
//    يعني بعد الترتيب، أمشي على كل عنصرين جنب بعض وأحسب الفرق
//    وأرجع أقل فرق لقيته
//
// >> Bonus: Circular Time (المكافأة: الوقت الدائري)
//    Since a day wraps around (1439 -> 0), we also check
//    the difference between the first and last elements!
//    
//    >> (شرحي بالعربي)
//    لأن اليوم بيلف (من 1439 لـ 0)، لازم نتحقق كمان
//    من الفرق بين أول وآخر عنصر بعد الترتيب
//

// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

const MINUTES_IN_DAY = 1440; // 24 * 60

// Brute-Force Solution - O(n²)
function closestCelebrationsBruteForce(times: number[]): number {
    const n = times.length;
    if (n < 2) return 0;

    let minDiff = Infinity;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Calculate difference (considering circular time)
            let diff = Math.abs(times[i] - times[j]);
            // Check the "wrap-around" difference too
            diff = Math.min(diff, MINUTES_IN_DAY - diff);
            minDiff = Math.min(minDiff, diff);
        }
    }

    return minDiff;
}

// Optimal Solution - O(n log n) using Sorting
function closestCelebrationsOptimal(times: number[]): number {
    const n = times.length;
    if (n < 2) return 0;

    // Sort the times - الترتيب
    const sortedTimes = [...times].sort((a, b) => a - b);

    let minDiff = Infinity;

    // Check adjacent pairs - التحقق من كل عنصرين جنب بعض
    for (let i = 0; i < n - 1; i++) {
        const diff = sortedTimes[i + 1] - sortedTimes[i];
        minDiff = Math.min(minDiff, diff);
    }

    // Check circular wrap-around (first and last)
    // التحقق من الدوران: الفرق بين آخر وأول عنصر
    const circularDiff = (sortedTimes[0] + MINUTES_IN_DAY) - sortedTimes[n - 1];
    minDiff = Math.min(minDiff, circularDiff);

    return minDiff;
}

// -----------------------------------------------------------------
// 3. Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Brute-Force:
//   - Time: O(n²) - مقارنة كل زوج من الأوقات
//   - Space: O(1) - مساحة ثابتة
//
// Optimal (Sorting):
//   - Time: O(n log n) - الترتيب هو اللي بياخد الوقت
//   - Space: O(n) - لو عملنا نسخة جديدة، أو O(1) لو رتبنا in-place
//
// Why is checking neighbors enough after sorting?
//   لأن الأرقام المرتبة، أقرب رقمين لازم يكونوا جنب بعض
//   مش ممكن يكون في رقمين بعيد عن بعض أقرب من رقمين جنب بعض
//

// -----------------------------------------------------------------
// 4. Test Cases (اختبارات)
// -----------------------------------------------------------------

console.log("=".repeat(50));
console.log("🎆 New Year Countdown - Closest Celebrations");
console.log("=".repeat(50));
console.log("🎊 Happy New Year 2026! 🎊");
console.log("=".repeat(50));

// Test Case 1: Basic case
const times1 = [0, 720, 180, 60];
console.log("\n📌 Test 1: Basic cities");
console.log(`   Input: [${times1}]`);
console.log(`   (0=Midnight, 60=1AM, 180=3AM, 720=Noon)`);
console.log(`   Brute-Force: ${closestCelebrationsBruteForce(times1)} minutes`);
console.log(`   Optimal:     ${closestCelebrationsOptimal(times1)} minutes`);
console.log(`   Expected:    60 minutes`);

// Test Case 2: Evenly spaced
const times2 = [100, 200, 300, 400];
console.log("\n📌 Test 2: Evenly spaced celebrations");
console.log(`   Input: [${times2}]`);
console.log(`   Brute-Force: ${closestCelebrationsBruteForce(times2)} minutes`);
console.log(`   Optimal:     ${closestCelebrationsOptimal(times2)} minutes`);
console.log(`   Expected:    100 minutes`);

// Test Case 3: Circular wrap-around (most interesting!)
const times3 = [1439, 1, 720];
console.log("\n📌 Test 3: Wrap-around case 🌟");
console.log(`   Input: [${times3}]`);
console.log(`   (1439=11:59PM, 1=0:01AM, 720=Noon)`);
console.log(`   Brute-Force: ${closestCelebrationsBruteForce(times3)} minutes`);
console.log(`   Optimal:     ${closestCelebrationsOptimal(times3)} minutes`);
console.log(`   Expected:    2 minutes (11:59PM to 0:01AM!)`);

// Test Case 4: Real world - Major cities
const times4 = [
    0,    // London (UTC)
    540,  // Tokyo (UTC+9)
    330,  // Mumbai (UTC+5:30)
    -300, // New York (UTC-5) -> 1440-300=1140
].map(t => (t + MINUTES_IN_DAY) % MINUTES_IN_DAY); // Normalize to positive

console.log("\n📌 Test 4: Real cities (normalized times)");
console.log(`   Input: [${times4}]`);
console.log(`   Brute-Force: ${closestCelebrationsBruteForce(times4)} minutes`);
console.log(`   Optimal:     ${closestCelebrationsOptimal(times4)} minutes`);

console.log("\n" + "=".repeat(50));
console.log("✅ All New Year tests completed!");
console.log("🎆 May 2026 bring you success and happiness! 🎆");
console.log("=".repeat(50));

// -----------------------------------------------------------------
// 5. Key Takeaways (الدروس المستفادة)
// -----------------------------------------------------------------
//
// 1. Sorting unlocks patterns! 📊
//    الترتيب بيسهل حاجات كتير - بعد الترتيب، أقرب قيمتين لازم جنب بعض
//
// 2. Think about edge cases 🔄
//    الوقت بيلف! 11:59 PM قريب جداً من 12:01 AM
//    لازم نفكر في الـ circular/wrap-around cases
//
// 3. Trade-off: O(n²) vs O(n log n)
//    الترتيب خلّى الحل أسرع من O(n²) لـ O(n log n)
//    ده pattern مهم جداً في مسائل كتير
//
// 4. This is LeetCode #539: Minimum Time Difference! 🎯
//    لو حبيت تتمرن أكتر، دور على المسألة دي على LeetCode
//
