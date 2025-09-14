// =================================================================
// Problem: The Birthday Problem
// Description: Given a list of items, determine if any two are identical.
// Category: Hash Tables, Arrays
// Source: MIT 6.006 Lecture 1
// =================================================================

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
// >> The Brute-Force Approach (الحل الساذج)
//    The most straightforward idea is to compare every item with every other item using two nested loops.
//    - Time Complexity: O(n^2)
//    - Space Complexity: O(1)
//    - Why it's not optimal: Too slow for large inputs.
//
//    >> (شرحي بالعربي)
//    أول فكرة هي الحل المباشر. أمسك كل عنصر وأقارنه بكل العناصر الأخرى.
//    هذا يتطلب حلقتين متداخلتين (nested loops)، مما يجعل التعقيد الزمني O(n^2).
//
// >> The Optimal Approach (الحل الأمثل - باستخدام جدول التجزئة)
//    The bottleneck is the search. We can use a Hash Set to check "Have I seen this before?" in O(1) time.
//    - Time Complexity: O(n)
//    - Space Complexity: O(n)
//
//    >> (شرحي بالعربي)
//    المشكلة هي سرعة البحث. يمكن استخدام `Set` في JavaScript/TypeScript للبحث في خطوة واحدة O(1).
//    سأمر على القائمة مرة واحدة. لكل عنصر، أتحقق إذا كان موجودًا في الـ `Set`.
//    - إذا كان موجودًا، وجدت تكرارًا.
//    - إذا لم يكن، أضيفه إلى الـ `Set`.
//
// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

// `T` here is a generic type. This function can work with strings, numbers, etc.
// `T` هنا هو نوع عام. هذه الدالة يمكن أن تعمل مع النصوص والأرقام وغيرها.
function findDuplicateBruteForce<T>(items: T[]): boolean {
    const n = items.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (items[i] === items[j]) {
                console.log(`Match found (Brute-Force): ${items[i]}`);
                return true;
            }
        }
    }
    console.log("No match found (Brute-Force)");
    return false;
}

function findDuplicateOptimal<T>(items: T[]): boolean {
    const seenItems = new Set<T>();
    for (const item of items) {
        if (seenItems.has(item)) {
            console.log(`Match found (Optimal): ${item}`);
            return true;
        }
        seenItems.add(item);
    }
    console.log("No match found (Optimal)");
    return false;
}

// -----------------------------------------------------------------
// 3. Correctness & Complexity Analysis (الإثبات والتحليل)
// ... نفس التحليل السابق ...
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// 4. Example Usage (مثال للتجربة)
// -----------------------------------------------------------------
const sampleBirthdaysWithDuplicates: string[] = ["Jan-01", "Mar-15", "Aug-02", "May-20", "Mar-15", "Oct-11"];
const sampleBirthdaysNoDuplicates: string[] = ["Jan-01", "Mar-15", "Aug-02", "May-20"];

console.log("--- Testing with a list containing duplicates ---");
console.log("Input:", sampleBirthdaysWithDuplicates);
console.log("\nRunning Optimal Solution:");
findDuplicateOptimal(sampleBirthdaysWithDuplicates);
console.log("\nRunning Brute-Force Solution:");
findDuplicateBruteForce(sampleBirthdaysWithDuplicates);

console.log("\n" + "=".repeat(40) + "\n");

console.log("--- Testing with a list containing no duplicates ---");
console.log("Input:", sampleBirthdaysNoDuplicates);
console.log("\nRunning Optimal Solution:");
findDuplicateOptimal(sampleBirthdaysNoDuplicates);
console.log("\nRunning Brute-Force Solution:");
findDuplicateBruteForce(sampleBirthdaysNoDuplicates);

