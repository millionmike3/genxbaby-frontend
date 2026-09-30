export function kmeans(
  data: { fraud: number; risk: number; impulsiveness: number }[],
  k: number
) {
  // Initialize centroids randomly
  let centroids = data
    .sort(() => Math.random() - 0.5)
    .slice(0, k)
    .map((d) => ({ ...d }));

  let assignments: number[] = [];

  for (let iter = 0; iter < 20; iter++) {
    // Assign points to nearest centroid
    assignments = data.map((d) => {
      let best = 0;
      let bestDist = Infinity;

      centroids.forEach((c, idx) => {
        const dist =
          Math.pow(d.fraud - c.fraud, 2) +
          Math.pow(d.risk - c.risk, 2) +
          Math.pow(d.impulsiveness - c.impulsiveness, 2);

        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      });

      return best;
    });

    // Recalculate centroids
    const newCentroids = Array.from({ length: k }, () => ({
      fraud: 0,
      risk: 0,
      impulsiveness: 0,
      count: 0,
    }));

    data.forEach((d, i) => {
      const cluster = assignments[i];
      newCentroids[cluster].fraud += d.fraud;
      newCentroids[cluster].risk += d.risk;
      newCentroids[cluster].impulsiveness += d.impulsiveness;
      newCentroids[cluster].count += 1;
    });

    centroids = newCentroids.map((c) => ({
      fraud: c.fraud / (c.count || 1),
      risk: c.risk / (c.count || 1),
      impulsiveness: c.impulsiveness / (c.count || 1),
    }));
  }

  return { centroids, assignments };
}
