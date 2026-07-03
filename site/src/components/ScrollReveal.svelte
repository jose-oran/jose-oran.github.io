<script lang="ts">
  import { onMount } from "svelte";

  let { children } = $props();
  let visible = $state(false);
  let el: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div class="reveal" class:in-view={visible} bind:this={el}>
  {@render children()}
</div>
