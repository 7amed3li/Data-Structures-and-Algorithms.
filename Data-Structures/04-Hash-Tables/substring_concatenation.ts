// =================================================================
// Problem: Substring with Concatenation of All Words
//          (اكتشاف النصوص المكونة من مجموعة كلمات)
// Description: Find all starting indices of substring(s) in s that is a 
//              concatenation of each word in words exactly once.
// Category: Hash Tables, Strings, Sliding Window
// Source: LeetCode #30 (HARD 🔥)
// Date: 6 Jan 2026
// =================================================================

// =================================================================
// 📚 Problem Understanding (فهم المسألة)
// =================================================================
//
// 🇬🇧 English:
// You are given a string `s` and an array of strings `words`.
// All words in `words` are of the SAME LENGTH.
// You need to find all starting indices in `s` where a substring
// is formed by concatenating ALL words in `words` in ANY order.
//
// Example:
//   s = "barfoothefoobarman", words = ["foo", "bar"]
//   - "barfoo" starts at index 0 (bar + foo)
//   - "foobar" starts at index 9 (foo + bar)
//   Output: [0, 9]
//
// 🇸🇦 بالعربي:
// عندك نص طويل `s` ومجموعة كلمات `words`.
// كل الكلمات في `words` لها نفس الطول.
// المطلوب: تلاقي الأماكن (indices) اللي بيبدأ عندها نص مكون من 
// "كل الكلمات" الموجودة في القائمة، بأي ترتيب، وبدون حروف زيادة في النص.
//
// مثال:
//   s = "barfoothefoobarman", words = ["foo", "bar"]
//   - "barfoo" بتبدأ من 0 (تكونت من bar و foo)
//   - "foobar" بتبدأ من 9 (تكونت من foo و bar)
//   النتيجة: [0, 9]
//
// 💡 The Challenge (التحدي):
//    1. All words must be used exactly once.
//    2. Words have the same length (this is a key hint!).
//    3. Efficiency matters! A simple brute-force will be too slow.
//

// -----------------------------------------------------------------
// 📝 My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
// 🇬🇧 How to check a substring?
//    Since all words have the same length `L`, any valid substring
//    must have length = `words.length * L`.
//
// 💡 The Insight: Hash Tables & Sliding Window
//    1. Count how many times each word appears in `words` using a Map.
//    2. Use a sliding window to check segments of the main string.
//    3. Because words have length `L`, we can run the sliding window
//       `L` times, starting from index 0, 1, ..., up to L-1.
//    4. This ensures we cover all possible "word boundaries".
//
// 🇸🇦 إزاي نتأكد إن الجزء ده من النص صح؟
//    بما إن كل الكلمات لها نفس الطول `L`.. يبقى أي نص صالح لازم 
//    يكون طوله = `عدد الكلمات * L`.
//
// 💡 الفكرة: جداول التجزئة والنافذة المنزلقة (Sliding Window)
//    1. نعد كل كلمة في `words` اتكررت كام مرة ونحطها في Map.
//    2. نستخدم "نافذة منزلقة" عشان نعد الكلمات في مقاطع النص.
//    3. عشان الكلمات طولها `L`.. هنعمل النافذة دي `L` مرات.
//       مرة تبدأ من صفر، ومرة من 1، لحد `L-1`.
//    4. كده نضمن إننا جربنا كل التقسيمات الممكنة للكلمات.
//

// -----------------------------------------------------------------
// 🚀 Implementation (التنفيذ)
// -----------------------------------------------------------------

/**
 * Finds starting indices of concatenated substrings.
 * @param s The main string
 * @param words The list of words to concatenate
 */
