# @popperjs/svelte

Use Popper in your Svelte projects.

### Installation

```
yarn add @popperjs/svelte
# or
npm i @popperjs/svelte
```

### Usage

```svelte
<script>
  import Popper from "@popperjs/svelte";

  // super-simple CSS Object to string serializer
  const css = obj =>
    Object.entries(obj || {})
      .map(x => x.join(":"))
      .join(";");

  // DOM references to the interested elements
  let referenceElement;
  let popperElement;
  let arrowElement;

  // Popper options, reactive to update when arrowElement is set
  $: popperOptions = {
    modifiers: [
      { name: "offset", options: { offset: [0, 5] } },
      { name: "arrow", options: { element: arrowElement } }
    ]
  };

  // bound variables where Popper will store styles and attributes
  let styles = {};
  let attributes = {};

  console.log(styles);
</script>

<style>
  /* for some example styles, see `dev/App.svelte` */
</style>

<Popper
  reference={referenceElement}
  popper={popperElement}
  options={popperOptions}
  bind:styles
  bind:attributes>
  <button bind:this={referenceElement}>Reference Element</button>
  <div
    bind:this={popperElement}
    class="tooltip"
    style={css(styles.popper)}
    {...attributes.popper}>
    Popper Element
    <div bind:this={arrowElement} class="arrow" style={css(styles.arrow)} />
  </div>
</Popper>
```
