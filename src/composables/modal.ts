import { ref, shallowRef } from "vue";
import SignupForm from "@/components/SignupForm.vue";
import SigninForm from "@/components/SigninForm.vue";

const show = ref(false);

type ModalForm = typeof SignupForm | typeof SigninForm | undefined;
const component = shallowRef<ModalForm>();

export function useModal() {
  return {
    show,
    component,
    showModal: (type: "signUp" | "signIn") => {
      show.value = true;
      switch (type) {
        case "signUp":
          return (component.value = SignupForm);
        case "signIn":
          return (component.value = SigninForm);
      }
    },
    hideModal: () => (show.value = false),
  };
}