function findSubstring(s: string, words: string[]): number[] {
    const result: number[] = [];
    if (!s || words.length === 0) return result;

    const wordLen = words[0].length;
    const wordCount = words.length;
    const totalLen = wordLen * wordCount;
    const sLen = s.length;

    // 📊 Step 1: Create a frequency Map for the target words
    // الخطوة 1: إنشاء Map لعد تكرار الكلمات المطلوبة
    const targetMap = new Map<string, number>();
    for (const word of words) {
        targetMap.set(word, (targetMap.get(word) || 0) + 1);
    }

    // 🔄 Step 2: Sliding Window starting at different offsets (0 to wordLen-1)
    // الخطوة 2: تشغيل النافذة المنزلقة بـ "إزاحات" مختلفة
    for (let i = 0; i < wordLen; i++) {
        let left = i;
        let right = i;
        const currentMap = new Map<string, number>();
        let count = 0; // Tracks how many valid words we've found in current window

        // Move the right boundary of the window word by word
        while (right + wordLen <= sLen) {
            const word = s.substring(right, right + wordLen);
            right += wordLen;

            if (targetMap.has(word)) {
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                count++;

                // If we have too many of this word, shrink from left
                // لو عندنا كلمة زيادة عن الحساب، نصغر النافذة من الشمال
                while (currentMap.get(word)! > targetMap.get(word)!) {
                    const leftWord = s.substring(left, left + wordLen);
                    currentMap.set(leftWord, currentMap.get(leftWord)! - 1);
                    count--;
                    left += wordLen;
                }

                // If window size matches target, we found a result!
                // لو عدد الكلمات في النافذة هو المطلوب، يبقى ده حل صح!
                if (count === wordCount) {
                    result.push(left);
                }
            } else {
                // Word not in target, reset window
                // كلمة مش موجودة أصلاً، نصفر النافذة
                currentMap.clear();
                count = 0;
                left = right;
            }
        }
    }

    return result;
}

// -----------------------------------------------------------------
// 🎨 Visual Explanation (شرح بصري)
// -----------------------------------------------------------------
//
// s = "bar foot he foo bar man", words = ["foo", "bar"]
//      ^   ^      ^   ^
//      |   |      |   |
// Offset 0: [bar, foo] -> Match! Index 0 ✅
// Offset 1: [arf, oot] -> No Match
// Offset 2: [rfo, oth] -> No Match
//
// When we move right:
// [bar, foo, the] -> "the" is invalid! 
// Reset window to start AFTER "the".
//

// -----------------------------------------------------------------
// 📊 Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Let N = length of string s, K = number of words, L = length of each word
//
// 1. Time Complexity: O(L * (N/L)) = O(N)
//    We pass over the string L times, and in each pass, we move 
//    right and left pointers from start to finish.
//
// 2. Space Complexity: O(K * L)
//    To store the word frequencies in our Maps.
//
// 🇸🇦 التحليل:
// - الوقت: O(N) لأننا بنمر على النص عدد ثابت من المرات (طول الكلمة).
// - المساحة: O(K * L) عشان نخزن الكلمات وتكرارها في الـ Map.
//

// -----------------------------------------------------------------
// 🧪 Test Cases (اختبارات)
// -----------------------------------------------------------------

console.log("=".repeat(60));
console.log("🔥 Substring With Concatenation - HARD 🔥");
console.log("=".repeat(60));

function test(s: string, words: string[], expected: number[]) {
    const result = findSubstring(s, words).sort((a, b) => a - b);
    const pass = JSON.stringify(result) === JSON.stringify(expected.sort((a, b) => a - b));
    console.log(`\ns: "${s}"\nwords: [${words}]`);
    console.log(`Result: [${result}] | Expected: [${expected}] | ${pass ? '✅ PASS' : '❌ FAIL'}`);
}

test("barfoothefoobarman", ["foo", "bar"], [0, 9]);
test("wordgoodgoodgoodbestword", ["word", "good", "best", "word"], []);
test("barfoofoobarthefoobarman", ["bar", "foo", "the"], [6, 9, 12]);
test("aaaaaaaaaaaaaa", ["aa", "aa"], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log("\n" + "=".repeat(60));
console.log("✅ Implementation & Testing Completed!");
console.log("=".repeat(60));
