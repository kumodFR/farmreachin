/* India geography for the operating-ecosystem visual.
   Source: Natural Earth 110m country boundaries (public domain), projected in
   Mercator to a 900 x 1000 viewBox at authoring time and frozen here, so the
   page ships no mapping library and makes no data request.
   The northern boundary is redrawn to India's official external boundary
   (Survey of India): full Jammu & Kashmir including Gilgit-Baltistan, and
   Aksai Chin — Natural Earth's default depicts de-facto lines, which must not
   be shown on an India-facing site.
   That northern run was re-derived: its vertices are latitude/longitude points
   pushed through the same Mercator transform as the rest of the outline, so
   they sit on the same projection rather than being eyeballed in viewBox
   units. They approximate the official line closely enough for a silhouette at
   this scale; they are not survey data. If Farmreach supplies an approved
   boundary dataset, replace this path with it.
   Node positions are real city coordinates in the same projection.
   Note: internal state boundaries are intentionally absent — no verified
   state-boundary dataset has been approved. Add one path layer here if it is. */

export const INDIA_PATH = 'M877.881,309.258L880,321.902L869.724,327.983L872.161,348.402L851.079,342.411L813.048,365.202L813.895,383.978L797.687,411.368L796.203,427.184L783.067,453.79L760.079,446.432L758.914,479.687L752.239,490.552L755.418,504.083L740.904,511.612L725.331,460.973L717.28,461.081L712.407,481.527L696.305,464.939L705.415,446.651L718.551,444.795L732.111,417.416L715.161,411.863L687.935,412.303L659.862,407.844L657.32,385.197L643.23,383.535L619.924,369.376L609.542,391.618L630.729,408.891L612.402,420.986L605.834,432.771L623.949,441.465L618.97,460.864L629.14,484.934L633.695,511.128L629.564,522.721L609.542,522.346L573.205,528.881L574.9,552.641L559.221,571.193L516.847,592.263L483.9,628.85L461.759,648.383L432.52,668.576L432.414,682.674L417.795,690.256L391.205,701.248L377.539,702.853L368.64,726.114L374.784,765.674L376.373,790.765L363.873,819.389L363.767,870.368L348.512,871.837L335.164,894.59L344.063,904.434L317.26,912.908L307.408,933.107L295.543,941.66L267.682,913.866L254.122,872.09L242.786,841.869L232.51,827.686L216.832,798.735L209.522,760.902L204.437,741.935L177.635,700.056L165.452,640.432L156.659,600.709L156.765,562.803L151.045,533.322L108.246,552.162L87.482,548.432L49.133,510.107L63.222,498.589L54.536,486.069L20,458.906L39.598,437.366L104.432,437.476L98.5,409.661L81.973,393.111L78.689,367.874L59.409,353.098L91.826,318.35L126.043,320.888L156.765,285.77L175.198,251.501L203.801,217.23L203.378,192.68L228.379,172.598L204.649,155.351L194.909,145.441L189.906,130.311L193.732,114.750L187.846,98.397L188.435,82.670L193.732,67.580L196.675,53.859L191.966,38.618L199.618,22.563L206.681,8.625L218.453,1.261L233.169,3.472L249.061,14.502L266.719,29.142L284.377,42.980L304.978,53.859L326.757,59.644L348.535,63.975L369.136,69.740L363.839,84.103L355.010,99.822L350.301,114.750L344.698,147.344L343.745,165.167L322.557,160.499L330.82,198.762L359.741,220.54L400.633,244.422L381.988,259.828L370.547,291.401L399.044,304.108L426.8,320.437L465.149,339.104L505.511,343.363L522.461,360.186L545.238,363.308L580.621,370.989L605.092,370.433L608.482,357.397L604.669,336.411L606.893,322.071L624.903,315.078L627.339,341.234L627.975,347.898L654.671,360.409L673.21,355.276L698,357.453L722.047,356.504L724.166,336.186L712.195,325.563L735.925,321.395L762.621,296.569L796.627,275.165L821.311,283.435L842.286,269.222L856.058,290.15L846.1,304.222Z';

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
