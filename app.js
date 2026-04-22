    window.addEventListener('load', async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('ServiceWorker registration successful with scope: ', registration.scope);

          // Guardamos el registro para usarlo en mostrarMensaje
          window.swRegistration = registration;
        } catch (err) {
          console.error(err);
        }
      }
    });

    // Función llamada desde el enlace
    async function mostrarMensaje() {
      alert("¡Hola! Has hecho clic en el enlace.");

      try {
        const notificationPermission = await Notification.requestPermission();

        if (notificationPermission === 'granted') {
          const title = 'Page David Salas';
          const options = {
            body: '¿Te gusta la página?',
            icon: '/img/icon.png',
            vibrate: [200, 100, 200, 100, 200, 100, 400],
            tag: 'request',
            actions: [
              { action: 'yes', title: 'Sí', icon: '/img/icon.png' },
              { action: 'no', title: 'No', icon: '/img/icon.png' }
            ]
          };

          if (window.swRegistration) {
            window.swRegistration.showNotification(title, options);
          } else {
            console.error("Service Worker no está registrado aún.");
          }
        } else {
          console.log('Permiso de notificaciones no concedido.');
          document.body.insertAdjacentHTML(
            'beforeend',
            '<p>⚠️ Las notificaciones están bloqueadas. Actívalas en la configuración del navegador.</p>'
          );
        }
      } catch (err) {
        console.error("Error solicitando permiso:", err);
      }
    }
