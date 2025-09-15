
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".typewriter");

  // Frases que irão rotacionar
  const frases = [
    "Desenvolvedor Front-End",
    "Criando experiências web",
    "Design Responsivo e Moderno"
  ];

  let fraseIndex = 0;
  let charIndex = 0;
  let apagando = false;
  const velocidade = 90;   // Velocidade para escrever
  const pausaFrase = 1600; // Pausa antes de apagar

  function digitar() {
    const frase = frases[fraseIndex];

    if (!apagando && charIndex <= frase.length) {
      // Escrevendo
      element.textContent = frase.substring(0, charIndex++);
      setTimeout(digitar, velocidade);
    } else if (apagando && charIndex >= 0) {
      // Apagando
      element.textContent = frase.substring(0, charIndex--);
      setTimeout(digitar, velocidade / 1.8);
    } else {
      // Alterna entre escrever e apagar
      apagando = !apagando;

      // Se terminou de apagar, vai para a próxima frase
      if (!apagando) {
        fraseIndex = (fraseIndex + 1) % frases.length;
      }

      setTimeout(digitar, pausaFrase);
    }
  }

  digitar();
});

