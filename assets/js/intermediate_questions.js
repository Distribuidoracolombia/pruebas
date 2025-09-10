// Preguntas para el nivel intermedio de Excel
const intermediateQuestions = [
    {
        id: 1,
        text: "¿Qué función utilizaría para buscar un valor en la primera columna de una tabla y devolver un valor de la misma fila en una columna diferente?",
        options: [
            { id: "a", text: "=BUSCARV()" },
            { id: "b", text: "=BUSCARH()" },
            { id: "c", text: "=COINCIDIR()" },
            { id: "d", text: "=INDICE()" }
        ],
        correctAnswer: "a"
    },
    {
        id: 2,
        text: "¿Qué función se utiliza para combinar texto de diferentes celdas?",
        options: [
            { id: "a", text: "=UNIR()" },
            { id: "b", text: "=CONCATENAR()" },
            { id: "c", text: "=COMBINAR()" },
            { id: "d", text: "=JUNTAR()" }
        ],
        correctAnswer: "b"
    },
    {
        id: 3,
        text: "¿Qué función devuelve el número de días entre dos fechas?",
        options: [
            { id: "a", text: "=DIAS()" },
            { id: "b", text: "=FECHADIF()" },
            { id: "c", text: "=RESTAR.FECHAS()" },
            { id: "d", text: "=DIAS.LAB()" }
        ],
        correctAnswer: "a"
    },
    {
        id: 4,
        text: "¿Qué función se utiliza para contar celdas que cumplen con un criterio específico?",
        options: [
            { id: "a", text: "=CONTAR()" },
            { id: "b", text: "=CONTARA()" },
            { id: "c", text: "=CONTAR.SI()" },
            { id: "d", text: "=CONTAR.CONJUNTO()" }
        ],
        correctAnswer: "c"
    },
    {
        id: 5,
        text: "¿Qué tipo de gráfico es mejor para mostrar la contribución de cada valor a un total?",
        options: [
            { id: "a", text: "Gráfico de líneas" },
            { id: "b", text: "Gráfico de barras" },
            { id: "c", text: "Gráfico circular" },
            { id: "d", text: "Gráfico de dispersión" }
        ],
        correctAnswer: "c"
    },
    {
        id: 6,
        text: "¿Qué función se utiliza para sumar valores que cumplen múltiples criterios?",
        options: [
            { id: "a", text: "=SUMA()" },
            { id: "b", text: "=SUMA.SI()" },
            { id: "c", text: "=SUMA.SI.CONJUNTO()" },
            { id: "d", text: "=SUMAR.MULTIPLE()" }
        ],
        correctAnswer: "c"
    },
    {
        id: 7,
        text: "¿Qué característica de Excel permite filtrar datos según criterios específicos?",
        options: [
            { id: "a", text: "Formato condicional" },
            { id: "b", text: "Tablas dinámicas" },
            { id: "c", text: "Autofiltro" },
            { id: "d", text: "Validación de datos" }
        ],
        correctAnswer: "c"
    },
    {
        id: 8,
        text: "¿Qué función se utiliza para encontrar un valor en una tabla o rango por fila y columna?",
        options: [
            { id: "a", text: "=BUSCARV()" },
            { id: "b", text: "=BUSCARH()" },
            { id: "c", text: "=INDICE()" },
            { id: "d", text: "=DESREF()" }
        ],
        correctAnswer: "c"
    },
    {
        id: 9,
        text: "¿Qué función devuelve la posición de un valor dentro de un rango?",
        options: [
            { id: "a", text: "=ENCONTRAR()" },
            { id: "b", text: "=COINCIDIR()" },
            { id: "c", text: "=POSICION()" },
            { id: "d", text: "=INDICE()" }
        ],
        correctAnswer: "b"
    },
    {
        id: 10,
        text: "¿Qué función se utiliza para calcular pagos de préstamos?",
        options: [
            { id: "a", text: "=PAGO()" },
            { id: "b", text: "=VF()" },
            { id: "c", text: "=TASA()" },
            { id: "d", text: "=VA()" }
        ],
        correctAnswer: "a"
    },
    {
        id: 11,
        text: "¿Qué función se usa para contar la cantidad de celdas que contienen números en un rango?",
        options: [
            { id: "a", text: "=COUNTIF()" },
            { id: "b", text: "=COUNTA()" },
            { id: "c", text: "=COUNT()" },
            { id: "d", text: "=SUM()" }
        ],
        correctAnswer: "c"
    },
    {
        id: 12,
        text: "¿Cómo puedes proteger una hoja de trabajo para evitar que otros modifiquen sus datos?",
        options: [
            { id: "a", text: "Cambiando la contraseña de Excel" },
            { id: "b", text: "Usando la opción \"Proteger hoja\" en la pestaña Revisar" },
            { id: "c", text: "Cambiando los permisos de la computadora" },
            { id: "d", text: "No se puede proteger una hoja" }
        ],
        correctAnswer: "b"
    },
    {
        id: 13,
        text: "¿Cuál es la función de la herramienta \"Texto en columnas\"?",
        options: [
            { id: "a", text: "Unir varias celdas en una sola" },
            { id: "b", text: "Dividir el contenido de una celda en varias columnas" },
            { id: "c", text: "Cambiar el formato de las celdas" },
            { id: "d", text: "Ordenar los datos de una columna" }
        ],
        correctAnswer: "b"
    },
    {
        id: 14,
        text: "¿Cómo se puede aplicar una fórmula a varias celdas sin tener que escribirla en cada una?",
        options: [
            { id: "a", text: "Usando la opción de \"Rellenar\" con la tecla Enter" },
            { id: "b", text: "Copiando y pegando la fórmula" },
            { id: "c", text: "Usando la función SUM()" },
            { id: "d", text: "Usando el controlador de relleno" }
        ],
        correctAnswer: "d"
    },
    {
        id: 15,
        text: "¿Cómo se puede agrupar celdas en Excel para que se muestren como una sola unidad?",
        options: [
            { id: "a", text: "Usando la opción \"Combinar celdas\"" },
            { id: "b", text: "Usando la opción \"Formato condicional\"" },
            { id: "c", text: "Usando la opción \"Agrupar celdas\"" },
            { id: "d", text: "Usando la fórmula CONCATENAR()" }
        ],
        correctAnswer: "a"
    },
    {
        id: 16,
        text: "¿Cuál es la forma de crear una lista desplegable en una celda?",
        options: [
            { id: "a", text: "Usando el formato condicional" },
            { id: "b", text: "Usando la opción \"Validación de datos\"" },
            { id: "c", text: "Insertando una tabla dinámica" },
            { id: "d", text: "Usando la función \"Buscar objetivo\"" }
        ],
        correctAnswer: "b"
    },
    {
        id: 17,
        text: "¿Qué es una tabla dinámica en Excel?",
        options: [
            { id: "a", text: "Una tabla que cambia de color automáticamente" },
            { id: "b", text: "Una herramienta para resumir y analizar datos" },
            { id: "c", text: "Una tabla que se actualiza con datos externos" },
            { id: "d", text: "Una tabla con fórmulas avanzadas" }
        ],
        correctAnswer: "b"
    },
    {
        id: 18,
        text: "¿Qué función se utiliza para combinar texto de diferentes celdas?",
        options: [
            { id: "a", text: "=UNIR()" },
            { id: "b", text: "=CONCATENAR()" },
            { id: "c", text: "=COMBINAR()" },
            { id: "d", text: "=JUNTAR()" }
        ],
        correctAnswer: "b"
    },
    {
        id: 19,
        text: "¿Qué es un formato condicional en Excel?",
        options: [
            { id: "a", text: "Un formato que se aplica solo a ciertas celdas" },
            { id: "b", text: "Un formato que cambia según el valor de la celda" },
            { id: "c", text: "Un formato que solo se aplica a fórmulas" },
            { id: "d", text: "Un formato que se aplica a toda la hoja" }
        ],
        correctAnswer: "b"
    },
    {
        id: 20,
        text: "¿Qué función se utiliza para calcular pagos de préstamos?",
        options: [
            { id: "a", text: "=PAGO()" },
            { id: "b", text: "=VF()" },
            { id: "c", text: "=TASA()" },
            { id: "d", text: "=VA()" }
        ],
        correctAnswer: "a"
    }
];