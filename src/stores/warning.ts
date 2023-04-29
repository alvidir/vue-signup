import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import Warning from "@/warning";

export const useWarningStore = defineStore("warning", () => {
  const max = ref(3);
  const warnings = reactive(new Array<Warning>());

  const add = (warning: Warning): void => {
    if (warnings.length >= max.value) {
      warnings.pop();
    }

    warnings.unshift(warning);
  };

  const remove = (warning: Warning): void => {
    warnings.splice(warnings.indexOf(warning), 1);
  };

  const list = (): Array<Warning> => {
    return warnings;
  };

  return { add, remove, list };
});
