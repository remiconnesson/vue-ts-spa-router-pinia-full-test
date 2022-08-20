interface Status {
  valid: boolean;
  message?: string;
}

type Rule = (value: string) => Status;

const required: Rule = (value: string): Status => {
  const result = Boolean(value);

  return {
    valid: result,
    message: result ? undefined : "This field is required",
  };
};

export function length({ min, max }: { min: number; max: number }): Rule {
  return function (value: string): Status {
    const result = Boolean(value.length > min && value.length < max);

    return {
      valid: result,
      message: result
        ? undefined
        : `This field must be between ${min} and ${max} characters`,
    };
  };
}

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value);
    if (!result.valid) return result;
  }
  return { valid: true };
}

/*
 *  IN-SOURCE TEST SUITE
 */

// @ts-expect-error -- typescript thinks vitest property is undefined
if (import.meta.vitest) {
  // @ts-expect-error -- same as above -- TODO: open an issue on vitest repo
  const { describe, it, expect, beforeAll } = import.meta.vitest; // dynamic import

  /*
   * Length Function test-suite
   */
  describe("The length function", () => {
    it("Should block too short values", () => {
      const result = length({ min: 5, max: 10 })("cinq!");
      expect(result.valid).toBe(false);
    });

    it("Should block too long values", () => {
      const result = length({ min: 5, max: 10 })("dixdixdix!");
      expect(result.valid).toBe(false);
    });

    it("Should have helpful error message", () => {
      const result = length({ min: 1, max: 2 })("trois");
      expect(result.valid).toBe(false);
      expect(result.message).toMatch(/1/);
      expect(result.message).toMatch(/2/);
    });

    it("Should pass if length is just righ, w/o a message", () => {
      const result = length({ min: 5, max: 10 })("Ok, :)");
      expect(result.valid).toBe(true);
      expect(result.message).not.toBeDefined();
    });
  });

  /*
   * Required Function test-suite
   */
  describe("The required function", () => {
    it("Should return a valid status when a value is passed", () => {
      const result = required("I'm here");
      expect(result.valid).toBe(true);
      expect(result.message).not.toBeDefined();
    });

    it("Should return an invalid status when an empty string is passed", () => {
      const result = required("");
      expect(result.valid).toBe(false);
      expect(result.message).toMatch(/required/);
    });
  });

  /*
   * Validate Function test-suite
   */
  describe("The validate function", () => {
    // helper variables
    let dummyValue: string; // the rules won't check the value passed
    let alwaysValidRule: Rule; // a rule that always return a valid status
    let makeInvalidRuleWithMessage: (message?: string) => Rule; // a factory for invalid rules with or witout message

    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      alwaysValidRule = (message: string): Status => {
        return { valid: true };
      };

      makeInvalidRuleWithMessage = (message?: string): Rule => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return function alwaysInvalid(value: string): Status {
          return { valid: false, message };
        };
      };

      dummyValue = "to be valid, or not to be valid, that is the question...";
    });

    it("should return a status with true and w/o message if there's no rules", () => {
      const status = validate(dummyValue, []);
      expect(status.valid).toBe(true);
      expect(status.message).not.toBeDefined();
    });

    it("should return invalid status when a value doesn't pass a rule", () => {
      // without message
      const status = validate(dummyValue, [
        makeInvalidRuleWithMessage(undefined),
      ]);

      expect(status.valid).toBe(false);
      expect(status.message).not.toBeDefined();
    });

    it("should return the error message the invalid rule emitted", () => {
      const errorMessage = "this is an error message";
      const status = validate(dummyValue, [
        makeInvalidRuleWithMessage(errorMessage),
      ]);

      expect(status.valid).toBe(false);
      expect(status.message).toBe(errorMessage);
    });

    it("should return invalid at the first invalid rule", () => {
      const errorMessage = "this is an error message bis";
      const status = validate(dummyValue, [
        alwaysValidRule,
        alwaysValidRule,
        makeInvalidRuleWithMessage(errorMessage),
        makeInvalidRuleWithMessage("This rule should not be attempted"),
      ]);

      expect(status.valid).toBe(false);
      expect(status.message).toBe(errorMessage);
    });
  });
}
