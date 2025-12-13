document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".toggle-theme-btn");
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

//  Animação das barras de SKILLS 
document.addEventListener("DOMContentLoaded", () => {
  const skillLevels = document.querySelectorAll(".skill-level");

  //  Função que ativa a animação quando a seção entra na tela
  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width; // Pega o valor do data-width
        bar.style.width = width;         // Anima a largura
        observer.unobserve(bar);         // Anima apenas uma vez
      }
    });
  };

  const observer = new IntersectionObserver(animateSkills, {
    threshold: 0.3 // 30% da barra precisa estar visível para iniciar
  });

  skillLevels.forEach(bar => {
    observer.observe(bar);
  });
});

//  Fade-in ao rolar 
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // 20% visível para disparar

  faders.forEach(el => fadeObserver.observe(el));
});

//  Barras de progresso com efeito de cascata 
document.addEventListener("DOMContentLoaded", () => {
  const skillLevels = document.querySelectorAll(".skill-level");

  skillLevels.forEach((bar, index) => {
    const width = bar.getAttribute("data-width"); // pega a largura do HTML

    // delay incremental: 0ms, 150ms, 300ms...
    setTimeout(() => {
      bar.style.width = width;
    }, index * 200); // 200ms de diferença entre cada barra
  });
});

document.addEventListener("DOMContentLoaded", () => {
  //  FADE-IN DO TEXTO 
  const fadeElements = document.querySelectorAll(".skills-section, .skills-section h2, .skills-section p");
  fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // Delay para iniciar animação quando a seção aparecer
  const skillsSection = document.querySelector(".skills-section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade-in do conteúdo
        fadeElements.forEach((el, idx) => {
          setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
          }, idx * 150);
        });

        //  BARRAS DE PROGRESSO COM CASCATA 
        const skillLevels = document.querySelectorAll(".skill-level");
        skillLevels.forEach((bar, index) => {
          const width = bar.getAttribute("data-width"); // pega a largura definida no HTML
          setTimeout(() => {
            bar.style.width = width;
          }, index * 200); // 200ms de delay entre cada barra
        });

        observer.unobserve(skillsSection); // animação acontece só uma vez
      }
    });
  }, { threshold: 0.3 }); // dispara quando 30% da seção aparece

  observer.observe(skillsSection);
});

// Animação fade-in ao scroll para cards da seção Projetos
document.addEventListener("DOMContentLoaded", () => {
  // Todos os elementos que vão aparecer
  const elements = document.querySelectorAll(
    ".projects-section .section-title, .projects-section .section-subtitle, .projects-section .project-card"
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          obs.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(el => observer.observe(el));
});

