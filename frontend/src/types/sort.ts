// Ways to sort a hand
export const SORT_TYPES = ["BY_RANK", "BY_SUIT", "BY_COMBINATION"] as const;

export type Sort = typeof SORT_TYPES[number];