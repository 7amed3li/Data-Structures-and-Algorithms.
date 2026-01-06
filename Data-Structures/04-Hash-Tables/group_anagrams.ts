// =================================================================
// Problem: Group Anagrams (تجميع الكلمات المتشابهة)
// Description: Group strings that are anagrams of each other
// Category: Hash Tables, Strings, Sorting
// Source: LeetCode #49 (Top Interview Question!)
// Difficulty: 🟡 Medium (متوسط)
// Date: 2 Jan 2026
// =================================================================

// =================================================================
// 📚 What is an Anagram? (ما هو الـ Anagram؟)
// =================================================================
//
// 🇬🇧 English:
// An Anagram is when two words have the SAME letters in a DIFFERENT order.
// Think of it like LEGO blocks - you have the same pieces, just arranged differently!
//
// Example:
//   "eat" and "tea" and "ate"
//   All have the same letters: e, a, t
//   Just in different order!
//
// 🇸🇦 بالعربي:
// الـ Anagram = كلمتين فيهم نفس الحروف بترتيب مختلف
//
// مثال بسيط:
//   "eat" و "tea" و "ate" 
//   كل الكلمات دي فيها نفس الحروف: e, a, t
//   بس الترتيب مختلف!
//   
//   تخيل إن الحروف زي قطع الليجو 🧱
//   عندك 3 قطع: [e] [a] [t]
//   تقدر ترتبهم بأكتر من طريقة:
//   [e][a][t] = "eat"
//   [t][e][a] = "tea"  
//   [a][t][e] = "ate"
//   كلهم anagrams لبعض!
//
// More Examples:
//   "cat" and "act" and "tac" = all anagrams ✅
//   "cat" and "dog" = NOT anagrams ❌ (different letters)
//   "cat" and "cats" = NOT anagrams ❌ (different number of letters)
//

// -----------------------------------------------------------------
// 📝 Problem Statement (نص المسألة)
// -----------------------------------------------------------------
//
// 🇬🇧 English:
// Given an array of strings `strs`, group the anagrams together.
// You can return the answer in any order.
//
// 🇸🇦 بالعربي:
// عندك مجموعة كلمات (array of strings)
// المطلوب: جمّع الكلمات اللي هي anagrams لبعض مع بعض
//
// Example 1:
//   Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
//   Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
//   
//   Explanation (الشرح):
//   - "eat", "tea", "ate" = same letters = one group
//   - "tan", "nat" = same letters = one group
//   - "bat" = alone = its own group
//
// Example 2:
//   Input: strs = [""]
//   Output: [[""]]
//
// Example 3:
//   Input: strs = ["a"]
//   Output: [["a"]]
//
// Constraints:
//   - 1 <= strs.length <= 10^4
//   - 0 <= strs[i].length <= 100
//   - strs[i] consists of lowercase English letters only
//

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
// 🇬🇧 The Key Question: How do I know if two words are anagrams?
//
// 💡 The Simple Insight:
//    If I SORT the letters of any word alphabetically,
//    all anagrams will become IDENTICAL!
//
//    Example:
//    "eat" → sort letters → "aet"
//    "tea" → sort letters → "aet"
//    "ate" → sort letters → "aet"
//    
//    They all become "aet"! 🎯
//    Same sorted form = anagrams!
//
// 🗺️ How do we group them?
//    We use a Hash Map (Dictionary)!
//    
//    Imagine you have many drawers 🗄️
//    Each drawer is labeled with the sorted letters
//    
//    Drawer "aet" contains: ["eat", "tea", "ate"]
//    Drawer "ant" contains: ["tan", "nat"]
//    Drawer "abt" contains: ["bat"]
//
// ─────────────────────────────────────────────────────────────────
//
// 🇸🇦 السؤال المهم: إزاي أعرف إن كلمتين anagrams؟
//
// 💡 الفكرة البسيطة:
//    لو رتبت حروف أي كلمة من الأصغر للأكبر (alphabetically)
//    كل الـ anagrams هتبقى متطابقة!
//
//    مثال:
//    "eat" → نرتب الحروف → "aet"
//    "tea" → نرتب الحروف → "aet"
//    "ate" → نرتب الحروف → "aet"
//    
//    كلهم بقوا "aet"! 🎯
//    يعني لو الحروف لما نرتبها بتطلع نفس النتيجة = anagrams!
//
// 🗺️ وإزاي نجمّعهم؟
//    هنستخدم Hash Map (جدول التجزئة)!
//    
//    تخيل إن عندك أدراج كتير 🗄️
//    كل درج اسمه = الحروف مرتبة
//    
//    "aet" ← الدرج ده فيه: ["eat", "tea", "ate"]
//    "ant" ← الدرج ده فيه: ["tan", "nat"]
//    "abt" ← الدرج ده فيه: ["bat"]
//

