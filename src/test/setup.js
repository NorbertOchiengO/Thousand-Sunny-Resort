import '@testing-library/jest-dom/vitest'

window.HTMLElement.prototype.scrollIntoView = () => {}
window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }))
class IO { observe() {} unobserve() {} disconnect() {} }
window.IntersectionObserver = window.IntersectionObserver || IO
