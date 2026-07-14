import type Lenis from "lenis";

// SmoothScroll が生成した Lenis を、ヘッダー等のアンカー遷移から参照するための保持箱。
// Context を挟むほどの状態ではないため、モジュールスコープに1つだけ持つ。
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
