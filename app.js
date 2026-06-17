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
      try {
        const notificationPermission = await Notification.requestPermission();

        if (notificationPermission === 'granted') {
          const title = 'David Salas Lorente';
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
            '<p>Las notificaciones están bloqueadas. Actívalas en la configuración del navegador.</p>'
          );
        }
      } catch (err) {
        console.error("Error solicitando permiso:", err);
      }
    }


  // Herramienta: Servicios MCP
  document.modelContext.registerTool({
    name: "getServices",
    title: "Lista de servicios",
    description: "Devuelve los servicios ofrecidos en la página Developer de Costa Rica",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      return {
        services: [
          "QA Analyst",
          "Developer Costa Rica",
          "Developer JAVA",
          "Developer Python",
          "Developer Node.js",
          "Developer PHP",
          "Developer C#",
          "Developer C++"

        ]
      };
    }
  });

  // Herramienta: Proyectos. para MCP
  document.modelContext.registerTool({
    name: "getProjects",
    title: "Portafolio de proyectos",
    description: "Devuelve los proyectos personales del desarrollador",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      return {
        projects: [
          { name: "Golang + calculadora terminal",  url: "https://12345star.github.io/calculadora-golang/" },
          { name: "HTML,CSS + Template Portafolio", url: "https://12345star.github.io/template_protafolio/" },
          { name: "Python + crear IMG para movil",  url: "https://12345star.github.io/convertidor-imagen-table-movil-python/" },
          { name: "Python + calculadora terminal",  url: "https://12345star.github.io/calculadora-terminal-python/"},
          { name: "Pyton + Calculadora Flet",       url: "https://12345star.github.io/flet-python-calculator" },
          { name: "Python + Creador de Curriculum", url: "https://12345star.github.io/curriculum-python-flet/" },
          { name: "Python,docker,postgres,fastapi", url: "https://12345star.github.io/docker-postgres-python-fastapi/"},
          { name: "Portafolio personal WEB",        url: "https://12345star.github.io"}
        ]
      };
    }
  });

  // Herramienta: Contacto para MCP
  document.modelContext.registerTool({
    name: "getContactInfo",
    title: "Información de contacto",
    description: "Devuelve email y redes sociales",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      return {
        github: "https://github.com/12345star",
        linkedin: "https://www.linkedin.com/in/david-salas-lorente-757947198/"
      };
    }
  });

