const fs = require('fs');

// Lee el archivo JSON con los resultados de accesibilidad
fs.readFile('cypress/reports/a11y-results.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error leyendo el archivo:', err);
    return;
  }

  const violations = JSON.parse(data);

  let markdown = `## Reporte de Accesibilidad\n\n| Nivel de severidad | ID                     | Descripción                                                | Elementos afectados | Más info                                       |\n|--------------------|------------------------|------------------------------------------------------------|---------------------|-----------------------------------------------|\n`;

  violations.forEach(({ id, impact, description, helpUrl, nodes }) => {
    markdown += `| ${impact.toUpperCase()} | ${id} | ${description} | ${nodes.length} | [Link](${helpUrl}) |\n`;
  });

  // Guardar en un archivo markdown
  fs.writeFile('cypress/reports/a11y-results.md', markdown, (err) => {
    if (err) {
      console.error('Error escribiendo el archivo Markdown:', err);
    } else {
      console.log('¡Reporte generado con éxito! Puedes verlo en a11y-results.md');
    }
  });
});
