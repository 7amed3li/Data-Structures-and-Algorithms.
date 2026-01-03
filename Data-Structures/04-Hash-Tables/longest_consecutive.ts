// =================================================================
// Problem: Longest Consecutive Sequence (أطول سلسلة متتالية)
// Description: Find the length of the longest consecutive elements sequence
// Category: Hash Tables, Arrays, Union Find
// Source: LeetCode #128 (Top Interview Question!)
// Difficulty: 🟡 Medium (متوسط)
// Date: 3 Jan 2026
// =================================================================

// =================================================================
// 📚 What is a Consecutive Sequence? (ما هي السلسلة المتتالية؟)
// =================================================================
//
// 🇬🇧 English:
// A Consecutive Sequence is when numbers follow each other WITHOUT gaps.
// Like counting: 1, 2, 3, 4, 5 - each number is exactly +1 from the previous!
//
// Example:
//   [1, 2, 3, 4] = consecutive ✅ (each +1 from previous)
//   [1, 2, 4, 5] = NOT consecutive ❌ (3 is missing!)
//   [5, 4, 3, 2, 1] = consecutive ✅ (order in array doesn't matter!)
//
// 🇸🇦 بالعربي:
// السلسلة المتتالية = أرقام تتبع بعضها بدون فجوات
// زي العد: 1، 2، 3، 4، 5 - كل رقم أكبر من اللي قبله بـ 1 بس!
//
// أمثلة بسيطة:
//   [1, 2, 3, 4] = متتالية ✅ (كل رقم +1 من اللي قبله)
//   [1, 2, 4, 5] = مش متتالية ❌ (الـ 3 ناقص!)
//   [5, 4, 3, 2, 1] = متتالية ✅ (الترتيب في المصفوفة مش مهم!)
//
//   تخيل إنك بتصف صف من الناس 👥
//   لو أطوالهم: 170, 171, 172, 173 سم
//   ده صف متتالي - كل واحد أطول من اللي قبله بـ 1 سم!
//
// More Examples:
//   [100, 101, 102] = consecutive sequence of length 3 ✅
//   [1, 5, 10, 15] = NO consecutive sequence (gaps everywhere) ❌
//   [7, 6, 8, 5, 9] = consecutive! [5,6,7,8,9] has length 5 ✅
//

