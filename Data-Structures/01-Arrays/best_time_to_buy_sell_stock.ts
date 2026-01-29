/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📌 Problem: Best Time to Buy and Sell Stock
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Difficulty: 🟢 Easy
 * LeetCode: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Tags: Array, Dynamic Programming, Greedy
 * Companies: Amazon, Google, Facebook, Microsoft, Bloomberg
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 📖 Problem Statement
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * You are given an array `prices` where prices[i] is the price of a given stock
 * on the ith day.
 * 
 * You want to maximize your profit by choosing a **single day** to buy one stock
 * and choosing a **different day in the future** to sell that stock.
 * 
 * Return the **maximum profit** you can achieve from this transaction.
 * If you cannot achieve any profit, return 0.
 * 
 * 🇪🇬 بالعربي:
 * معطى مصفوفة أسعار الأسهم لكل يوم
 * عايز تحقق أقصى ربح عن طريق:
 * 1. تشتري السهم في يوم واحد
 * 2. تبيعه في يوم تاني في المستقبل (بعد يوم الشراء)
 * 
 * ارجع أقصى ربح ممكن، لو مفيش ربح ارجع 0
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 💡 Examples
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6)
 *              Profit = 6 - 1 = 5
 * 
 * Example 2:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: No profit possible (prices keep decreasing)
 * 
 * Example 3:
 * Input: prices = [2,4,1]
 * Output: 2
 * Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ 🐢 BRUTE FORCE APPROACH                                                   │
// └──────────────────────────────────────────────────────────────────────────┘

/**
 * 🧠 Thought Process (English):
 * Try every possible pair (buy day, sell day) where sell day > buy day.
 * Track the maximum profit found.
 * 
 * 🧠 Thought Process (Arabic):
 * نجرب كل زوج ممكن (يوم الشراء، يوم البيع) حيث يوم البيع > يوم الشراء
 * نتتبع أقصى ربح لقيناه
 * 
 * @param prices - Array of stock prices
 * @returns Maximum profit
 */
function maxProfitBruteForce(prices: number[]): number {
  let maxProfit = 0;
  
  // Try every buy day
  for (let buyDay = 0; buyDay < prices.length - 1; buyDay++) {
    // Try every sell day after buy day
    for (let sellDay = buyDay + 1; sellDay < prices.length; sellDay++) {
      const profit = prices[sellDay] - prices[buyDay];
      maxProfit = Math.max(maxProfit, profit);
    }
  }
  
  return maxProfit;
}

/**
 * 📊 Complexity Analysis:
 * ─────────────────────────
 * Time:  O(n²) - Nested loops checking all pairs
 * Space: O(1)  - Only storing max profit
 * 
 * 🇪🇬 بالعربي:
 * الوقت: O(n²) - بنجرب كل زوج ممكن
 * المساحة: O(1) - بنخزن الربح الأقصى بس
 */

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ ⚡ OPTIMAL APPROACH - Single Pass                                        │
// └──────────────────────────────────────────────────────────────────────────┘

/**
 * 🧠 Thought Process (English):
 * Key Insight: We want to buy at the MINIMUM price and sell at the MAXIMUM price
 * after that minimum.
 * 
 * Instead of trying all pairs:
 * - Keep track of the minimum price seen so far
 * - For each day, calculate profit if we sold today (current price - min price)
 * - Update max profit if current profit is better
 * 
 * This works because we're always comparing with the best (cheapest) buy option
 * we've seen up to this point!
 * 
 * 🧠 Thought Process (Arabic):
 * الفكرة الذكية: عايزين نشتري بأرخص سعر ونبيع بأعلى سعر بعد كده
 * 
 * بدل ما نجرب كل الأزواج:
 * - نتتبع أقل سعر شفناه لحد دلوقتي
 * - لكل يوم، نحسب الربح لو بعنا النهارده (السعر الحالي - أقل سعر)
 * - نحدّث الربح الأقصى لو الربح الحالي أحسن
 * 
 * الطريقة دي بتشتغل لأننا دايماً بنقارن بأحسن (أرخص) فرصة شراء شفناها!
 * 
 * Visual Example:
 * prices = [7, 1, 5, 3, 6, 4]
 * 
 * Day 0: price=7, minPrice=7,  profit=0,  maxProfit=0
 * Day 1: price=1, minPrice=1,  profit=0,  maxProfit=0  ← new minimum!
 * Day 2: price=5, minPrice=1,  profit=4,  maxProfit=4  ← bought at 1, sell at 5
 * Day 3: price=3, minPrice=1,  profit=2,  maxProfit=4
 * Day 4: price=6, minPrice=1,  profit=5,  maxProfit=5  ← bought at 1, sell at 6!
 * Day 5: price=4, minPrice=1,  profit=3,  maxProfit=5
 * 
 * Answer: 5 (buy at 1, sell at 6)
 * 
 * @param prices - Array of stock prices
 * @returns Maximum profit
 */
