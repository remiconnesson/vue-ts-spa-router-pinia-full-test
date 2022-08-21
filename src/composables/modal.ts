import { ref, shallowRef } from "vue";
import SignupForm from "@/components/SignupForm.vue";

const show = ref(false);

type ModalForm = typeof SignupForm | undefined;
const component = shallowRef<ModalForm>();

export function useModal() {
  return {
    show,
    component,
    showModal: (type: "signUp") => {
      show.value = true;
      switch (type) {
        case "signUp":
          return (component.value = SignupForm);
      }
    },
    hideModal: () => (show.value = false),
  };
}