// -----------------------------------------------------------------
// 📝 Problem Statement (نص المسألة)
// -----------------------------------------------------------------
//
// 🇬🇧 English:
// Given an unsorted array of integers `nums`, return the length of
// the longest consecutive elements sequence.
//
// You must write an algorithm that runs in O(n) time.
// (This is the tricky part! 🤔)
//
// 🇸🇦 بالعربي:
// عندك مصفوفة أرقام غير مرتبة `nums`
// المطلوب: إيجاد طول أطول سلسلة متتالية من الأرقام
//
// لازم الحل يكون O(n) - وده التحدي! 🤔
//
// Example 1:
//   Input: nums = [100, 4, 200, 1, 3, 2]
//   Output: 4
//
//   Explanation (الشرح):
//   The longest consecutive sequence is [1, 2, 3, 4]
//   Length = 4
//   أطول سلسلة متتالية هي [1, 2, 3, 4] وطولها 4
//
// Example 2:
//   Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
//   Output: 9
//
//   Explanation (الشرح):
//   The longest consecutive sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]
//   Length = 9
//   أطول سلسلة هي [0, 1, 2, 3, 4, 5, 6, 7, 8] وطولها 9
//
// Example 3:
//   Input: nums = [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]
//   Output: 7
//   
//   Explanation: [3, 4, 5, 6, 7, 8, 9] = length 7
//
// Constraints:
//   - 0 <= nums.length <= 10^5
//   - -10^9 <= nums[i] <= 10^9
//

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
// 🇬🇧 The Key Question: How do I find consecutive sequences efficiently?
//
// 💭 First Intuition (الفكرة الأولى):
//    If I SORT the array first, consecutive numbers will be NEXT to each other!
//    Then I just scan and count.
//    
//    But wait... sorting is O(n log n), and the problem asks for O(n)! 😱
//
// 💡 The Clever Insight (الفكرة الذكية):
//    What if I use a HashSet to check numbers in O(1)?
//    
//    The TRICK: Only start counting from the BEGINNING of a sequence!
//    
//    How do I know if a number is the START of a sequence?
//    → If (num - 1) does NOT exist in the set!
//    
//    Example: [100, 4, 200, 1, 3, 2]
//    - 100: Is 99 in the set? NO → 100 is a START! Count: 100 → just 1
//    - 4: Is 3 in the set? YES → Skip! (3 will start this sequence)
//    - 200: Is 199 in the set? NO → 200 is a START! Count: 200 → just 1
//    - 1: Is 0 in the set? NO → 1 is a START! Count: 1,2,3,4 → 4! 🎯
//    - 3: Is 2 in the set? YES → Skip!
//    - 2: Is 1 in the set? YES → Skip!
//
// ─────────────────────────────────────────────────────────────────
//
// 🇸🇦 السؤال المهم: إزاي ألاقي السلاسل المتتالية بكفاءة؟
//
// 💭 الفكرة الأولى:
//    لو رتبت المصفوفة، الأرقام المتتالية هتبقى جنب بعض!
//    بس الترتيب O(n log n) والمطلوب O(n)! 😱
//
// 💡 الفكرة الذكية:
//    أستخدم HashSet عشان أتحقق من وجود أي رقم في O(1)
//    
//    الحيلة: أبدأ العد بس من بداية كل سلسلة!
//    
//    إزاي أعرف إن الرقم ده بداية سلسلة؟
//    → لو (num - 1) مش موجود في الـ Set!
//    
//    مثال: [100, 4, 200, 1, 3, 2]
//    - 100: هل 99 موجود؟ لأ → 100 بداية سلسلة! العد: 100 → 1 بس
//    - 4: هل 3 موجود؟ أيوا → تخطي! (3 هيبدأ السلسلة دي)
//    - 200: هل 199 موجود؟ لأ → 200 بداية! العد: 200 → 1 بس
//    - 1: هل 0 موجود؟ لأ → 1 بداية! العد: 1,2,3,4 → 4! 🎯
//    - 3: هل 2 موجود؟ أيوا → تخطي!
//    - 2: هل 1 موجود؟ أيوا → تخطي!
//
// 🎯 Why is this O(n)?
//    Each number is visited at most TWICE:
//    1. Once when checking if it's a sequence start
//    2. Once when counting (only if it's part of a sequence being counted)
//    
//    So total work = O(n) + O(n) = O(n) ✅
//
//    ليه ده O(n)؟
//    كل رقم بيتزار مرتين بالكتير:
//    1. مرة لما نشوف لو هو بداية سلسلة
//    2. مرة لما نعده (بس لو هو جزء من سلسلة بنعدها)
//    يعني المجموع = O(n) ✅
//

// -----------------------------------------------------------------
// 📖 Basic Concepts for Beginners (مفاهيم أساسية للمبتدئين)
// -----------------------------------------------------------------
//
// 1️⃣ What is a Set?
//    = A collection where each item appears ONCE (no duplicates)
//    = مجموعة كل عنصر فيها يظهر مرة واحدة بس (مفيش تكرار)
//    
//    const mySet = new Set([1, 2, 2, 3]); // Contains: {1, 2, 3}
//    mySet.has(2); // true - O(1) fast lookup!
//    mySet.has(5); // false
//
// 2️⃣ What does "unsorted" mean?
//    = The numbers are in random order, not arranged
//    = الأرقام في ترتيب عشوائي، مش مرتبة
//    
//    [4, 1, 3, 2] is unsorted ❌
//    [1, 2, 3, 4] is sorted ✅
//
// 3️⃣ What is O(n) vs O(n log n)?
//    = O(n) means you look at each item once (fast! ⚡)
//    = O(n log n) means sorting (slower but still ok)
//    
//    For 1 million items:
//    - O(n) = ~1 million operations
//    - O(n log n) = ~20 million operations
//    
//    O(n) = نظرة واحدة على كل عنصر (سريع!)
//    O(n log n) = ترتيب (أبطأ)
//

// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

// 🐢 Approach 1: Brute-Force using Sorting
// Time: O(n log n) - because of sorting
// Space: O(1) or O(n) depending on sort implementation
//
// هذا الحل سهل الفهم لكنه مش الأمثل!
// This is easy to understand but NOT optimal!

