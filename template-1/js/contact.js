/* Aria Spanish Products — contact form (design only: validates and shows a confirmation) */
(function () {
  "use strict";
  const form = document.querySelector("[data-contact]");
  if (!form) return;
  const fields = [...form.querySelectorAll("[required]")];
  const check = (el) => {
    const ok = el.value.trim() !== "" && el.checkValidity();
    el.closest(".ct-field").classList.toggle("is-invalid", !ok);
    return ok;
  };
  // Clear an error as soon as it's fixed (while typing), so the layout doesn't shift
  // under the pointer when the person clicks the submit button.
  fields.forEach((el) => {
    el.addEventListener("input", () => el.closest(".ct-field").classList.contains("is-invalid") && check(el));
    el.addEventListener("blur", () => el.value && check(el));
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bad = fields.filter((el) => !check(el));
    if (bad.length) { bad[0].focus(); return; }
    const sent = form.querySelector(".ct-sent");
    sent.hidden = false;
    form.querySelector(".ct-submit").hidden = true;
    form.reset();
    sent.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
