<script lang="ts">
  import { onMount } from "svelte";

  let lang = $state<"es" | "en">("es");

  function apply(newLang: "es" | "en") {
    lang = newLang;
    document.documentElement.dataset.lang = newLang;
    document.documentElement.lang = newLang;
    localStorage.setItem("portfolio-lang", newLang);
  }

  function toggle() {
    apply(lang === "es" ? "en" : "es");
  }

  onMount(() => {
    const saved = localStorage.getItem("portfolio-lang");
    if (saved === "en" || saved === "es") {
      apply(saved);
    }
  });
</script>

<button
  class="lang-toggle"
  onclick={toggle}
  aria-label="Cambiar idioma / Toggle language"
>
  <span class:active={lang === "es"}>ES</span>
  <span class="lang-toggle-sep">/</span>
  <span class:active={lang === "en"}>EN</span>
</button>

<style>
  .lang-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 9px 18px;
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    background: var(--glass-bg);
    color: var(--text-muted);
    font-size: 0.9rem;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.2s var(--ease), transform 0.2s var(--ease);
  }

  .lang-toggle:hover {
    border-color: var(--violet);
    transform: translateY(-2px);
  }

  .lang-toggle span {
    transition: color 0.2s var(--ease), font-weight 0.2s var(--ease);
  }

  .lang-toggle-sep {
    color: var(--glass-border-hover);
  }

  .lang-toggle span.active {
    color: var(--violet);
    font-weight: 700;
  }
</style>