function longestConsecutiveSorting(nums: number[]): number {
    // 📦 Edge case: empty array
    // حالة خاصة: مصفوفة فاضية
    if (nums.length === 0) return 0;

    // 🔢 Step 1: Sort the array
    // الخطوة 1: رتب المصفوفة
    const sorted = [...nums].sort((a, b) => a - b);

    let longestStreak = 1;  // أطول سلسلة لقيناها
    let currentStreak = 1;  // السلسلة الحالية

    // 🔄 Step 2: Scan through sorted array
    // الخطوة 2: امشي على المصفوفة المرتبة
    for (let i = 1; i < sorted.length; i++) {
        // Skip duplicates (e.g., [1, 1, 2] - skip the second 1)
        // تخطى التكرارات
        if (sorted[i] === sorted[i - 1]) {
            continue;
        }

        // Is this number consecutive to the previous?
        // هل الرقم ده متتالي مع اللي قبله؟
        if (sorted[i] === sorted[i - 1] + 1) {
            // Yes! Extend current streak
            // أيوا! زوّد السلسلة الحالية
            currentStreak++;
        } else {
            // No! Start a new streak
            // لأ! ابدأ سلسلة جديدة
            longestStreak = Math.max(longestStreak, currentStreak);
            currentStreak = 1;
        }
    }

    // 📤 Don't forget the last streak!
    // متنساش السلسلة الأخيرة!
    return Math.max(longestStreak, currentStreak);
}

// ─────────────────────────────────────────────────────────────────

// ✅ Approach 2: Optimal using HashSet - O(n)!
// Time: O(n) - each number visited at most twice
// Space: O(n) - for the HashSet
//
// هذا هو الحل الأمثل! 🚀
// This is the OPTIMAL solution! 🚀

function longestConsecutiveOptimal(nums: number[]): number {
    // 📦 Edge case: empty array
    if (nums.length === 0) return 0;

    // 🗃️ Step 1: Put all numbers in a Set (for O(1) lookup)
    // الخطوة 1: حط كل الأرقام في Set (عشان البحث يبقى O(1))
    const numSet = new Set(nums);

    let longestStreak = 0;

    // 🔄 Step 2: Check each number
    // الخطوة 2: افحص كل رقم
    for (const num of numSet) {
        // 🔑 KEY INSIGHT: Only start counting if this is the START of a sequence!
        // الفكرة الأساسية: ابدأ العد بس لو ده بداية سلسلة!
        //
        // A number is the START of a sequence if (num - 1) is NOT in the set
        // الرقم بداية سلسلة لو (num - 1) مش موجود في الـ Set

        if (!numSet.has(num - 1)) {
            // 🎯 This is a sequence START! Let's count how long it goes
            // ده بداية سلسلة! نعد طولها

            let currentNum = num;
            let currentStreak = 1;

            // Keep counting while next number exists
            // استمر في العد طول ما الرقم اللي بعده موجود
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            // 📊 Update longest if current is better
            // حدّث الأطول لو الحالي أحسن
            longestStreak = Math.max(longestStreak, currentStreak);
        }
        // If (num - 1) exists, SKIP! That number will start the sequence.
        // لو (num - 1) موجود، تخطي! الرقم ده هيبدأ السلسلة.
    }

    return longestStreak;
}

// ─────────────────────────────────────────────────────────────────

// 🐌 Approach 3: Brute-Force (Very Slow! - For understanding only)
// Time: O(n³) - TERRIBLE! Never use this in real code!
// Space: O(1)
//
// هذا الحل بطيء جداً! بس مهم نفهمه عشان نعرف ليه الحلول التانية أفضل

function longestConsecutiveBruteForce(nums: number[]): number {
    let longestStreak = 0;

    // For each number, try to build a sequence starting from it
    // لكل رقم، جرب تبني سلسلة تبدأ منه
    for (const num of nums) {
        let currentNum = num;
        let currentStreak = 1;

        // Try to find the next consecutive number by scanning the ENTIRE array
        // جرب تلاقي الرقم اللي بعده بفحص المصفوفة كلها (بطيء جداً!)
        while (arrayContains(nums, currentNum + 1)) {
            currentNum++;
            currentStreak++;
        }

        longestStreak = Math.max(longestStreak, currentStreak);
    }

    return longestStreak;
}

