// =================================================================
// Problem: Max Points on a Line (أكبر عدد من النقاط على خط واحد)
// Description: Find the maximum number of points that lie on the same straight line
// Category: Hash Tables, Math, Geometry
// Source: LeetCode #149 (HARD - صعب)
// Date: 17 Jan 2026
// =================================================================

// =================================================================
// 📚 What is Max Points on a Line? (ما هو أكبر عدد نقاط؟)
// =================================================================
//
// 🇬🇧 English:
// Given an array of points where points[i] = [xi, yi], represents a point on the
// X-Y plane, return the maximum number of points that lie on the same straight line.
//
// Example:
//   Input: points = [[1,1],[2,2],[3,3]]
//   Output: 3
//   Explanation: All points lie on the line y = x.
//
// 🇸🇦 بالعربي:
// عندك مجموعة من النقاط على مستوى ثنائي الأبعاد (2D plane).
// المطلوب: إيجاد أكبر عدد من النقاط اللي بتقع على نفس الخط المستقيم.
//
// مثال:
//   المدخلات: [[1,1], [2,2], [3,3]]
//   المخرجات: 3
//   الشرح: كل النقاط دي بتقع على الخط y = x.

// -----------------------------------------------------------------
// 📝 Problem Statement (نصف المسألة)
// -----------------------------------------------------------------
//
// 🇬🇧 English:
// You are given an array of `points` where each `point` is `[x, y]`.
// You need to find the maximum number of points that can be connected by a 
// single straight line.
//
// 🇸🇦 بالعربي:
// معاك مصفوفة `points`، كل عنصر فيها عبارة عن `[x, y]`.
// محتاج تشوف أكبر عدد ممكن من النقاط دي ممكن يوصل بينهم خط مستقيم واحد.

// -----------------------------------------------------------------
// 1. My Thought Process (كيف فكرت؟)
// -----------------------------------------------------------------
//
//  First Intuition (الفكرة الأولى):
//    A line is defined by two points. If I take every pair of points, I can find the line
//    equation passing through them. Then, for each line, I check how many other points
//    fall on it.
//    - This would be O(N^3) because:
//      pairs O(N^2) * checking other points O(N) = O(N^3).
//    - For N=300 (LeetCode constraint), N^3 = 27,000,000 which might be too slow or just borderline.
//    - Can we do better?
//
//  The Optimal Insight (الفكرة العبقرية):
//    Instead of checking all points for every line, let's fix one point `p1` and calculate
//    the slope between `p1` and every other point `p2`.
//    
//    - If `p1`, `p2`, and `p3` are on the same line, then the slope(p1, p2) MUST BE equal
//      to the slope(p1, p3).
//    - So, for a fixed `p1`, we can use a Hash Map to store frequencies of slopes!
//    - Map Key: Slope value -> Map Value: Count of points
//    
//    Algorithm:
//    1. Loop through each point `i` (as the "anchor" or starting point).
//    2. Create a map for this iteration.
//    3. Loop through every other point `j` (where j > i).
//    4. Calculate the slope between `points[i]` and `points[j]`.
//       - Slope = (y2 - y1) / (x2 - x1)
//    5. Store this slope in the map and update the max count.
//    
//    Wait! What about precision issues with floating point numbers?
//    - Yes, `0.333333...` might cause issues.
//    - Better approach: Represent slope as a fraction `dy / dx` in its simplest form.
//    - Divide both dy and dx by their Greatest Common Divisor (GCD).
//    - Key = "dy/dx" (string).
//
//    Special Case: Vertical lines (dx = 0). We can handle this or just treat it as `dy/0`, 
//    or just use the GCD method which handles it naturally (dx=0 -> gcd=dy -> 1/0).
//
// 🇸🇦 التفكير المنطقي:
//
//  الفكرة الأولى (البسيطة):
//    أي خط بيتعرف بنقطتين. لو جربنا كل زوج من النقاط وعملنا خط بينهم، وبعدين لفينا
//    على باقي النقاط نشوف مين بيقع على الخط ده.
//    - التعقيد هيكون O(N^3). لو عدد النقاط 300، ممكن الحل يعدي بس مش أحسن حاجة.
//
//  الفكرة الذكية (استخدام الـ Hash Map):
//    بدل ما نجرب كل الخطوط، خلينا نثبت نقطة واحدة `p1`، ونحسب الميل (slope) بينها وبين
//    كل النقاط التانية `p2`.
//
//    - لو النقط `p1`, `p2`, `p3` على نفس الخط، يبقى الميل بين (p1, p2) بيساوي الميل بين (p1, p3).
//    - يبقى ممكن نستخدم Hash Map، نخزن فيها الميل كـ مفتاح (Key) وعدد النقاط كـ قيمة (Value).
//
//    الخوارزمية:
//    1. نعمل لوب على كل نقطة `i` (ونعتبرها نقطة الارتكاز).
//    2. نعمل Map جديدة في كل لفة.
//    3. نعمل لوب تانية على باقي النقاط `j`.
//    4. نحسب الميل: (y2 - y1) / (x2 - x1).
//    5. نخزن الميل في الـ Map ونحدث أكبر عدد وصلنا له.
//
//    مشكلة الأرقام العشرية (Precision):
//    - القسمة ممكن تطلعلنا كسور غير منتهية زي 0.3333... وده بيعمل مشاكل في المقارنة.
//    - الحل: نخزن الميل كـ "كسر" (Bost/Maqam) في أبسط صورة.
//    - نقسم فرق الصادات (dy) وفرق السينات (dx) على العامل المشترك الأكبر (GCD) بينهم.
//    - المفتاح في الـ Map هيكون نص زي "dy/dx".
//    - الخطوط الرأسية هتتعالج تلقائياً لأن GCD هيخلي المقام 0 عادي (مثلاً 1/0).

