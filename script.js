// ======== GSAP-анимации ========
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section h2").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%"
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});

gsap.from("h1", { duration: 1.2, y: -50, opacity: 0, ease: "power3.out" });
gsap.from("header p", { duration: 1, delay: 0.5, y: -30, opacity: 0, ease: "power2.out" });
gsap.from(".btn:not(.btn-form)", { duration: 1, delay: 1, scale: 0.5, opacity: 0, ease: "back.out(1.7)" });

gsap.from(".services li", {
  duration: 0.6,
  y: 20,
  opacity: 0,
  ease: "power2.out",
  stagger: 0.2,
  delay: 1.2
});

gsap.from("#reviews ul li", {
  scrollTrigger: "#reviews",
  duration: 0.6,
  y: 30,
  opacity: 0,
  ease: "power2.out",
  stagger: 0.3
});

gsap.from("#contact", {
  scrollTrigger: "#contact",
  duration: 1,
  y: 50,
  opacity: 0.5,
  ease: "power2.out",
  delay: 0.2
});

if (window.innerWidth < 411) {
  ScrollTrigger.getAll().forEach(trigger => trigger.disable());
}

// ======== Обработка формы ========
const form = document.querySelector(".contact-form");
const thankYou = document.getElementById("thankYou");
const sendAnother = document.getElementById("sendAnother");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        form.classList.add("hidden");
        thankYou.classList.remove("hidden");
        sendAnother.style.display = "inline-block";
      } else {
        alert("Ошибка при отправке. Попробуйте позже.");
        console.warn("⚠️ Ошибка:", response.statusText);
      }
    })
    .catch(error => {
      console.error("❌ Сбой:", error);
      alert("Ошибка соединения. Повторите попытку.");
    });
  });
}

function showFormAgain() {
  form.reset();
  form.classList.remove("hidden");
  form.style.display = "flex";
  thankYou.classList.add("hidden");
  sendAnother.style.display = "none";

  form.querySelector("input[name='name']").focus();
}

