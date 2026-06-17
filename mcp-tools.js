// Inicializar modelContext si no existe
if (!document.modelContext) {
  document.modelContext = {
    tools: [],
    registerTool: function(tool) {
      this.tools.push(tool);
      console.log("Herramienta MCP registrada:", tool.name);
    }
  };
}

// Herramienta: Servicios MCP
document.modelContext.registerTool({
  name: "getServices",
  title: "Lista de servicios",
  description: "Devuelve los servicios ofrecidos en la página Developer de Costa Rica",
  inputSchema: { type: "object", properties: {} },
  execute: async () => {
    try {
      const response = await fetch("data/services.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error cargando services.json:", error);
      return { services: [] };
    }
  }
});

// Herramienta: Proyectos MCP
document.modelContext.registerTool({
  name: "getProjects",
  title: "Portafolio de proyectos",
  description: "Devuelve los proyectos personales del desarrollador",
  inputSchema: { type: "object", properties: {} },
  execute: async () => {
    try {
      const response = await fetch("data/projects.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error cargando projects.json:", error);
      return { projects: [] };
    }
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
