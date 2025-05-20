# SVG Pathinator

![SVG Pathinator](public/pathinator.svg)

> Aplicación web que extermina los paths no optimizados. Sirve para optimizar trayectos de un SVG y hacer tareas relacionadas.

## Tareas pendientes

- 1️⃣ Probar la API CSS Highlight a ver si nos sirve para ponerle resaltado de colores al código del textarea sin aumentar el DOM.
- 2️⃣ Crear una caja de acciones (en lugar del código entero) en el output para que sea más legible.

- Añadir el procentaje de cambio del output respecto al pegado en el input.

- Posibilidad de centrar la preview del SVG moviendo el ratón (Investigar la mejor forma: cambiar atributos del SVG).

## Tareas pendientes próximas

- Crear una pestaña donde puedas elegir si quieres código SVG (`<path>`) o si quieres código CSS (`path()`).
```
  -> from
M -> move
L -> line
H -> hline to
V -> vline to
C -> curve
S -> smooth to ___ with
A -> arc ___ of ___
Q ->
Z -> close
```

- Botón copiar aún no tiene funcionalidad, ver si añadir un botón radio para elegir SVG/CSS.

- Actualizar la preview cada vez que modifiques el viewport (ahora mismo no es reactivo).

- Mejorar la interfaz (UI).

- Convertir de path absoluto a path relativo y viceversa (esto puede ser interesante para reducir el tamaño de un SVG).

- Otras optimizaciones (reducción de puntos, uso de CSS, etc...) Habría que investigar.

## Créditos

- Usamos **PathParser** ( [svg-path-editor](https://github.com/Yqnn/svg-path-editor/blob/master/src/lib/path-parser.ts) ).