// -----------------------------------------------------------------
// 2. Implementation (التنفيذ)
// -----------------------------------------------------------------

/**
 * Calculates the Greatest Common Divisor (GCD) of a and b
 * حساب العامل المشترك الأكبر
 */
function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

/**
 * Optimal Solution using Hash Map and Math
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
function maxPoints(points: number[][]): number {
    const n = points.length;
    if (n <= 2) return n; // If 2 or fewer points, they are always on a line

    let maxPointsOnLine = 1;

    for (let i = 0; i < n; i++) {
        // Map to store Slope -> Count
        // الماب عشان نخزن الميل -> العدد
        const slopes = new Map<string, number>();
        let localMax = 0;

        for (let j = i + 1; j < n; j++) {
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];

            // Simplify fraction using GCD
            // تبسيط الكسر باستخدام GCD
            const divisor = gcd(Math.abs(dx), Math.abs(dy));
            dx /= divisor;
            dy /= divisor;

            // Normalize signs to avoid duplicates like (1/-1) and (-1/1)
            // توحيد الإشارات، نفضل إن الـ dx يكون موجب، أو لو dx=0 يبقى dy موجب
            if (dx < 0) {
                dx = -dx;
                dy = -dy;
            } else if (dx === 0 && dy < 0) {
                // Vertical line case, make dy positive for consistency
                dy = -dy; 
            }

            // Create unique key for the slope
            // مفتاح مميز للميل
            const key = `${dy}/${dx}`;
            
            slopes.set(key, (slopes.get(key) || 0) + 1);
            localMax = Math.max(localMax, slopes.get(key)!);
        }

        // Add 1 because we counted points RELATIVE to point i, so we must add point i itself
        // بنزود 1 عشان احنا بنعد النقاط بالنسبة للنقطة i، فلازم نحسب i معانا
        maxPointsOnLine = Math.max(maxPointsOnLine, localMax + 1);
    }

    return maxPointsOnLine;
}

// -----------------------------------------------------------------
// 3. Complexity Analysis (تحليل التعقيد)
// -----------------------------------------------------------------
//
// Time Complexity: O(N^2) ✅
//   - Outer loop runs N times.
//   - Inner loop runs roughly N/2 times on average.
//   - Map operations and GCD are effectively O(1) or O(log(CoordinateRange)).
//   - Total: O(N^2). Since N <= 300, N^2 = 90,000 operations, which is very fast.
//
// Space Complexity: O(N) ✅
//   - In each iteration `i`, the map stores at most N-1 unique slopes.
//   - We reuse the map space for each outer iteration.

// -----------------------------------------------------------------
// 4. Test Cases (اختبارات)
// -----------------------------------------------------------------

function runTest(points: number[][], expected: number) {
    const start = performance.now();
    const result = maxPoints(points);
    const end = performance.now();
    
    // Formatting points for display
    const pointsStr = JSON.stringify(points).replace(/\],\[/g, '], [');

    console.log(`\n🔹 Input: ${pointsStr.length > 50 ? pointsStr.substring(0, 47) + '...' : pointsStr}`);
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
console.log("🧪 Testing Max Points on a Line");
console.log("=".repeat(50));

runTest([[1,1],[2,2],[3,3]], 3);
runTest([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]], 4);
runTest([[0,0]], 1); // Single point
runTest([[0,0],[1,1]], 2); // Two points
runTest([[1,1],[1,2],[1,3]], 3); // Vertical line
runTest([[1,1],[2,1],[3,1]], 3); // Horizontal line

// -----------------------------------------------------------------
// 5. Interview Tips (نصائح للمقابلات)
// -----------------------------------------------------------------
//
// 🎯 Key points to mention:
// 1. Mention the N^3 brute force first to show you understand the basics.
// 2. Explain WHY we optimize: geometric property of slopes (collinear points share slope).
// 3. Crucial: Mention the "floating point precision" problem and that you solve it using GCD.
//    Interviewers LOVE when you bring up numeric stability!
// 4. Don't forget duplicate points handling (though constraints often imply unique coordinates, check with interviewer).
//
// 🎯 نصائح للمقابلة:
// 1. قول الحل البسيط (Brute Force) الأول عشان تثبت إنك فاهم.
// 2. اشرح إحنا ليه بنحسن الحل: خاصية الميل في الخطوط المستقيمة.
// 3. مهم جداً: اتكلم عن مشكلة الأرقام العشرية (Precision) وإنك هتحلها بـ GCD.
//    المحاورين بيحبوا جداً النقطة دي!
// 4. اسأل لو النقط ممكن تتكرر (Duplicate points)، ولو أه، لازم تتعامل معاهم بشكل خاص (تزود عداد المكرر).
