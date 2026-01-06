// =================================================================
// Problem: Minimum Window Substring (أصغر نافذة تحتوي على النص)
// Description: Find the smallest window in S that contains all characters of T
// Category: Hash Tables, String, Sliding Window
// Source: LeetCode #76 (HARD - صعبة جداً)
// Date: 5 Jan 2026
// =================================================================

// =================================================================
// 📚 What is the Minimum Window Substring? (ما هي أصغر نافذة محتواة؟)
// =================================================================
//
// 🇬🇧 English:
// Given two strings S and T, find the smallest substring of S that 
// contains all characters of T (including duplicates).
// 
// Example:
//   S = "ADOBECODEBANC", T = "ABC"
//   Potential windows:
//   - "ADOBEC" (contains A, B, C) - Length 6
//   - "CODEBA" (contains C, B, A) - Length 6
//   - "BANC" (contains B, A, C) - Length 4  <-- MINIMUM! 🎯
//
// 🇸🇦 بالعربي:
// عندك نصين S و T، المطلوب تلاقي "أصغر" جزء من النص S بيحتوي على كل حروف T.
// لازم الجزء ده يكون فيه نفس عدد تكرار الحروف اللي في T.
//
// مثال:
//   S = "ADOBECODEBANC", T = "ABC"
//   النوافذ المحتملة:
//   - "ADOBEC" (فيها A, B, C) - طولها 6
//   - "CODEBA" (فيها C, B, A) - طولها 6
//   - "BANC" (فيها B, A, C) - طولها 4  <-- دي الأصغر! 🎯
//
// -----------------------------------------------------------------
// 📝 Problem Statement (نص المسألة)
// -----------------------------------------------------------------
//
// 🇬🇧 English:
// Given two strings `s` and `t` of lengths `m` and `n`, return the minimum window 
// substring of `s` such that every character in `t` (including duplicates) 
// is included in the window. If there is no such substring, return an empty string "".
//
// The algorithm should run in O(m + n) time.
//
// 🇸🇦 بالعربي:
// معطى نصين `s` و `t`. هات أصغر substring في `s` بيحتوي على كل حروف `t`.
// لو مفيش، رجع نص فاضي "".
//
// التحدي: لازم الحل يكون O(m + n) - وده اللي بيخليها مسألة صعبة! 
//

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
//  First Intuition (الفكرة الأولى):
//    Check EVERY possible substring. For each substring, count if it has all chars of T.
//    Wait... that's O(n² * m) or O(n³). For a string of length 10^5, that's impossible! ❌
//
//  The Optimal Insight (الفكرة العبقرية):
//    Use two pointers (Sliding Window) and two Hash Tables!
//    
//    1. Create a frequency map for text T (needed characters).
//    2. Move the `right` pointer to expand the window until it contains all chars of T.
//    3. Once the window is "valid", move the `left` pointer to shrink it as much as possible
//       while keeping it "valid".
//    4. Keep track of the minimum length found so far.
//
// 🇸🇦 التفكير المنطقي:
//
//  الفكرة الأولى (البسيطة):
//    أجرب كل الاحتمالات الممكنة للـ substrings. أشوف كل حتة في النص وأعد حروفها.
//    طبعاً ده بطيء جداً O(n³)! 
//
//  الفكرة الذكية (النافذة المنزلقة - Sliding Window):
//    نستخدم مؤشرين (بدايه ونهاية للنافذة) ومعاهم Hash Tables للعد:
//
//    1. نعد الحروف المطلوبة من النص `t` ونخزنها في `Map`.
//    2. نحرك المؤشر اليمين عشان نكبر النافذة لحد ما نلاقي كل الحروف المطلوبة.
//    3. أول ما النافذة تبقى "صالحة" (فيها كل الحروف)، نبدأ نحرك المؤشر الشمال عشان نصغرها
//       على قد ما نقدر طول ما هي لسه "صالحة".
//    4. نسجل أصغر طول نافذة نلاقيه.

// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

/**
 * Optimal Solution: Sliding Window with Hash Map
 * Time Complexity: O(S + T)
 * Space Complexity: O(S + T)
 */
function minWindow(s: string, t: string): string {
    if (s.length === 0 || t.length === 0) return "";

    // 1️⃣ Map to keep track of characters we NEED and their frequency
    // خريطة لتتبع الحروف اللي محتاجينها وعددهم
    const dictT = new Map<string, number>();
    for (const char of t) {
        dictT.set(char, (dictT.get(char) || 0) + 1);
    }

    // Number of unique characters in t that must be present in the window
    // عدد الحروف الفريدة اللي لازم تكون موجودة في النافذة
    const required = dictT.size;

    // Left and Right pointers for our window
    let l = 0, r = 0;

    // formed is used to keep track of how many unique characters in t
    // are present in the current window in their required quantity.
    // 'formed' بتعرفنا معانا كام حرف من اللي محتاجينهم بالعدد الصح
    let formed = 0;

    // Dictionary which keeps a count of all the unique characters in the current window.
    // عداد للحروف اللي في النافذة الحالية
    const windowCounts = new Map<string, number>();

    // answer tuple: [window length, left, right]
    let ans: [number, number, number] = [-1, 0, 0];

    while (r < s.length) {
        // 2️⃣ Add character from the right to the window
        // ضيف الحرف اللي على اليمين للنافذة
        const char = s[r];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

        // If the frequency of the current character added equals to the 
        // desired count in t then increment the formed count by 1.
        if (dictT.has(char) && windowCounts.get(char) === dictT.get(char)) {
            formed++;
        }

        // 3️⃣ Try and contract the window till the point where it ceases to be 'valid'.
        // صغّر النافذة من الشمال طول ما هي لسه صالحة
        while (l <= r && formed === required) {
            const leftChar = s[l];

            // Save the smallest window until now
            // احفظ أصغر نافذة لحد دلوقتي
            if (ans[0] === -1 || r - l + 1 < ans[0]) {
                ans = [r - l + 1, l, r];
            }

            // The character at the position pointed by the `left` pointer is no longer a part of the window.
            windowCounts.set(leftChar, windowCounts.get(leftChar)! - 1);
            if (dictT.has(leftChar) && windowCounts.get(leftChar)! < dictT.get(leftChar)!) {
                formed--;
            }

            // Move the left pointer ahead, this helps in look for a new window.
            l++;
        }

        // Keep expanding the window by moving the right pointer
        r++;
    }

    return ans[0] === -1 ? "" : s.substring(ans[1], ans[2] + 1);
}

