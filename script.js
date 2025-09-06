 // ===== CREACIÓN DE ESTRELLAS =====
    function crearEstrellas() {
      const cielo = document.getElementById('cielo');
      const cantidadEstrellas = 100; // Reducido para mejor rendimiento en móviles
      
      // Crear estrellas fijas
      for (let i = 0; i < cantidadEstrellas; i++) {
        const estrella = document.createElement('div');
        estrella.className = 'estrella';
        
        // Tamaño aleatorio
        const size = Math.random() * 3;
        estrella.style.width = `${size}px`;
        estrella.style.height = `${size}px`;
        
        // Posición aleatoria
        estrella.style.left = `${Math.random() * 100}%`;
        estrella.style.top = `${Math.random() * 100}%`;
        
        // Retraso aleatorio en la animación
        estrella.style.animationDelay = `${Math.random() * 4}s`;
        
        cielo.appendChild(estrella);
      }
      
      // Crear estrellas fugaces periódicamente
      setInterval(crearEstrellaFugaz, 5000); // Reducida frecuencia para mejor rendimiento
    }
    
    function crearEstrellaFugaz() {
      // Solo crear a veces (50% de probabilidad)
      if (Math.random() > 0.5) return;
      
      const cielo = document.getElementById('cielo');
      const estrellaFugaz = document.createElement('div');
      estrellaFugaz.className = 'estrella-fugaz';
      
      // Posición inicial aleatoria en la parte superior
      estrellaFugaz.style.left = `${Math.random() * 100}%`;
      estrellaFugaz.style.top = `${Math.random() * 30}%`;
      
      // Longitud aleatoria
      estrellaFugaz.style.width = `${30 + Math.random() * 70}px`;
      
      cielo.appendChild(estrellaFugaz);
      
      // Eliminar después de la animación
      setTimeout(() => {
        if (estrellaFugaz.parentNode) {
          cielo.removeChild(estrellaFugaz);
        }
      }, 3000);
    }

    // ===== REPRODUCTOR PERSONALIZADO =====
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const progressContainer = document.getElementById('progress-container');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const volumeSlider = document.getElementById('volume');

    // Reproducir/pausar
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '❚❚';
      } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
      }
    });

    // Actualizar barra de progreso
    audio.addEventListener('timeupdate', () => {
      const { currentTime, duration } = audio;
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
      
      // Formatear tiempo
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    // Establecer progreso al hacer clic
    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    });

    // Control de volumen
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value;
    });

    // Reproducir automáticamente al llegar a la pantalla 3
    function iniciarPetalos() {
      document.getElementById("pantalla2").classList.remove("active");
      document.getElementById("pantalla2").classList.add("hidden");

      document.getElementById("pantalla3").classList.remove("hidden");
      document.getElementById("pantalla3").classList.add("active");

      // Iniciar reproducción automática
      setTimeout(() => {
        audio.play().catch(e => {
          console.log("Reproducción automática prevenida: ", e);
          playPauseBtn.textContent = '▶';
        });
        playPauseBtn.textContent = '❚❚';
      }, 1000);

      // Crear pétalos continuamente
      crearPetalo(); // Crear el primer pétalo inmediatamente
      petalInterval = setInterval(crearPetalo, 800); // Reducida frecuencia para mejor rendimiento
    }

    // ===== PANTALLAS =====
    function mostrarIntro() {
      document.getElementById("pantalla1").classList.remove("active");
      document.getElementById("pantalla1").classList.add("hidden");

      document.getElementById("pantalla2").classList.remove("hidden");
      document.getElementById("pantalla2").classList.add("active");

      escribirMensaje();
    }

    // Máquina de escribir
    const mensaje = "Feliz 5 meses mi amor ❤️ Gracias por ser la mejor persona que pude conocer te amo para toda la vida";
    let i = 0;
    function escribirMensaje() {
      if (i < mensaje.length) {
        document.getElementById("typewriter").innerHTML += mensaje.charAt(i);
        i++;
        setTimeout(escribirMensaje, 50);
      }
    }

    // Variables para pétalos
    let petalInterval;
    const petalContainer = document.getElementById('petal-container');
    let draggedPetal = null;

    // Crear un pétalo
    function crearPetalo() {
      const petal = document.createElement('div');
      petal.className = 'petal';
      
      // Posición inicial aleatoria en la parte superior
      const startPositionX = Math.random() * window.innerWidth;
      petal.style.left = `${startPositionX}px`;
      petal.style.top = '-30px';
      
      // Rotación aleatoria
      const rotation = Math.random() * 360;
      petal.style.transform = `rotate(${rotation}deg)`;
      
      // Tamaño aleatorio
      const size = 12 + Math.random() * 12; // Tamaño reducido para móviles
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.5}px`;
      
      // Opacidad aleatoria
      const opacity = 0.6 + Math.random() * 0.4;
      petal.style.opacity = opacity;
      
      // Añadir el pétalo al contenedor
      petalContainer.appendChild(petal);
      
      // Animación de caída
      const fallDuration = 5 + Math.random() * 8; // Duración reducida
      const horizontalDrift = (Math.random() - 0.5) * 80; // Deriva reducida
      
      petal.style.transition = `top ${fallDuration}s linear, left ${fallDuration/2}s ease-in-out`;
      
      // Usar requestAnimationFrame para asegurar que el navegador renderice primero la posición inicial
      requestAnimationFrame(() => {
        petal.style.top = `${window.innerHeight + 30}px`;
        petal.style.left = `${startPositionX + horizontalDrift}px`;
      });
      
      // Eventos para arrastrar
      petal.addEventListener('mousedown', startDrag);
      petal.addEventListener('touchstart', startDragTouch, { passive: false });
      
      // Eliminar el pétalo cuando termine la animación
      setTimeout(() => {
        if (petal.parentNode) {
          petalContainer.removeChild(petal);
        }
      }, fallDuration * 1000);
    }

    // Funciones para arrastrar pétalos
    function startDrag(e) {
      e.preventDefault();
      draggedPetal = this;
      
      document.addEventListener('mousemove', dragPetal);
      document.addEventListener('mouseup', stopDrag);
      
      // Detener la animación del pétalo
      draggedPetal.style.transition = 'none';
    }
    
    function startDragTouch(e) {
      e.preventDefault();
      draggedPetal = this;
      const touch = e.touches[0];
      
      document.addEventListener('touchmove', dragPetalTouch, { passive: false });
      document.addEventListener('touchend', stopDrag);
      
      // Detener la animación del pétalo
      draggedPetal.style.transition = 'none';
    }
    
    function dragPetal(e) {
      if (!draggedPetal) return;
      
      draggedPetal.style.left = `${e.clientX - draggedPetal.offsetWidth / 2}px`;
      draggedPetal.style.top = `${e.clientY - draggedPetal.offsetHeight / 2}px`;
    }
    
    function dragPetalTouch(e) {
      if (!draggedPetal) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      draggedPetal.style.left = `${touch.clientX - draggedPetal.offsetWidth / 2}px`;
      draggedPetal.style.top = `${touch.clientY - draggedPetal.offsetHeight / 2}px`;
    }
    
    function stopDrag() {
      if (!draggedPetal) return;
      
      document.removeEventListener('mousemove', dragPetal);
      document.removeEventListener('touchmove', dragPetalTouch);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
      
      // Reiniciar la animación de caída desde la nueva posición
      const fallDuration = 5 + Math.random() * 8;
      const horizontalDrift = (Math.random() - 0.5) * 40;
      const currentLeft = parseFloat(draggedPetal.style.left);
      
      draggedPetal.style.transition = `top ${fallDuration}s linear, left ${fallDuration/2}s ease-in-out`;
      draggedPetal.style.top = `${window.innerHeight + 30}px`;
      draggedPetal.style.left = `${currentLeft + horizontalDrift}px`;
      
      // Eliminar el pétalo cuando termine la nueva animación
      setTimeout(() => {
        if (draggedPetal.parentNode) {
          petalContainer.removeChild(draggedPetal);
        }
      }, fallDuration * 1000);
      
      draggedPetal = null;
    }

    // Ajustar cuando se redimensiona la ventana
    window.addEventListener('resize', () => {
      // Limpiar todos los pétalos existentes al redimensionar
      while (petalContainer.firstChild) {
        petalContainer.removeChild(petalContainer.firstChild);
      }
    });

    // Inicializar estrellas cuando se carga la página
    window.addEventListener('load', crearEstrellas);