// Preguntas para el nivel básico de Excel
const basicQuestions = [
    {
        id: 1,
        text: "¿Cuál de las siguientes fórmulas calcula correctamente el promedio de los valores en el rango A1:A10?",
        options: [
            { id: "a", text: "=PROMEDIO(A1:A10)" },
            { id: "b", text: "=AVERAGE(A1:A10)" },
            { id: "c", text: "=SUMA(A1:A10)/10" },
            { id: "d", text: "=MEDIA(A1:A10)" }
        ],
        correctAnswer: "a"
    },
    {
        id: 2,
        text: "¿Qué tecla de función se utiliza para editar una celda?",
        options: [
            { id: "a", text: "F1" },
            { id: "b", text: "F2" },
            { id: "c", text: "F4" },
            { id: "d", text: "F5" }
        ],
        correctAnswer: "b"
    },
    {
        id: 3,
        text: "¿Cuál es el símbolo que se utiliza para iniciar una fórmula en Excel?",
        options: [
            { id: "a", text: "#" },
            { id: "b", text: "$" },
            { id: "c", text: "=" },
            { id: "d", text: "@" }
        ],
        correctAnswer: "c"
    },
    {
        id: 4,
        text: "¿Qué función se utiliza para contar celdas que contienen números en un rango?",
        options: [
            { id: "a", text: "CONTAR" },
            { id: "b", text: "CONTARA" },
            { id: "c", text: "CONTAR.SI" },
            { id: "d", text: "CONTAR.BLANCO" }
        ],
        correctAnswer: "a"
    },
    {
        id: 5,
        text: "¿Cómo se selecciona un rango de celdas desde A1 hasta C5?",
        options: [
            { id: "a", text: "A1+C5" },
            { id: "b", text: "A1:C5" },
            { id: "c", text: "A1-C5" },
            { id: "d", text: "A1,C5" }
        ],
        correctAnswer: "b"
    },
    {
        id: 6,
        text: "¿Qué función se utiliza para encontrar el valor más alto en un rango de celdas?",
        options: [
            { id: "a", text: "MAX" },
            { id: "b", text: "MAXIMO" },
            { id: "c", text: "MAYOR" },
            { id: "d", text: "ALTO" }
        ],
        correctAnswer: "a"
    },
    {
        id: 7,
        text: "¿Qué combinación de teclas se utiliza para copiar celdas seleccionadas?",
        options: [
            { id: "a", text: "Ctrl+X" },
            { id: "b", text: "Ctrl+C" },
            { id: "c", text: "Ctrl+V" },
            { id: "d", text: "Ctrl+Z" }
        ],
        correctAnswer: "b"
    },
    {
        id: 8,
        text: "¿Qué función se utiliza para sumar un rango de celdas?",
        options: [
            { id: "a", text: "TOTAL" },
            { id: "b", text: "SUMAR" },
            { id: "c", text: "SUMA" },
            { id: "d", text: "ADICION" }
        ],
        correctAnswer: "c"
    },
    {
        id: 9,
        text: "¿Qué tipo de referencia no cambia al copiar una fórmula?",
        options: [
            { id: "a", text: "Referencia relativa" },
            { id: "b", text: "Referencia absoluta" },
            { id: "c", text: "Referencia mixta" },
            { id: "d", text: "Referencia externa" }
        ],
        correctAnswer: "b"
    },
    {
        id: 10,
        text: "¿Qué función se utiliza para redondear un número al entero más cercano?",
        options: [
            { id: "a", text: "REDONDEAR" },
            { id: "b", text: "ENTERO" },
            { id: "c", text: "REDONDEAR.MAS" },
            { id: "d", text: "REDONDEAR.MENOS" }
        ],
        correctAnswer: "a"
    },
    {
        id: 11,
        text: "¿Cuál es la función principal de Excel?",
        options: [
            { id: "a", text: "Crear bases de datos" },
            { id: "b", text: "Realizar cálculos y análisis de datos" },
            { id: "c", text: "Crear presentaciones" },
            { id: "d", text: "Editar imágenes" }
        ],
        correctAnswer: "b"
    },
    {
        id: 12,
        text: "¿Qué significa la abreviatura \"CELDA\" en Excel?",
        options: [
            { id: "a", text: "Es una fila de datos" },
            { id: "b", text: "Es una columna de datos" },
            { id: "c", text: "Es el espacio donde se ingresa la información" },
            { id: "d", text: "Es una fórmula" }
        ],
        correctAnswer: "c"
    },
    {
        id: 13,
        text: "¿Cómo se llama la primera fila de una hoja de Excel que contiene títulos?",
        options: [
            { id: "a", text: "Fila de encabezado" },
            { id: "b", text: "Fila de título" },
            { id: "c", text: "Fila de etiquetas" },
            { id: "d", text: "Fila de entrada" }
        ],
        correctAnswer: "a"
    },
    {
        id: 14,
        text: "¿Qué tecla se utiliza para agregar una nueva hoja de trabajo?",
        options: [
            { id: "a", text: "F1" },
            { id: "b", text: "Ctrl + N" },
            { id: "c", text: "Shift + N" },
            { id: "d", text: "Ctrl + T" }
        ],
        correctAnswer: "b"
    },
    {
        id: 15,
        text: "¿Cómo se puede realizar una suma de varias celdas?",
        options: [
            { id: "a", text: "Usando la fórmula SUM()" },
            { id: "b", text: "Usando la fórmula AVERAGE()" },
            { id: "c", text: "Usando la fórmula COUNT()" },
            { id: "d", text: "Usando la fórmula MAX()" }
        ],
        correctAnswer: "a"
    },
    {
        id: 16,
        text: "¿Cuál de las siguientes opciones sirve para cambiar el tipo de letra de una celda?",
        options: [
            { id: "a", text: "Formato de celdas > Fuente" },
            { id: "b", text: "Menú Archivo" },
            { id: "c", text: "Formato de celdas > Bordes" },
            { id: "d", text: "Pestaña Revisión" }
        ],
        correctAnswer: "a"
    },
    {
        id: 17,
        text: "¿Cómo se formatea una celda para que muestre solo dos decimales?",
        options: [
            { id: "a", text: "Usando el comando de fuente" },
            { id: "b", text: "Usando la opción de \"Formato de celda\" en la pestaña Inicio" },
            { id: "c", text: "Usando la fórmula ROUND()" },
            { id: "d", text: "No se puede hacer" }
        ],
        correctAnswer: "b"
    },
    {
        id: 18,
        text: "¿Qué ocurre si escribes =A1+A2 en una celda?",
        options: [
            { id: "a", text: "Se muestra un error" },
            { id: "b", text: "Se muestra el texto =A1+A2" },
            { id: "c", text: "Se muestra la suma de los valores en las celdas A1 y A2" },
            { id: "d", text: "Se copia el contenido de A1 y A2" }
        ],
        correctAnswer: "c"
    },
    {
        id: 19,
        text: "¿Cómo se puede insertar una nueva fila en Excel?",
        options: [
            { id: "a", text: "Clic derecho > Insertar > Fila" },
            { id: "b", text: "Menú Archivo > Nueva fila" },
            { id: "c", text: "Ctrl + I" },
            { id: "d", text: "Alt + F" }
        ],
        correctAnswer: "a"
    },
    {
        id: 20,
        text: "¿Qué es un libro de trabajo en Excel?",
        options: [
            { id: "a", text: "Una celda individual" },
            { id: "b", text: "Un archivo de Excel que contiene una o más hojas" },
            { id: "c", text: "Una fórmula compleja" },
            { id: "d", text: "Un conjunto de gráficos" }
        ],
        correctAnswer: "b"
    }
];