// -----------------------------------------------------------------
// 3. Visual Explanation (شرح بصري)
// -----------------------------------------------------------------
//
// S = "ADOBEC", T = "ABC"
// Target: {A:1, B:1, C:1}, Required unique: 3
//
// Step-by-Step:
// 1. [A]        -> {A:1} -> formed=1
// 2. [AD]       -> {A:1, D:1} -> formed=1
// 3. [ADO]      -> {A:1, D:1, O:1} -> formed=1
// 4. [ADOB]     -> {A:1, D:1, O:1, B:1} -> formed=2
// 5. [ADOBE]    -> {A:1, D:1, O:1, B:1, E:1} -> formed=2
// 6. [ADOBEC]   -> {A:1... C:1} -> formed=3 ✅ (VALID!)
//    - Now shrink from left: 
//    - [ADOBEC] -> length 6
//    - (remove A) -> [DOBEC] -> formed=2 ❌ (INVALID)
//
// 7. Keep expanding until we find another A...
//
// ═══════════════════════════════════════════════════════════════
//
// 💡 Why is this O(N+M)?
// Each character in S is visited at most 2 times: 
// once by the 'right' pointer and once by the 'left' pointer.
//
// ليه ده O(N+M)؟
// عشان كل حرف في النص s بيتم زيارته مرتين بالكتير:
// مرة بالمؤشر اليمين ومرة بالمؤشر الشمال.

// -----------------------------------------------------------------
// 4. Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Let S = length of string s, T = length of string t
//
// Time Complexity: O(S + T) ✅
//   - We scan T once to build the frequency map: O(T)
//   - We scan S using two pointers. Each pointer moves from 0 to S: O(2S) = O(S)
//   - Total: O(S + T)
//
// Space Complexity: O(S + T) ✅
//   - We store frequencies in Hash Maps.
//   - In worst case, map stores all unique characters of S and T.

// -----------------------------------------------------------------
// 5. Test Cases (اختبارات)
// -----------------------------------------------------------------

function displayMinWindowResult(s: string, t: string, expected: string) {
    const start = performance.now();
    const result = minWindow(s, t);
    const end = performance.now();
    
    console.log(`\n🔹 Input: S="${s}", T="${t}"`);
    console.log(`   🔸 Result:   "${result}"`);
    console.log(`   ✅ Expected: "${expected}"`);
    console.log(`   ⏱️ Time:     ${(end - start).toFixed(4)}ms`);
    
    if (result === expected) {
        console.log("   🟢 PASS");
    } else {
        console.log("   🔴 FAIL");
    }
}

console.log("=".repeat(50));
console.log("🧪 Testing Minimum Window Substring");
console.log("=".repeat(50));

displayMinWindowResult("ADOBECODEBANC", "ABC", "BANC");
displayMinWindowResult("a", "a", "a");
displayMinWindowResult("a", "aa", "");
displayMinWindowResult("ab", "b", "b");
displayMinWindowResult("donutsandcoffee", "dan", "and");

// -----------------------------------------------------------------
// 6. Interview Tips (نصائح للمقابلات)
// -----------------------------------------------------------------
//
// 🎯 Key points to mention:
// 1. Sliding Window is the standard approach for "minimum substring" problems.
// 2. Hash Tables are used to store frequencies for O(1) comparison.
// 3. Mention that while there are nested loops, each pointer moves only in one direction, 
//    making it O(N).
//
// 🎯 نصائح للمقابلة:
// 1. طريقة الـ Sliding Window هي الحل المثالي لمشاكل الـ "أصغر نص محتوى".
// 2. بنستخدم الـ Hash Tables عشان نقارن تكرار الحروف في O(1).
// 3. وضح إن بالرغم من وجود loop جوه loop، إلا إن كل مؤشر بيمشي في اتجاه واحد بس، 
//    وده بيخلي التعقيد الزمني O(N).

// -----------------------------------------------------------------
// 7. Key Takeaways (الدروس المستفادة)
// -----------------------------------------------------------------
//
// 1️⃣ Sliding Window + Hash Map = Powerful combination for string problems.
// 2️⃣ "formed" variable helps avoid re-checking the entire map on every step.
// 3️⃣ Hard problems are often about optimizing a brute-force approach using 
//    better data structures (Maps) and pointers.

// 🏁 End of Problem
