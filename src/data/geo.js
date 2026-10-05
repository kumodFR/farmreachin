/* India geography for the operating-ecosystem visual.
   Source: the India outline from the Farminsta site (farminsta-web,
   src/lib/site/india-geo.ts, INDIA_OUTLINE_PATH), converted from its linear
   lon/lat projection back to coordinates and re-projected in Mercator to a
   900 x 1000 viewBox at authoring time and frozen here, so the page ships no
   mapping library and makes no data request.
   It follows India's official external boundary (Survey of India): full
   Jammu & Kashmir including Gilgit-Baltistan, and Aksai Chin — de-facto
   lines must not be shown on an India-facing site.
   Node positions are real city coordinates in the same projection.
   Note: internal state boundaries are intentionally absent — no verified
   state-boundary dataset has been approved. Add one path layer here if it is. */

export const INDIA_PATH = 'M757.86,448.3L761.55,446.12L772.21,448.77L787.28,445.28L790.88,433.03L799.08,412.89L799.7,402.16L805.83,397.54L809.7,387.61L812.88,372.61L816.17,361.62L823.88,357.17L829.41,354.32L839.34,345.19L856.54,339.06L864.05,330.24L879.03,310.71L858.21,302.62L847.94,305.17L848.3,300.92L853.96,285.58L841.32,268.99L817.21,282.81L799.83,273.46L785.35,283.18L778.75,294.12L760.42,296.58L756.99,306.56L742.59,318.75L734.77,324.13L721.42,334.94L724.33,354.67L712.29,357.31L690.13,358.48L672.05,355.68L657.78,361.12L635.38,356.4L628.85,352.28L624.54,346.56L626.65,337.37L628.14,318.22L609.32,319.92L606.67,330.65L604.43,343.87L606.54,366.05L593.25,371.56L575.12,365.64L565.72,370.08L539.03,364.32L522.52,359.25L507.9,351.05L503.86,339.9L488.46,334.02L481.53,340.05L464.75,340.05L448.29,335.04L432.84,323.16L419.18,319.55L398.87,304.44L377.14,296.95L369.8,289.97L370.07,286.46L375.02,269.51L378.67,259.5L395.22,244.74L370.89,223.78L350.47,214.01L334.98,206.76L328.87,179.3L320.76,163.74L331.43,159.22L341.83,168.68L356.89,156.25L338.14,135.41L353.38,94.94L369.89,86.4L376.42,54.23L344.78,40.76L297.63,59.25L277.7,47.86L260.52,26.88L242.79,18.53L230.86,1.46L212.19,0.55L182.53,15.01L165.62,14.91L150,30.46L148.2,43.03L164.53,44.27L185.33,67.35L195.68,72.63L173.4,98.52L176.29,106.69L179.53,122L182.17,144.05L204.48,154.52L217.5,163.89L226.81,167.49L230.81,169.97L231.95,175.66L218.22,180.48L206.15,191.01L209.35,199.32L212.19,214.06L197.71,227.11L190.42,244.1L173.62,252.5L160.31,283.55L151.98,288.09L141.31,295.61L129,320.84L95.96,327.22L84.58,317.57L61.49,345.05L59.25,359.63L78.78,365.93L77.78,378.91L81.56,393.41L93.23,403.72L106.36,427.15L65.76,443.45L37.3,439.42L24.79,450.05L23.92,462.53L33.41,475.62L48.1,485.05L63.29,487.56L76.03,483.61L82.83,474.15L93.94,477.29L88.27,483.17L77.34,495.32L66.41,499.62L43.23,505.47L55.87,516.43L73.09,537.35L80.72,544.78L100.74,552.65L103.07,552.65L109.16,550.96L123,544.64L135.82,538.27L141.6,524.79L139.69,513.06L143.58,502.91L160.35,503.6L158.02,506.1L149.2,507.13L154.15,529.52L154.6,542.55L157.64,552.4L158.6,561.47L156.89,564.41L155.31,571.81L151.75,581.07L156,597.69L155.58,598.93L157.11,611.37L163.24,638.76L170.44,665.49L172.15,683.49L182.08,708.04L189.42,717.07L193.88,733.29L208.5,762.89L214.22,788.78L216.9,798.19L225.64,818.37L237.08,830.02L245.08,847.4L248.95,860.49L256.5,875.23L258.43,887.3L264.3,907.2L270.28,917.5L282.52,931.9L296.96,936.44L308.16,930.65L320.36,908.04L335.52,896.87L341.92,885.5L345.16,876.9L352.36,871.56L364.14,870.25L363.47,856.27L363.51,851.52L362.38,838.38L362.25,825.74L363.2,822.37L368.14,813.41L375.25,795.2L376.74,786.62L375.8,773.86L369.09,729.97L380.2,705.88L392.36,708.71L403.6,693.36L413.6,689.09L418.35,690.2L436,682.6L436.13,667.25L442.71,661.37L460.93,651.8L471.46,639.72L475.68,635.74L489.37,628.49L506.24,603.46L520.1,592.59L555.32,576.5L567.3,565.43L568.16,552.85L569.72,537.79L588.14,525.11L597.1,522.44L603.25,505.13L605.72,504.59L616.38,515.51L634.34,508.84L624.18,473.64L620.76,461.29L623.92,445.86L604.12,426.66L616.12,410.1L616.43,397.25L606.05,386.31L613.12,367.72L615.09,362.89L625.65,373.23L642.98,383.69L654.18,378.43L657.51,387.88L658.38,401.11L661.38,406.89L669.05,410.03L690.69,411L702.02,409.04L721.51,410.46L726.86,412.56L733.51,415.65L736.17,420.51L727.31,432.54L723.09,436.81L718.75,445.46L713.8,444.39L705.4,446.96L698.24,457.58L700.98,472.18L713.89,472.53L715.24,464.56L726.17,458.37L728.8,457.74L732.84,472.53L736,489.32L738.82,508.96L746.15,510.9L755.15,507.18L753.26,487.88L754.04,480.85L756.19,479.27L760.97,470.45L761.9,465.12L757.86,448.3Z';

