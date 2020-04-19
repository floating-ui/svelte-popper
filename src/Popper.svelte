<script>
  import { onDestroy, tick } from "svelte";
  import { writable } from "svelte/store";
  import { createPopper } from "@popperjs/core";

  let referenceElement;
  let popperElement;

  // Input Props
  export { referenceElement as reference };
  export { popperElement as popper };
  export let options = {};

  export const store = writable({});
  let previousReferenceElement;
  let previousPopperElement;
  let popperInstance;

  const updateStateModifier = {
    name: "updateState",
    enabled: true,
    phase: "write",
    fn: ({ state }) => store.set(state)
  };

  $: (async () => {
    if (
      previousPopperElement != popperElement ||
      previousReferenceElement != referenceElement
    ) {
      await tick();
      popperInstance && popperInstance.destroy();

      if (referenceElement != null && popperElement != null) {
        popperInstance = createPopper(referenceElement, popperElement, {
          ...options,
          modifiers: [
            ...options.modifiers,
            updateStateModifier,
            { name: "applyStyles", enabled: false }
          ]
        });
        previousPopperElement = popperElement;
        previousReferenceElement = referenceElement;
      }
    }
  })();

  $: {
    if (popperInstance != null) {
      popperInstance.setOptions({
        ...options,
        modifiers: [
          ...options.modifiers,
          updateStateModifier,
          { name: "applyStyles", enabled: false }
        ]
      });
    }
  }

  onDestroy(() => {
    popperInstance && popperInstance.destroy();
    popperInstance = null;
  });

  let styles = {};
  let attributes = {};
  let state = {};

  $: styles = $store.styles || {};
  $: attributes = $store.attributes || {};
  $: state = $store;

  // Exported props (use with `bind:x`)
  export { styles, attributes, state };
</script>

<slot />
