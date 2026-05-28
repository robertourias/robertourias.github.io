# Feature: Dark Mode

**Status:** Live  
**Data:** 2026-05-16  
**Componentes:** `ThemeProvider.tsx`, `layout.tsx`, `globals.css`

---

## Funcionamento

Dark mode controlado por classe `dark` no `<html>`. Tokens de cor definidos em `globals.css` via CSS custom properties com dois conjuntos: `:root` (light) e `:root.dark` (dark).

---

## FOUC — Flash of Unstyled Content

**Problema:** ao navegar para uma nova página, a página carregava brevemente em light mode antes de aplicar o dark.

**Causa:** o `ThemeProvider` aplica a classe `dark` apenas após `mounted = true` (necessário para evitar hydration mismatch entre SSR e client). Há uma janela entre o parse do HTML e a execução dos `useEffect`.

**Solução:** script inline bloqueante no `<head>` do `layout.tsx`:

```js
(function(){
  try {
    var t = localStorage.getItem('theme');
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (t === null && d)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})()
```

O script roda **sincronamente antes da hidratação** do React. A classe já está no `<html>` quando o browser renderiza o primeiro pixel. O `suppressHydrationWarning` no `<html>` (já presente) suprime o mismatch de atributos entre SSR e client.

---

## ThemeProvider

- Persiste preferência em `localStorage` (chave: `theme`)
- Fallback para `prefers-color-scheme` quando não há valor salvo
- Expõe `mounted` para prevenir hydration mismatch no toggle de ícone do Navbar
- `toggleTheme()` alterna entre `"dark"` e `"light"`

---

## Tokens de cor

Definidos em `globals.css` e mapeados via `@theme inline` para classes Tailwind:

```
--color-surface, --color-on-surface, --color-primary, --color-on-primary
--color-surface-container[-low | -high | -highest | -lowest]
--color-on-surface-variant, --color-outline, --color-outline-variant
```

Todos os componentes usam exclusivamente esses tokens — nunca valores hex diretos.
