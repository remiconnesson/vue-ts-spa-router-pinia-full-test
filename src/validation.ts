interface Status {
  valid: boolean;
  message?: string;
}

export function validate(value: string, rules: Rule[]): Status {}
  return { valid: true };
}
