// ---------------------------------------------------------------------------
// Configuração: alterem esta data para a data real do vosso casamento.
// Formato: "AAAA-MM-DDTHH:MM:SS"
// ---------------------------------------------------------------------------
const WEDDING_DATE = new Date("2027-06-19T16:00:00");

// ---- Loader ----
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
});

// ---- Navbar scroll state ----
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("visible", window.scrollY > 500);
}
window.addEventListener("scroll", onScroll);
onScroll();

// ---- Mobile nav toggle ----
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ---- Countdown ----
function pad(num) {
  return String(num).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMinutes = document.getElementById("cd-minutes");
  const elSeconds = document.getElementById("cd-seconds");

  if (diff <= 0) {
    elDays.textContent = "00";
    elHours.textContent = "00";
    elMinutes.textContent = "00";
    elSeconds.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  elDays.textContent = pad(days);
  elHours.textContent = pad(hours);
  elMinutes.textContent = pad(minutes);
  elSeconds.textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---- Reveal on scroll ----
const revealTargets = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ---- Copy IBAN ----
const copyIbanBtn = document.getElementById("copyIban");
const ibanValue = document.getElementById("ibanValue");

if (copyIbanBtn) {
  copyIbanBtn.addEventListener("click", async () => {
    const text = ibanValue.textContent.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const tmp = document.createElement("textarea");
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
    }
    copyIbanBtn.textContent = "Copiado!";
    copyIbanBtn.classList.add("copied");
    setTimeout(() => {
      copyIbanBtn.textContent = "Copiar";
      copyIbanBtn.classList.remove("copied");
    }, 2000);
  });
}

// ---------------------------------------------------------------------------
// RSVP form
// Este formulário funciona apenas no lado do cliente. Para receber as
// respostas por email, criem uma conta gratuita em https://formspree.io,
// obtenham o vosso "form ID" e substituam FORMSPREE_ENDPOINT abaixo por:
// "https://formspree.io/f/SEU_ID_AQUI"
// Enquanto isso não for configurado, o formulário mostra apenas uma
// mensagem de confirmação local.
// ---------------------------------------------------------------------------
const FORMSPREE_ENDPOINT = "";

const rsvpForm = document.getElementById("rsvpForm");
const formStatus = document.getElementById("formStatus");

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const attending = rsvpForm.querySelector('input[name="attending"]:checked');
  if (!rsvpForm.checkValidity() || !attending) {
    formStatus.textContent = "Por favor preencham todos os campos obrigatórios.";
    formStatus.classList.add("error");
    rsvpForm.reportValidity();
    return;
  }

  const submitBtn = rsvpForm.querySelector(".btn-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "A enviar...";

  const formData = new FormData(rsvpForm);

  try {
    if (FORMSPREE_ENDPOINT) {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Falha no envio");
    } else {
      // Sem backend configurado: simula sucesso localmente.
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    formStatus.textContent = "Obrigado! A vossa confirmação foi recebida. 💛";
    formStatus.classList.add("success");
    rsvpForm.reset();
  } catch (err) {
    formStatus.textContent = "Ocorreu um erro ao enviar. Tentem novamente ou contactem-nos diretamente.";
    formStatus.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar Confirmação";
  }
});
