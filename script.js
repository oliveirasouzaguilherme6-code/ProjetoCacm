const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("show"));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // PEGAR VALORES
    const responsavel = document.getElementById("responsavel").value;
    const aluno = document.getElementById("aluno").value;
    const idade = document.getElementById("idade").value;
    const modalidade = document.getElementById("modalidade").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    // MENSAGEM FORMATADA
    const texto = `Olá! Tenho interesse no CACM Sports:

👤 Responsável: ${responsavel}
👦 Aluno: ${aluno}
🎂 Idade: ${idade}
🏆 Modalidade: ${modalidade}
📞 Telefone: ${telefone}

💬 Mensagem:
${mensagem}`;

    // CODIFICAR PARA URL
    const textoCodificado = encodeURIComponent(texto);

    // SEU NÚMERO (SEM ESPAÇO)
    const numero = "5544997573991";

    // LINK WHATSAPP
    const url = `https://wa.me/${numero}?text=${textoCodificado}`;

    // REDIRECIONAR
    window.open(url, "_blank");
  });
}