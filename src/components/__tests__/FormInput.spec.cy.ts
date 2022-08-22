/// <reference types="cypress" />
import FormInput from "@/components/FormInput.vue";
import { mount } from "cypress/vue";

describe("FormInput", () => {
  it("does not render an error when valid", () => {
    mount(FormInput, {
      props: {
        name: "username",
        modelValue: "remi",
        type: "text",
        status: {
          valid: true,
        },
      },
    });

    cy.get("[role='alert']").should("not.exist");
  });
});
