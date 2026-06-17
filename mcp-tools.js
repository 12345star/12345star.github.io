// Herramienta: Servicios MCP
document.modelContext.registerTool({
  name: "getServices",
  title: "Lista de servicios",
  description: "Devuelve los servicios ofrecidos en la página Developer de Costa Rica",
  inputSchema: { type: "object", properties: {} },
  execute: async () => {
    // Leer desde services.json
    const response = await fetch("data/services.json");
    const data = await response.json();
    return data;
  }
});

// Herramienta: Proyectos MCP
document.modelContext.registerTool({
  name: "getProjects",
  title: "Portafolio de proyectos",
  description: "Devuelve los proyectos personales del desarrollador",
  inputSchema: { type: "object", properties: {} },
  execute: async () => {
    // Leer desde projects.json
    const response = await fetch("data/projects.json");
    const data = await response.json();
    return data;
  }
});

// Herramienta: Contacto MCP
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