// -----------------------------------------------------------------
// 📖 Basic Concepts for Beginners (مفاهيم أساسية للمبتدئين)
// -----------------------------------------------------------------
//
// 1️⃣ What is an Array?
//    = A list of items in order
//    = قائمة فيها عناصر مرتبة
//    Example: ["eat", "tea", "tan"] = list with 3 words
//    Access first item: array[0] = "eat"
//
// 2️⃣ What is a String?
//    = A sequence of characters
//    = سلسلة من الحروف
//    Example: "eat" = 3 characters: 'e', 'a', 't'
//
// 3️⃣ What is a Map (Dictionary)?
//    = A way to store pairs (key → value)
//    = طريقة لتخزين أزواج (مفتاح → قيمة)
//    Example: "aet" → ["eat", "tea", "ate"]
//    Key = "aet", Value = list of words
//
// 4️⃣ What does sort mean?
//    = Arrange items from smallest to largest
//    = ترتيب العناصر من الأصغر للأكبر
//    Example: ['e', 'a', 't'].sort() = ['a', 'e', 't']
//

// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

// ✅ Approach 1: Using Sorting (باستخدام الترتيب)
// Time: O(N * K log K) where N = number of words, K = max word length
// Space: O(N * K)
function groupAnagramsSorting(strs: string[]): string[][] {
    // 📦 Step 1: Create an empty Map (dictionary)
    // Key = sorted word, Value = list of original words
    //
    // الخطوة 1: أنشئ Map (قاموس) فاضي
    // المفتاح = الكلمة بعد ترتيب حروفها، القيمة = قائمة الكلمات الأصلية
    const groups = new Map<string, string[]>();

    // 🔄 Step 2: Loop through each word
    // الخطوة 2: أمر على كل كلمة في القائمة
    for (const str of strs) {
        // 📝 Step 3: Sort the letters to create a key
        // 
        // str = "eat"
        // str.split('') = ['e', 'a', 't']  ← convert to array of letters
        // .sort() = ['a', 'e', 't']        ← sort alphabetically
        // .join('') = "aet"                ← convert back to string
        //
        // الخطوة 3: رتب حروف الكلمة لعمل مفتاح
        const key = str.split('').sort().join('');

        // 🗄️ Step 4: Add word to the appropriate group
        // الخطوة 4: ضيف الكلمة للمجموعة المناسبة
        if (!groups.has(key)) {
            // If this key is new, create an empty array
            // لو المفتاح ده جديد، أنشئ قائمة فاضية
            groups.set(key, []);
        }
        // Add the original word to the list
        // ضيف الكلمة الأصلية للقائمة
        groups.get(key)!.push(str);
    }

    // 📤 Step 5: Return all groups as array of arrays
    // الخطوة 5: رجّع كل المجموعات كقائمة من القوائم
    return Array.from(groups.values());
}

// ─────────────────────────────────────────────────────────────────

// ✅ Approach 2: Using Character Count (More Optimal!)
// Time: O(N * K) - Faster than sorting!
// Space: O(N * K)
//
// � Different Idea (فكرة مختلفة):
//    Instead of sorting letters, COUNT them!
//    بدل ما نرتب الحروف، نعدّهم!
//    
//    "eat": a=1, e=1, t=1
//    "tea": a=1, e=1, t=1
//    Same count! = anagrams
//
// 🤔 Why is this faster?
//    Sorting = O(K log K) per word
//    Counting = O(K) per word - just one pass!
//    
//    ليه ده أسرع؟
//    الترتيب = O(K log K) لكل كلمة
//    العد = O(K) فقط - مرور واحد!

function groupAnagramsOptimal(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const str of strs) {
        // 📊 Create an array to count each letter (26 English letters)
        // Index 0 = count of 'a', Index 1 = count of 'b', etc.
        //
        // أنشئ مصفوفة لعد كل حرف (26 حرف إنجليزي)
        const charCount = new Array(26).fill(0);

        // 🔢 Count each letter in the word
        // عدّ كل حرف في الكلمة
        for (const char of str) {
            // 'a'.charCodeAt(0) = 97
            // 'a' - 97 = 0  (index for 'a')
            // 'b' - 97 = 1  (index for 'b')
            // 'z' - 97 = 25 (index for 'z')
            const index = char.charCodeAt(0) - 97;
            charCount[index]++;
        }

        // 🔑 Convert count array to a string key
        // Example: [1,0,0,...,1,...,1] → "1#0#0#...#1#...#1"
        //
        // حول مصفوفة العد لمفتاح نصي
        const key = charCount.join('#');

        // 🗄️ Add to the group
        // ضيف للمجموعة
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(str);
    }

    return Array.from(groups.values());
}

