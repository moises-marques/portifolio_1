// ==================== EFEITO TYPEWRITER ====================
const typewriterText = document.querySelector('.typewriter');
if (typewriterText) {
  const text = typewriterText.textContent;
  typewriterText.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typewriterText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100); // velocidade da digitação
    }
  }
  typeWriter();
}

// ==================== ANIMAÇÃO DAS BARRAS DE HABILIDADES ====================
const skillsSection = document.querySelector('#skills');
const skillBars = document.querySelectorAll('.skill-level');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;
  });
}

// Ativa a animação quando a seção de habilidades entra na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      observer.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  observer.observe(skillsSection);
}

// ==================== FADE-IN AO ROLAR A PÁGINA ====================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