// Helper function for brute-force (O(n) each call!)
function arrayContains(arr: number[], target: number): boolean {
    for (const num of arr) {
        if (num === target) return true;
    }
    return false;
}

// -----------------------------------------------------------------
// 3. Visual Explanation (شرح بصري)
// -----------------------------------------------------------------
//
//  Input: nums = [100, 4, 200, 1, 3, 2]
//
//  Step 1: Create a Set
//  ┌─────────────────────────────────────────────────────────────┐
//  │ Set = {100, 4, 200, 1, 3, 2}                               │
//  │ (Order doesn't matter in a Set)                            │
//  └─────────────────────────────────────────────────────────────┘
//
//  Step 2: Find sequence starts and count
//  ┌─────────────────────────────────────────────────────────────────┐
//  │ Number │ Is (num-1) in Set? │ Action                           │
//  ├─────────────────────────────────────────────────────────────────┤
//  │ 100    │ 99? NO ❌          │ START! Count: 100→ Length=1      │
//  │ 4      │ 3? YES ✅          │ SKIP (3 will start this)         │
//  │ 200    │ 199? NO ❌         │ START! Count: 200→ Length=1      │
//  │ 1      │ 0? NO ❌           │ START! Count: 1→2→3→4 Length=4 🎯│
//  │ 3      │ 2? YES ✅          │ SKIP                             │
//  │ 2      │ 1? YES ✅          │ SKIP                             │
//  └─────────────────────────────────────────────────────────────────┘
//
//  Step 3: The sequence starting from 1
//  ┌─────────────────────────────────────────────────────────────┐
//  │                                                             │
//  │   1 ──→ 2 ──→ 3 ──→ 4 ──→ ✗ (5 not in set)                │
//  │   │     │     │     │                                       │
//  │   ↓     ↓     ↓     ↓                                       │
//  │   ✓     ✓     ✓     ✓     Length = 4 🎯                    │
//  │                                                             │
//  └─────────────────────────────────────────────────────────────┘
//
//  Output: 4
//
//  ═══════════════════════════════════════════════════════════════
//
//  🤔 Why skip numbers that have (num-1) in the set?
//
//  ليه نتخطى الأرقام اللي (num-1) بتاعها موجود؟
//
//  Because if we count from 4, we get: 4 (length 1)
//  But if we count from 1, we get: 1, 2, 3, 4 (length 4)
//  
//  We want to count ONCE from the START only!
//  This ensures O(n) - each number counted exactly once.
//
//  لأن لو عدينا من 4، هنحصل على: 4 (طول 1)
//  لكن لو عدينا من 1، هنحصل على: 1، 2، 3، 4 (طول 4)
//  
//  عايزين نعد مرة واحدة بس من البداية!
//  ده بيضمن إن كل رقم بيتعد مرة واحدة بس = O(n)
//

// -----------------------------------------------------------------
// 4. Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Let n = number of elements in the array
//
// ┌────────────────────────────────────────────────────────────────┐
// │ Approach        │ Time           │ Space     │ Notes          │
// ├────────────────────────────────────────────────────────────────┤
// │ Brute-Force     │ O(n³)          │ O(1)      │ ❌ Never use!  │
// │ Sorting         │ O(n log n)     │ O(n)      │ ⚠️ Not optimal │
// │ HashSet (Best!) │ O(n)           │ O(n)      │ ✅✅ Perfect!  │
// └────────────────────────────────────────────────────────────────┘
//
// 🔍 Detailed Analysis of Optimal Solution:
//
// Time O(n):
//   - Creating the Set: O(n)
//   - Main loop: O(n) - each number visited once
//   - Inner while loop: O(n) TOTAL across ALL iterations
//     (Each number is part of at most ONE sequence counting)
//   - Total: O(n) + O(n) = O(n) ✅
//
// Space O(n):
//   - HashSet stores all n numbers
//
// 🇸🇦 تحليل مفصل للحل الأمثل:
//
// الوقت O(n):
//   - إنشاء الـ Set: O(n)
//   - الحلقة الرئيسية: O(n) - كل رقم بيتزار مرة
//   - حلقة الـ while الداخلية: O(n) إجمالي لكل التكرارات
//     (كل رقم بيتعد مرة واحدة بس في سلسلة واحدة)
//   - المجموع: O(n) ✅
//
// المساحة O(n):
//   - الـ HashSet بيخزن كل الـ n أرقام
//

