// components/BulletNavigationUI.ts
import type { UIElementData } from "photoswipe";

export const bulletNavigation: UIElementData = {
  name: "bulletsIndicator",
  className: "pswp__bullets-indicator",
  appendTo: "wrapper",
  onInit: (el, pswp) => {
    const bullets: HTMLDivElement[] = [];
    let prevIndex = -1;

    for (let i = 0; i < pswp.getNumItems(); i++) {
      const bullet = document.createElement("div");
      bullet.className = "pswp__bullet";
      bullet.onclick = () => pswp.goTo(i);
      el.appendChild(bullet);
      bullets.push(bullet);
    }

    pswp.on("change", () => {
      if (prevIndex >= 0) {
        bullets[prevIndex].classList.remove("pswp__bullet--active");
      }
      bullets[pswp.currIndex].classList.add("pswp__bullet--active");
      prevIndex = pswp.currIndex;
    });
  },
};
