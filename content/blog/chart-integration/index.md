---
title: Chart Integration
date: "2021-01-02T00:00:00.000Z"
description: "Componente de integración con Quickchart.io desarrollado para JBoss Fuse. Transforma la información contenida en ficheros CSV en representaciones gráficas."
tags: ["Java", "Apache Camel", "Apache CXF"]

imagePreview: "img/projects/chart-integration-00.png"
codePreview: "https://github.com/deveuge/chart-integration"
livePreview: ""

image01: "img/projects/chart-integration-00.png"
image02: "img/projects/chart-integration-02.png"
image03: "img/projects/chart-integration-03.png"
---

# Chart-integration
**Chart-integration** es un componente de integración desarrollado para Red Hat JBoss Fuse que convierte ficheros CSV a gráficos. Emplea la [API QuickChart](https://quickchart.io/), desarrollada sobre [Chart.js](https://www.chartjs.org/), para generar los gráficos.

## Características
- Importe un archivo CSV y observe cómo se convierte mágicamente en una gráfica en formato PNG.
- Seleccione entre gráficos de barras, líneas, radar, anillos o circulares.
- Configure notificaciones por correo electrónico para cada vez que se genere un gráfico con éxito o cuando ocurra un error. 

## Supuestos
Este componente hace las siguientes suposiciones:
- Los archivos de entrada siempre están en formato CSV.
- Un archivo de entrada solo contiene datos para un único gráfico.
- Las etiquetas del gráfico corresponderán siempre a la primera fila.
- El primer valor de la primera fila siempre se ignora.
- El gráfico a generar siempre será de tipo barra a menos que se especifique lo contrario en el nombre de archivo del CSV. 

## Aspectos ténicos
Existirán tres rutas:
- **QuickChartRoute**: Ruta general, que procesará los ficheros CSV recibidos desde el directorio de entrada.
- **EmailOKRoute**: Ruta para el envío de notificaciones en caso de procesamientos correctos.
- **EmailKORoute**: Ruta para el envío de notificaciones en caso de procesamientos erróneos.

Existirán dos procesadores:
- **RequestProcessor**: Encargado de leer el fichero CSV y construir la petición que se enviará a QuickChart.io.
- **EmailProcessor**: Encargado de componer el correo a enviar tanto para procesamientos correctos como erróneos.

## Aspectos funcionales
El componente seguirá la siguiente lógica de flujo:
1. El usuario depositará su fichero CSV en un directorio de entrada configurado por properties. 
2. La ruta general procesará dicho fichero, enviando la petición a QuickChart.io para generar el gráfico.
3. El gráfico devuelto será almacenado en el directorio de salida configurado por properties.
4. El fichero original será movido al directorio de procesados configurado por properties.
5. Si el procesamiento es correcto, se enviará un correo de notificación incluyendo el gráfico generado.
6. En caso de error, se enviará un correo de notificación incluyendo la excepción causante.

## Instalación
La integración de gráficos requiere el siguiente stack:
- [Java 8](https://www.java.com/en/download/help/java8.html)
- [JBoss EAP 6.4.0](https://developers.redhat.com/products/eap/download)
- [JBoss Fuse 6.3.0](https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=jboss.fuse&version=6.3)

Puede seguir [esta guía](https://access.redhat.com/documentation/en-us/red_hat_jboss_fuse/6.3/html/installation_on_jboss_eap/installing_red_hat_jboss_fuse_on_eap) para instalar JBoss Fuse en JBoss EAP. 

## Configuración
La carpeta "ChartIntegration" ubicada en "src/dev" contiene todos los archivos de configuración necesarios para configurar el componente de integración:
* **configuration.properties**: Archivo de propiedades para establecer valores de configuración.
* **conf**: Carpeta de configuración, contiene las plantillas de correo electrónico OK y KO.
* **work**: Carpeta que contiene los directorios de entrada, salida y procesados.
* **testFiles**: Carpeta que contiene los ficheros de prueba. 

Para configurar **Chart-integration**, debe seguir estos pasos:
1. Copie la carpeta "ChartIntegration" ubicada en "src/dev" al directorio raíz de instalación de JBoss.
2. A través de JBoss CLI, agregue un valor de tipo String en JNDI que haga referencia a la ubicación del archivo "configuration.properties".
```
/subsystem=naming/binding=java:/chart-integration/configuration.properties:add(value="file:/path/to/ChartIntegration/configuration.properties",binding-type=simple)
```
3. Si desea configurar notificaciones por correo electrónico, edite el archivo "configuration.properties" y complete las propiedades que comienzan con "email". De lo contrario, deje vacía la propiedad "email.smtp.server" para deshabilitar las notificaciones por correo electrónico.
4. ¡Listo!

### Fichero de configuración
Las propiedades del archivo de configuración se describen a continuación: 
- General:
    - **general.file.delimiter**: Delimitador de los archivos CSV. 
    - **general.directory.input**: Directorio de entrada. Los archivos CSV a convertir deben dejarse en este directorio.
    - **general.directory.output**: Directorio de salida. Los gráficos (en formato PNG) se dejarán en este directorio.
    - **general.directory.processed**: Directorio de procesados. Una vez que se genera el gráfico, el archivo CSV original se dejará en este directorio con la extensión .BAK. 
- Notificaciones de correo electrónico:
    - **email.smtp.server**: Serivdor SMTP. Establézcalo como "smtp.gmail.com" si desea usar gmail. Déjelo en blanco si no desea utilizar las notificaciones por correo electrónico. 
    - **email.smpt.port**: Puerto SMTP. Establézcalo como "25" si desea utilizar gmail.
    - **email.smtp.requiresAuthentication**: Booleano que define si la conexión SMTP requiere autenticación. 
    - **email.smtp.authentication.username**: Nombre de usuario de autenticación SMTP. Déjelo en blanco si la conexión SMTP no requiere autenticación. 
    - **email.smtp.authentication.password**: Contraseña de autenticación SMTP. Se puede cifrar con [JBoss Password Vault](https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/6.4/html/security_guide/configure_and_use_password_vault). Déjelo en blanco si la conexión SMTP no requiere autenticación. 
    - **email.notification.from**: Remitente de las notificación por correo electrónico.
    - **email.notification.to**: Destinatarios de las notificaciones por correo electrónico separados por comas. 
    - **email.notification.subject.ok**: Asunto del correo electrónico para ejecuciones correctas. Déjelo en blanco si no desea utilizar notificaciones para ejecuciones correctas.
    - **email.notification.body.ok**: Ruta a la plantilla de correo electrónico para ejecuciones correctas. Déjelo en blanco si no desea utilizar notificaciones para ejecuciones correctas.
    - **email.notification.subject.ko**: Asunto del correo electrónico para ejecuciones erróneas. Déjelo en blanco si no desea utilizar notificaciones para ejecuciones erróneas.
    - **email.notification.body.ko**: Ruta a la plantilla de correo electrónico para ejecuciones erróneas. Déjelo en blanco si no desea utilizar notificaciones para ejecuciones erróneas.

## Probando el componente
Una vez que el componente está desplegado en JBoss y el servidor está levantado, puede seguir estos pasos para verificar que funcione correctamente:
1. Arrastre un archivo de la carpeta "testFiles" a la carpeta "work/input" que ahora se encuentra en "ChartIntegration", en su directorio de instalación de JBoss.
2. Vaya a la carpeta "work/output" y verifique que ahora existe un archivo PNG con el nombre de su archivo original y un timestamp agregado.
3. ¡Hurra! Su gráfico se ha generado correctamente.
4. Verifique que el archivo CSV original está ahora en la carpeta "work/processed" con la extensión .BAK. 

## Especificando el tipo de gráfico a generar
De forma predeterminada, el componente asume que el gráfico que se generará será un gráfico de barras.
Para cambiar esto, puede agregar uno de los siguientes sufijos al nombre del archivo, precediéndolo con un "-": 
- LINE
- BAR
- RADAR
- DOUGHNUT
- PIE

(p. ej., cambie el nombre de "Sales.csv" a "Sales-LINE.csv")

## Notificaciones de correo electrónico
Las notificaciones por correo electrónico se pueden personalizar editando las plantillas presentes en la carpeta "conf".
Para notificaciones de ejecuciones correctas, el gráfico generado se adjuntará al correo electrónico. 


## Mejoras futuras
Siempre hay margen de mejora. A continuación, se detalla una lista de comportamientos que se pueden mejorar:
* Corregir imágenes inline en Gmail. En este momento, las notificaciones correctas por correo electrónico en Gmail no muestran la imagen del gráfico, aunque sí se adjuntan.
* Corregir los datos de entrada de archivos CSV para gráficos circulares y de anillos. Este tipo de gráficos obligan a transponer el archivo CSV antes de procesarlo.
* Agregar más tipos de gráficos. Quickchart.io tiene [una gran variedad de gráficos](https://quickchart.io/gallery/). Algunos son variaciones de los tipos básicos existentes (línea, barra, radar, rosquilla y circular). Para incluirlos, la petición debe contener un objeto "options" dentro del objeto "chart".
* Permitir diferentes formatos de gráficos. Quickchart.io puede devolver el gráfico generado en PNG, WebP, SVG y PDF. En este momento, solo se está utilizando PNG.
* Agregar un servicio para llamar a la API QuickChart.io directamente.
* Agregar tests.