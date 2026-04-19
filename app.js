window.addEventListener('load', async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          const notificationPermission = await Notification.requestPermission();
          if (notificationPermission !== 'granted') {
            console.log('Notificacion permisos no asignados');
            new Notification("No hay notificaciones activas");
          } else {
            const title = 'Page David Salas ';
            const options = {
              body: 'Te gusta la pagina?',
              icon: '/img/icon.png',
              vibrate: [200, 100, 200, 100, 200, 100, 400],
              tag: 'request',
              actions: [
                { action: 'yes', title: 'Yes', icon: '/img/icon.png' },
                { action: 'no', title: 'No', icon: '/img/icon.png' }
              ]
            };
            const res = await registration.showNotification(title, options);
            console.log(res);
          }
        } catch (err) {
          console.error(err);
        }
      }
    });