const GOVERNMENT = ['Lucknow', 'Bhopal', 'Jaipur', 'Hyderabad', 'Kolkata', 'Guwahati', 'Bengaluru', 'Patna', 'Raipur', 'Bhubaneswar', 'Dehradun', 'Srinagar', 'Shimla'];
const ENTERPRISE = ['Ahmedabad', 'Pune', 'Nashik', 'Nagpur', 'Ludhiana', 'Meerut'];
const MARKET = ['Indore', 'Guntur', 'Kota', 'Rajkot', 'Surat', 'Solapur', 'Warangal'];
const ADVISORY = ['Coimbatore', 'Varanasi', 'Karnal', 'Hubballi', 'Jabalpur'];
const FIELD = ['Kanpur', 'Gorakhpur', 'Muzaffarpur', 'Siliguri', 'Sambalpur', 'Aurangabad', 'Kurnool', 'Belagavi', 'Mysuru', 'Thanjavur', 'Amritsar', 'Hisar'];

export function layerOf(name) {
  if (GOVERNMENT.indexOf(name) >= 0) return 'government';
  if (ENTERPRISE.indexOf(name) >= 0) return 'enterprise';
  if (MARKET.indexOf(name) >= 0) return 'market';
  if (ADVISORY.indexOf(name) >= 0) return 'advisory';
  if (FIELD.indexOf(name) >= 0) return 'field';
  return 'farmer';
}