// ─────────────────────────────────────────────────────────────────

// 🐢 Brute-Force Solution (for understanding only!)
// Time: O(N² * K log K) - Very slow!
// Space: O(N * K)
//
// This is slow! But important to understand WHY the other solutions are better.
// هذا الحل بطيء جداً! لكن مهم نفهمه لنعرف ليه الحلول التانية أفضل

function groupAnagramsBruteForce(strs: string[]): string[][] {
    // Track which words we've already used
    // مصفوفة لتتبع الكلمات اللي استخدمناها
    const used = new Array(strs.length).fill(false);
    const result: string[][] = [];

    // 🔍 Helper function: Are two words anagrams?
    // دالة مساعدة: هل كلمتين anagrams؟
    function areAnagrams(s1: string, s2: string): boolean {
        // If different lengths, can't be anagrams
        // لو الطول مختلف، مش ممكن يبقوا anagrams
        if (s1.length !== s2.length) return false;
        // Sort both and compare
        // رتب الاتنين وقارن
        return s1.split('').sort().join('') === s2.split('').sort().join('');
    }

    // 🔄 Loop through each word
    // أمر على كل كلمة
    for (let i = 0; i < strs.length; i++) {
        // Skip if we already used this word
        // لو استخدمنا الكلمة دي قبل كده، تخطاها
        if (used[i]) continue;

        // 📦 Start a new group with this word
        // ابدأ مجموعة جديدة بالكلمة دي
        const group: string[] = [strs[i]];
        used[i] = true;

        // 🔍 Find all its anagrams
        // دور على كل الـ anagrams بتاعتها
        for (let j = i + 1; j < strs.length; j++) {
            if (!used[j] && areAnagrams(strs[i], strs[j])) {
                group.push(strs[j]);
                used[j] = true;
            }
        }

        result.push(group);
    }

    return result;
}

// -----------------------------------------------------------------
// 3. Visual Explanation (شرح بصري)
// -----------------------------------------------------------------
//
//  Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
//
//  Step 1: Create keys for each word
//  ┌─────────────────────────────────────────────────────────┐
//  │ Word    │ Sorted Key │ What happens                    │
//  ├─────────────────────────────────────────────────────────┤
//  │ "eat"   │ "aet"      │ Map = {"aet": ["eat"]}          │
//  │ "tea"   │ "aet"      │ Map = {"aet": ["eat", "tea"]}   │
//  │ "tan"   │ "ant"      │ Map = {..., "ant": ["tan"]}     │
//  │ "ate"   │ "aet"      │ Map = {"aet": [..., "ate"]}     │
//  │ "nat"   │ "ant"      │ Map = {"ant": ["tan", "nat"]}   │
//  │ "bat"   │ "abt"      │ Map = {..., "abt": ["bat"]}     │
//  └─────────────────────────────────────────────────────────┘
//
//  Step 2: Extract all groups from HashMap
//  ┌─────────────────────────────────────────────────────────┐
//  │ Key     │ Value                                        │
//  ├─────────────────────────────────────────────────────────┤
//  │ "aet"   │ ["eat", "tea", "ate"]                        │
//  │ "ant"   │ ["tan", "nat"]                               │
//  │ "abt"   │ ["bat"]                                      │
//  └─────────────────────────────────────────────────────────┘
//
//  Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
//

// -----------------------------------------------------------------
// 4. Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Let N = number of strings, K = maximum length of a string
//
// ┌──────────────────────────────────────────────────────────┐
// │ Approach      │ Time           │ Space      │ Notes     │
// ├──────────────────────────────────────────────────────────┤
// │ Brute-Force   │ O(N² × K logK) │ O(N × K)   │ ❌ Too slow│
// │ Sorting       │ O(N × K logK)  │ O(N × K)   │ ✅ Good    │
// │ Counting      │ O(N × K)       │ O(N × K)   │ ✅✅ Best! │
// └──────────────────────────────────────────────────────────┘
//
// 🇬🇧 Simple Explanation:
//    If you have 1000 words, each 100 letters long:
//    - Brute-Force: 1,000,000 comparisons! 🐌
//    - Sorting: ~660,000 operations ⚡
//    - Counting: 100,000 operations only! �
//
// 🇸🇦 شرح مبسط:
//    لو عندك 1000 كلمة، كل كلمة 100 حرف:
//    - الـ Brute-Force: مليون مقارنة! 🐌
//    - الـ Sorting: حوالي 660,000 عملية ⚡
//    - الـ Counting: 100,000 عملية فقط! 🚀
//

