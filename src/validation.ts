interface Status {
  valid: boolean;
  message?: string;
}

type Rule = (value: string) => Status;

export function validate(value: string, rules: Rule[]): Status {}
  return { valid: true };
}