/* [name, state, weight, x, y] */
export const NODES = [
  ['Ludhiana', 'Punjab', 3, 245.8, 220], ['Amritsar', 'Punjab', 2, 217, 194.8],
  ['Hisar', 'Haryana', 2, 242, 279.4], ['Karnal', 'Haryana', 3, 279.4, 261.2],
  ['Jaipur', 'Rajasthan', 2, 244.1, 354.1], ['Kota', 'Rajasthan', 3, 245.2, 410.8],
  ['Bikaner', 'Rajasthan', 1, 171.1, 317.3], ['Meerut', 'Uttar Pradesh', 3, 300.3, 285.2],
  ['Kanpur', 'Uttar Pradesh', 3, 378.3, 369.3], ['Lucknow', 'Uttar Pradesh', 4, 395.9, 356.1],
  ['Varanasi', 'Uttar Pradesh', 2, 455.9, 406.2], ['Gorakhpur', 'Uttar Pradesh', 2, 467.1, 359.1],
  ['Patna', 'Bihar', 3, 519.2, 397.4], ['Muzaffarpur', 'Bihar', 2, 526.6, 380.1],
  ['Bhagalpur', 'Bihar', 1, 573.4, 408.8], ['Ranchi', 'Jharkhand', 1, 524.2, 469.5],
  ['Kolkata', 'West Bengal', 3, 614, 494.8], ['Siliguri', 'West Bengal', 2, 616, 360.4],
  ['Guwahati', 'Assam', 2, 713.4, 379.4], ['Jorhat', 'Assam', 1, 786.4, 359.4],
  ['Bhubaneswar', 'Odisha', 2, 539.2, 566.6], ['Sambalpur', 'Odisha', 1, 484.8, 529.7],
  ['Raipur', 'Chhattisgarh', 2, 415.9, 536.7], ['Bhopal', 'Madhya Pradesh', 3, 291.7, 472.7],
  ['Indore', 'Madhya Pradesh', 4, 246.1, 490], ['Jabalpur', 'Madhya Pradesh', 2, 367.7, 475.3],
  ['Gwalior', 'Madhya Pradesh', 2, 314.4, 376.8], ['Ahmedabad', 'Gujarat', 3, 149.3, 480.1],
  ['Rajkot', 'Gujarat', 3, 97.2, 503.4], ['Surat', 'Gujarat', 2, 157, 539.2],
  ['Nashik', 'Maharashtra', 4, 185.2, 576.1], ['Pune', 'Maharashtra', 3, 187.3, 622.1],
  ['Nagpur', 'Maharashtra', 3, 341.2, 539.8], ['Aurangabad', 'Maharashtra', 2, 230.8, 579.7],
  ['Solapur', 'Maharashtra', 2, 247.6, 648.7], ['Hyderabad', 'Telangana', 3, 323.5, 657.1],
  ['Warangal', 'Telangana', 2, 355.9, 638.8], ['Guntur', 'Andhra Pradesh', 3, 380.9, 690.3],
  ['Kurnool', 'Andhra Pradesh', 2, 310.3, 705], ['Belagavi', 'Karnataka', 2, 206.1, 704.3],
  ['Hubballi', 'Karnataka', 3, 224.3, 719.3], ['Bengaluru', 'Karnataka', 3, 297, 791.9],
  ['Mysuru', 'Karnataka', 2, 269.1, 812.1], ['Coimbatore', 'Tamil Nadu', 3, 278.5, 850.5],
  ['Madurai', 'Tamil Nadu', 2, 312.6, 883.1], ['Thanjavur', 'Tamil Nadu', 2, 342.6, 857.4],
  ['Kochi', 'Kerala', 2, 258.2, 883.1], ['Dehradun', 'Uttarakhand', 1, 310, 239.8],
  ['Srinagar', 'Jammu & Kashmir', 1, 214.9, 109], ['Shimla', 'Himachal Pradesh', 1, 284.7, 213.1]
];

export const MERIDIANS = [14.8, 73.7, 132.5, 191.4, 250.2, 309.1, 368, 426.8, 485.7, 544.5, 603.4, 662.2, 721.1, 779.9, 838.8, 897.6];
export const PARALLELS = [940.6, 881.1, 821.1, 760.7, 699.8, 638.2, 576, 512.9, 449, 384, 318, 250.7, 182, 111.8, 40];
export const LINKS = [[0, 3], [3, 7], [7, 8], [8, 9], [9, 12], [12, 16], [16, 20], [23, 24], [24, 27], [27, 30], [30, 31], [30, 32], [32, 35], [35, 37], [41, 43], [43, 46], [13, 18], [22, 32], [4, 23], [5, 26], [38, 41]];

/* Deterministic PRNG so server and client markup match exactly. */
function rng(seed) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

export const ACTIVITY_DOTS = (() => {
  const rand = rng(20160414);
  const dots = [];
  NODES.forEach(([, , w, x, y]) => {
    const count = 3 + w * 5;
    for (let k = 0; k < count; k++) {
      const a = rand() * Math.PI * 2;
      const rad = Math.pow(rand(), 0.62) * (26 + w * 20);
      dots.push({
        x: +(x + Math.cos(a) * rad).toFixed(1),
        y: +(y + Math.sin(a) * rad * 0.92).toFixed(1),
        r: +(0.55 + rand() * 0.9).toFixed(2)
      });
    }
  });
  return dots;
})();

export const LINK_PATHS = LINKS.map(([a, b]) => {
  const p = NODES[a];
  const q = NODES[b];
  const mx = (p[3] + q[3]) / 2;
  const my = (p[4] + q[4]) / 2;
  const dx = q[3] - p[3];
  const dy = q[4] - p[4];
  const len = Math.hypot(dx, dy) || 1;
  const bow = len * 0.14;
  return `M${p[3]},${p[4]} Q${(mx - dy / len * bow).toFixed(1)},${(my + dx / len * bow).toFixed(1)} ${q[3]},${q[4]}`;
});
