// This allows us to create a type from the value of this array.
export const periods = ["Today", "This Week", "This Month"] as const;

export type Period = typeof periods[number];