// -----------------------------------------------------------------
// 5. Test Cases (اختبارات)
// -----------------------------------------------------------------

console.log("=".repeat(60));
console.log("🔤 Group Anagrams Problem - Test Cases");
console.log("   مسألة تجميع الـ Anagrams - اختبارات");
console.log("=".repeat(60));

// Helper to display results nicely
function displayAnagramsResult(testName: string, input: string[], result: string[][]) {
    console.log(`\n${testName}`);
    console.log(`   📥 Input: [${input.map(s => `"${s}"`).join(', ')}]`);
    const output = result.map(group => 
        `[${group.map(s => `"${s}"`).join(', ')}]`
    ).join(', ');
    console.log(`   📤 Output: [${output}]`);
}

// Test Case 1: Main example
const test1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log("\n📌 Test 1 (Main Example / المثال الأساسي):");
console.log("   Using Sorting Method:");
displayAnagramsResult("   Result", test1, groupAnagramsSorting(test1));
console.log("   ✅ Expected: [['eat','tea','ate'], ['tan','nat'], ['bat']]");

// Test Case 2: Empty string
const test2 = [""];
displayAnagramsResult("📌 Test 2 (Empty String / نص فارغ)", test2, groupAnagramsOptimal(test2));

// Test Case 3: Single character
const test3 = ["a"];
displayAnagramsResult("📌 Test 3 (Single Character / حرف واحد)", test3, groupAnagramsOptimal(test3));

// Test Case 4: All same anagrams
const test4 = ["abc", "bca", "cab", "acb"];
displayAnagramsResult("📌 Test 4 (All Anagrams / كلهم anagrams)", test4, groupAnagramsOptimal(test4));
console.log("   ✅ Expected: All in one group (الكل في مجموعة واحدة)");

// Test Case 5: No anagrams
const test5 = ["abc", "def", "ghi"];
displayAnagramsResult("📌 Test 5 (No Anagrams / لا يوجد anagrams)", test5, groupAnagramsOptimal(test5));
console.log("   ✅ Expected: Each in separate group (كل كلمة في مجموعة لوحدها)");

// Test Case 6: Mixed lengths
const test6 = ["a", "ab", "ba", "abc", "cba", "bac"];
displayAnagramsResult("📌 Test 6 (Mixed Lengths / أطوال مختلطة)", test6, groupAnagramsOptimal(test6));

console.log("\n" + "=".repeat(60));
console.log("✅ All tests completed! (تم تنفيذ كل الاختبارات بنجاح)");
console.log("=".repeat(60));

// -----------------------------------------------------------------
// 6. Interview Tips (نصائح للمقابلات)
// -----------------------------------------------------------------
//
// 🎯 When to use this pattern?
//    - Grouping similar items together
//    - Finding canonical forms of data
//    - Any problem where order doesn't matter
//
// 🎯 متى تستخدم هذا النمط؟
//    - تجميع عناصر متشابهة
//    - إيجاد "الشكل القياسي" للبيانات
//    - أي مسألة الترتيب فيها مش مهم
//
// � Common Variations (أسئلة متشابهة):
//    1. Valid Anagram (easier) - just compare two strings
//    2. Find All Anagrams in a String (Sliding Window)
//    3. Minimum Window Substring
//
// 📝 In an interview, ASK (في المقابلة، اسأل):
//    - Are letters lowercase English only? (هل الحروف إنجليزية صغيرة فقط؟)
//    - Is there Unicode?
//    - How many words expected?
//

// -----------------------------------------------------------------
// 7. Key Takeaways (الدروس المستفادة)
// -----------------------------------------------------------------
//
// 1️⃣ Canonical Form is powerful! (الشكل القياسي قوي!)
//    When things can be "the same" in different representations,
//    convert them to a single representation!
//    لما حاجات مختلفة ممكن تمثل نفس الشيء، حولهم لشكل موحد!
//
// 2️⃣ HashMap for grouping (HashMap للتجميع)
//    Use Map to group similar items
//    Key = canonical form, Value = list of original items
//    استخدم Map لتجميع العناصر المتشابهة
//
// 3️⃣ Time vs Space Trade-off (المقايضة بين الوقت والمساحة)
//    Counting is faster than sorting
//    But sorting code is simpler
//    Choose based on the situation!
//    العد أسرع من الترتيب، لكن كود الترتيب أبسط
//
// 4️⃣ Think about what makes things "equal" (فكر في اللي بيخلي الحاجات "متساوية")
//    For anagrams: same character frequencies
//    This insight leads directly to the solution!
//    للـ anagrams: نفس تكرار الحروف
//
