interface Status {
  valid: boolean;
  message?: string;
}

type Rule = (value: string) => Status;

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value);
    if (!result.valid) return result;
  }
  return { valid: true };
}