// -----------------------------------------------------------------
// 5. Test Cases (اختبارات)
// -----------------------------------------------------------------

console.log("=".repeat(60));
console.log("🔢 Longest Consecutive Sequence - Test Cases");
console.log("   مسألة أطول سلسلة متتالية - اختبارات");
console.log("=".repeat(60));

// Helper to display results nicely
function displayConsecutiveResult(testName: string, input: number[], expected: number) {
    const sortingResult = longestConsecutiveSorting(input);
    const optimalResult = longestConsecutiveOptimal(input);
    
    console.log(`\n${testName}`);
    console.log(`   📥 Input: [${input.join(', ')}]`);
    console.log(`   📤 Sorting Solution: ${sortingResult}`);
    console.log(`   📤 Optimal Solution: ${optimalResult}`);
    console.log(`   ✅ Expected: ${expected}`);
    
    const status = optimalResult === expected ? "✅ PASS" : "❌ FAIL";
    console.log(`   ${status}`);
}

// Test Case 1: Main example from LeetCode
displayConsecutiveResult(
    "📌 Test 1 (Main Example / المثال الأساسي)",
    [100, 4, 200, 1, 3, 2],
    4
);

// Test Case 2: Longer sequence
displayConsecutiveResult(
    "📌 Test 2 (Longer Sequence / سلسلة أطول)",
    [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
    9
);

// Test Case 3: Empty array
displayConsecutiveResult(
    "📌 Test 3 (Empty Array / مصفوفة فاضية)",
    [],
    0
);

// Test Case 4: Single element
displayConsecutiveResult(
    "📌 Test 4 (Single Element / عنصر واحد)",
    [5],
    1
);

// Test Case 5: All same numbers (duplicates)
displayConsecutiveResult(
    "📌 Test 5 (All Duplicates / كلهم متكررين)",
    [1, 1, 1, 1],
    1
);

// Test Case 6: Two separate sequences
displayConsecutiveResult(
    "📌 Test 6 (Two Sequences / سلسلتين منفصلتين)",
    [1, 2, 3, 100, 101, 102, 103],
    4  // [100, 101, 102, 103] is longer than [1, 2, 3]
);

// Test Case 7: Negative numbers
displayConsecutiveResult(
    "📌 Test 7 (Negative Numbers / أرقام سالبة)",
    [-3, -2, -1, 0, 1],
    5
);

// Test Case 8: No consecutive sequence (all gaps)
displayConsecutiveResult(
    "📌 Test 8 (No Sequence / مفيش سلسلة)",
    [10, 20, 30, 40],
    1  // Each number is alone
);

// Test Case 9: Already sorted input
displayConsecutiveResult(
    "📌 Test 9 (Already Sorted / مرتبة مسبقاً)",
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    10
);

// Test Case 10: Reverse sorted with gaps
displayConsecutiveResult(
    "📌 Test 10 (Reverse with Gaps / معكوسة مع فجوات)",
    [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
    7  // [3,4,5,6,7,8,9]
);

console.log("\n" + "=".repeat(60));
console.log("✅ All tests completed! (تم تنفيذ كل الاختبارات)");
console.log("=".repeat(60));

// -----------------------------------------------------------------
// 6. Interview Tips (نصائح للمقابلات)
// -----------------------------------------------------------------
//
// 🎯 Common Interview Questions:
//    1. "Why can't you just sort?" → "Sorting is O(n log n), we need O(n)"
//    2. "How is this O(n) if you have nested loops?" → Explain that each 
//       number is visited at most twice total
//    3. "What about duplicates?" → The Set handles them automatically!
//
// 🎯 أسئلة شائعة في المقابلات:
//    1. "ليه مش ترتب وخلاص؟" → "الترتيب O(n log n)، المطلوب O(n)"
//    2. "إزاي ده O(n) ولو عندك حلقتين؟" → اشرح إن كل رقم بيتزار مرتين بالكتير
//    3. "والتكرارات؟" → الـ Set بيشيلها أوتوماتيك!
//
// 🔑 Key Points to Mention:
//    - "I'll use a HashSet for O(1) lookups"
//    - "The trick is to only count from sequence STARTS"
//    - "A start is a number where (num-1) doesn't exist in the set"
//
// 🔑 نقاط مهمة تذكرها:
//    - "هستخدم HashSet عشان البحث يبقى O(1)"
//    - "الحيلة إني أعد بس من بداية كل سلسلة"
//    - "البداية = رقم اللي (num-1) مش موجود في الـ Set"
//
// 📝 Related Problems (مسائل متشابهة):
//    1. Missing Number (LeetCode #268) - Easier
//    2. Find All Numbers Disappeared in Array (LeetCode #448)
//    3. Longest Increasing Subsequence (LeetCode #300) - Harder, different!
//    4. Union Find problems - Same pattern
//

// -----------------------------------------------------------------
// 7. Key Takeaways (الدروس المستفادة)
// -----------------------------------------------------------------
//
// 1️⃣ HashSet is your friend! (الـ HashSet صديقك!)
//    When you need to check "does X exist?" in O(1), use a Set!
//    لما تحتاج تتحقق "هل X موجود؟" في O(1)، استخدم Set!
//
// 2️⃣ Start from the beginning only (ابدأ من البداية بس!)
//    The clever insight is to avoid redundant counting by only
//    starting sequences from their first element.
//    الفكرة الذكية إنك تتجنب العد المكرر بإنك تبدأ السلاسل من أولها بس.
//
// 3️⃣ Nested loops ≠ Bad complexity (حلقتين متداخلتين ≠ تعقيد سيء!)
//    Even with nested loops, if each element is processed O(1) times
//    TOTAL, the complexity is still O(n).
//    حتى لو عندك حلقتين، لو كل عنصر بيتمر عليه O(1) مرة إجمالي،
//    التعقيد لسه O(n).
//
// 4️⃣ Think about what makes a good "starting point" (فكر في البداية الصح!)
//    In many sequence problems, identifying where to START counting
//    is the key to efficiency.
//    في مسائل السلاسل كتير، تحديد من أين تبدأ العد هو مفتاح الكفاءة.
//
// 5️⃣ Trade-off: Time vs Space (المقايضة: الوقت مقابل المساحة)
//    We use O(n) extra space (HashSet) to achieve O(n) time.
//    Sometimes you NEED extra space for optimal time.
//    بنستخدم مساحة O(n) إضافية (HashSet) عشان نحصل على وقت O(n).
//    أحياناً لازم تستخدم مساحة إضافية عشان تحصل على وقت أفضل.
//

// -----------------------------------------------------------------
// 8. Bonus: Step-by-Step Walkthrough (مكافأة: شرح خطوة بخطوة)
// -----------------------------------------------------------------
//
// Let's trace through nums = [100, 4, 200, 1, 3, 2]
//
// 🔵 Create Set: {100, 4, 200, 1, 3, 2}
// 🔵 longestStreak = 0
//
// Iteration 1: num = 100
//   Is 99 in Set? NO → This is a sequence START!
//   Count: 100 → Is 101 in Set? NO → Stop
//   currentStreak = 1
//   longestStreak = max(0, 1) = 1
//
// Iteration 2: num = 4
//   Is 3 in Set? YES → SKIP (not a start)
//
// Iteration 3: num = 200
//   Is 199 in Set? NO → This is a sequence START!
//   Count: 200 → Is 201 in Set? NO → Stop
//   currentStreak = 1
//   longestStreak = max(1, 1) = 1
//
// Iteration 4: num = 1
//   Is 0 in Set? NO → This is a sequence START!
//   Count: 1 → Is 2 in Set? YES → Continue
//          2 → Is 3 in Set? YES → Continue
//          3 → Is 4 in Set? YES → Continue
//          4 → Is 5 in Set? NO → Stop
//   currentStreak = 4
//   longestStreak = max(1, 4) = 4 🎯
//
// Iteration 5: num = 3
//   Is 2 in Set? YES → SKIP (not a start)
//
// Iteration 6: num = 2
//   Is 1 in Set? YES → SKIP (not a start)
//
// 🎉 Final Answer: 4
//
