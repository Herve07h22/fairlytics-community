
export function withRatio<T extends { hits: number; }>(hits: number, level=1) {
  return (record: T) => ({
    ...record,
    level,
    ratio: Math.ceil((100 * record.hits) / hits),
  });
}
