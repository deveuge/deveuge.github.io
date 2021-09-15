---
title: Toxigent
date: "2021-01-03T00:00:00.000Z"
description: "Aplicación web creada con React para mostrar la información sobre plantas venenosas para mascotas recopilada por mi web scraper, Poisonous Plants Scraper."
tags: ["React", "Web Scraper", "Pupeteer"]

imagePreview: "img/projects/toxigent-00.png"
codePreview: "https://github.com/deveuge/toxigent"
livePreview: "https://toxigent.netlify.app"

image01: "img/projects/toxigent-00.png"
image02: "img/projects/toxigent-01.png"
image03: "img/projects/toxigent-02.png"
---

# Toxigent
**Toxigent** es una aplicación web basada en React y creada con [Create React App](https://github.com/facebook/create-react-app) que permite visualizar información sobre plantas que resultan tóxicas para las mascotas. La información es recopilada por un web scraper de desarrollo propio [Poisonous Plants Scraper](https://github.com/deveuge/poisonous-plants-scraper), construido con [Puppeteer](https://pptr.dev), que reúne información sobre plantas venenosas para mascotas y guarda los datos en formato JSON.  

## Características
- Página de inicio que enumera todas las plantas venenosas para perros y gatos y le permite filtrar y/o ordenarlas por:
    - Nombre común o científico.
    - Nivel de toxicidad: todos, moderado o grave.
    - Tipo de planta: todas, planta de interior, planta de jardín o planta silvestre.
    - Toxicidad: todos, tóxico para perros, no tóxico para perros, tóxico para gatos, no tóxico para gatos.
    - Mostrar solo las plantas que contienen información detallada: si esta opción está marcada, solo se mostrarán las plantas que contengan datos en "Información detallada".
- Uso de [material-table](https://material-table.com/) para mostrar todas las plantas en una tabla que ofrece la siguiente funcionalidad:
    - Ordenar por encabezados de tabla.
    - Acción personalizada que permite al usuario navegar al detalle de cada planta.
    - Opción de exportación para descargar los datos en formato CSV o PDF.
    - Posibilidad de cambiar al modo nocturno, que cambia la paleta de colores a una más oscura.
    - Posibilidad de navegar hasta el detalle de una planta aleatoria. Esta opción se encuentra en la parte inferior de la página web.
- Página de detalles de cada planta que muestra la siguiente información:
    - Imagen de la planta, obtenida de la información detallada. Si no hay una especificado, se mostrará una imagen predeterminada.
    - Icono de la planta.
    - Lista de síntomas comunes.
    - Tipo y toxicidad de la planta.
    - Tabla con información detallada de la planta. Si la planta no tiene información detallada, se mostrará el mensaje "No hay detalles disponibles".
    - Lista de resultados de Wikipedia relacionados con el nombre científico de la planta, limitando los resultados a un máximo de 3. Si no se encontraron resultados, se mostrará el mensaje "No hay resultados de Wikipedia disponibles".

## Aspectos técnicos
- Los datos de las plantas se guardan como un archivo JSON en la propia aplicación para evitar construir un backend que los sirva. La aplicación carga este fichero al inicio una única vez y, posteriormente, lo usa para mostrar la información solicitada al usuario.
- No se contemplan librerías de frontend adicionales para construir la interfaz web al considerarlas innecesarias tratándose de una Single Page Application. Es por ello que únicamente se emplea CSS grid y flexbox para hacer un diseño responsivo que se visualice correctamente en todas las pantallas.