function maxProfit(prices: number[]): number {
  // Edge case: empty or single price
  if (prices.length <= 1) return 0;
  
  let minPrice = prices[0];  // Minimum price seen so far
  let maxProfit = 0;         // Maximum profit found
  
  // Start from day 1 (can't sell on day 0)
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    
    // Calculate profit if we sell today
    const potentialProfit = currentPrice - minPrice;
    
    // Update max profit if we found a better one
    maxProfit = Math.max(maxProfit, potentialProfit);
    
    // Update minimum price if current price is lower
    minPrice = Math.min(minPrice, currentPrice);
  }
  
  return maxProfit;
}

/**
 * 📊 Complexity Analysis:
 * ─────────────────────────
 * Time:  O(n)  - Single pass through array
 * Space: O(1)  - Only storing two variables
 * 
 * 🇪🇬 بالعربي:
 * الوقت: O(n) - تمريرة واحدة على المصفوفة
 * المساحة: O(1) - بنخزن متغيرين بس
 * 
 * ✅ This is the optimal solution!
 */

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 Test Cases
// ═══════════════════════════════════════════════════════════════════════════

console.log("═══════════════════════════════════════════════");
console.log("💰 Best Time to Buy and Sell Stock");
console.log("═══════════════════════════════════════════════\n");

// Test Case 1: Normal case with profit
console.log("Test 1: prices = [7,1,5,3,6,4]");
console.log("Expected: 5 (buy at 1, sell at 6)");
console.log("Brute Force:", maxProfitBruteForce([7, 1, 5, 3, 6, 4]));
console.log("Optimal:    ", maxProfit([7, 1, 5, 3, 6, 4]));
console.log();

// Test Case 2: Decreasing prices (no profit)
console.log("Test 2: prices = [7,6,4,3,1]");
console.log("Expected: 0 (no profit possible)");
console.log("Brute Force:", maxProfitBruteForce([7, 6, 4, 3, 1]));
console.log("Optimal:    ", maxProfit([7, 6, 4, 3, 1]));
console.log();

// Test Case 3: Small profit at beginning
console.log("Test 3: prices = [2,4,1]");
console.log("Expected: 2 (buy at 2, sell at 4)");
console.log("Brute Force:", maxProfitBruteForce([2, 4, 1]));
console.log("Optimal:    ", maxProfit([2, 4, 1]));
console.log();

// Test Case 4: Maximum profit at the end
console.log("Test 4: prices = [1,2,3,4,5]");
console.log("Expected: 4 (buy at 1, sell at 5)");
console.log("Brute Force:", maxProfitBruteForce([1, 2, 3, 4, 5]));
console.log("Optimal:    ", maxProfit([1, 2, 3, 4, 5]));
console.log();

// Test Case 5: Only two days
console.log("Test 5: prices = [3,8]");
console.log("Expected: 5 (buy at 3, sell at 8)");
console.log("Brute Force:", maxProfitBruteForce([3, 8]));
console.log("Optimal:    ", maxProfit([3, 8]));
console.log();

// Test Case 6: Large swings
console.log("Test 6: prices = [10,1,9,2,8,3]");
console.log("Expected: 8 (buy at 1, sell at 9)");
console.log("Brute Force:", maxProfitBruteForce([10, 1, 9, 2, 8, 3]));
console.log("Optimal:    ", maxProfit([10, 1, 9, 2, 8, 3]));

console.log("\n═══════════════════════════════════════════════");
console.log("✅ All tests completed!");
console.log("═══════════════════════════════════════════════");

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 Key Takeaways
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 1️⃣ Greedy Approach: Keep track of the best option seen so far
 *    - Track minimum price to know the best buy opportunity
 *    - Calculate profit for each day using this minimum
 * 
 * 2️⃣ Single Pass Pattern: Don't need to look ahead or behind
 *    - We can solve in one pass by maintaining state
 *    - minPrice = best option from the past
 *    - maxProfit = best result we've found
 * 
 * 3️⃣ State Tracking is Key:
 *    - Instead of trying all combinations, track what matters
 *    - We only need: min price so far + max profit so far
 * 
 * 4️⃣ This pattern appears in many problems:
 *    - Maximum subarray (Kadane's algorithm)
 *    - Best time to buy and sell stock II, III, IV
 *    - Water container problems
 * 
 * 🇪🇬 الخلاصة:
 * - الـ Greedy Approach بيخليك تتتبع أحسن خيار شفته لحد دلوقتي
 * - Single Pass = كفاءة عالية (O(n) بدل O(n²))
 * - تتبع الـ State المهم بس (أقل سعر، أقصى ربح)
 * - الـ pattern دا بيتكرر في مسائل كتير مشهورة!
 */

export { maxProfit, maxProfitBruteForce };
