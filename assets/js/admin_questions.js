// Preguntas para Administrador de Punto de Venta - Distribuidora de Electrodomésticos
const adminQuestions = [
    // A. Conocimientos de Punto de Venta (20 preguntas)
    {
        id: 1,
        text: "¿Qué es un inventario y por qué es importante en un punto de venta de electrodomésticos?",
        options: [
            { id: "a", text: "Control de productos disponibles para evitar pérdidas y optimizar ventas" },
            { id: "b", text: "Lista de empleados del punto de venta" },
            { id: "c", text: "Registro de clientes frecuentes" },
            { id: "d", text: "Control de horarios de trabajo" }
        ],
        correctAnswer: "a"
    },
    {
        id: 2,
        text: "¿Qué acción debe tomar si un producto tiene fecha de garantía vencida?",
        options: [
            { id: "a", text: "Venderlo con descuento" },
            { id: "b", text: "Retirarlo de la exhibición y contactar al proveedor" },
            { id: "c", text: "Dejarlo en exhibición sin mencionar la garantía" },
            { id: "d", text: "Cambiarlo por otro producto" }
        ],
        correctAnswer: "b"
    },
    {
        id: 3,
        text: "¿Cuál es la diferencia entre venta al contado y venta a crédito?",
        options: [
            { id: "a", text: "No hay diferencia, ambas son iguales" },
            { id: "b", text: "Contado: pago inmediato, Crédito: pago diferido con intereses" },
            { id: "c", text: "Contado: solo efectivo, Crédito: solo tarjeta" },
            { id: "d", text: "Contado: productos usados, Crédito: productos nuevos" }
        ],
        correctAnswer: "b"
    },
    {
        id: 4,
        text: "Marque la opción correcta: El control de caja diaria sirve para:",
        options: [
            { id: "a", text: "Controlar asistencia de empleados" },
            { id: "b", text: "Revisar el flujo de dinero y evitar pérdidas" },
            { id: "c", text: "Medir satisfacción del cliente" },
            { id: "d", text: "Controlar el inventario de productos" }
        ],
        correctAnswer: "b"
    },
    {
        id: 5,
        text: "Un cliente solicita una factura, pero el sistema no funciona. ¿Qué procedimiento aplica?",
        options: [
            { id: "a", text: "Decirle al cliente que regrese otro día" },
            { id: "b", text: "Hacer factura manual y luego digitalizarla cuando se repare el sistema" },
            { id: "c", text: "No vender el producto" },
            { id: "d", text: "Vender sin factura" }
        ],
        correctAnswer: "b"
    },
    {
        id: 6,
        text: "¿Qué reporte debe entregar un administrador al final del día?",
        options: [
            { id: "a", text: "Reporte de ventas, arqueo de caja y movimientos de inventario" },
            { id: "b", text: "Solo el total de ventas" },
            { id: "c", text: "Lista de clientes atendidos" },
            { id: "d", text: "Horarios de empleados" }
        ],
        correctAnswer: "a"
    },
    {
        id: 7,
        text: "Explique cómo organizaría la exhibición de productos en el punto de venta.",
        options: [
            { id: "a", text: "Por orden alfabético" },
            { id: "b", text: "Por categorías, productos destacados al frente, fácil acceso y buena iluminación" },
            { id: "c", text: "Por colores" },
            { id: "d", text: "Por tamaño únicamente" }
        ],
        correctAnswer: "b"
    },
    {
        id: 8,
        text: "¿Qué es un inventario físico y cada cuánto se recomienda hacerlo?",
        options: [
            { id: "a", text: "Conteo real de productos, se recomienda mensual o trimestral" },
            { id: "b", text: "Revisión de precios, se hace diariamente" },
            { id: "c", text: "Control de empleados, se hace semanalmente" },
            { id: "d", text: "Revisión de facturas, se hace anualmente" }
        ],
        correctAnswer: "a"
    },
    {
        id: 9,
        text: "Un cliente quiere devolver un producto fuera del plazo permitido. ¿Qué haría?",
        options: [
            { id: "a", text: "Aceptar la devolución sin condiciones" },
            { id: "b", text: "Explicar la política, evaluar el caso y buscar alternativas como cambio por otro producto" },
            { id: "c", text: "Rechazar categóricamente" },
            { id: "d", text: "Llamar a la policía" }
        ],
        correctAnswer: "b"
    },
    {
        id: 10,
        text: "¿Cuál es la función del arqueo de caja?",
        options: [
            { id: "a", text: "Contar el dinero y verificar que coincida con las ventas registradas" },
            { id: "b", text: "Limpiar la caja registradora" },
            { id: "c", text: "Cambiar el dinero por billetes nuevos" },
            { id: "d", text: "Contar los productos vendidos" }
        ],
        correctAnswer: "a"
    },
    {
        id: 11,
        text: "Mencione dos riesgos comunes de un punto de venta.",
        options: [
            { id: "a", text: "Robos y faltantes de inventario" },
            { id: "b", text: "Exceso de clientes y mucho ruido" },
            { id: "c", text: "Demasiada iluminación y calor" },
            { id: "d", text: "Productos muy baratos y empleados felices" }
        ],
        correctAnswer: "a"
    },
    {
        id: 12,
        text: "¿Qué significa tener un sobrestock de productos?",
        options: [
            { id: "a", text: "Tener pocos productos en inventario" },
            { id: "b", text: "Tener exceso de inventario que puede generar pérdidas por obsolescencia" },
            { id: "c", text: "Tener productos de buena calidad" },
            { id: "d", text: "Tener productos ordenados" }
        ],
        correctAnswer: "b"
    },
    {
        id: 13,
        text: "¿Qué datos debe contener una factura de venta?",
        options: [
            { id: "a", text: "Solo el precio total" },
            { id: "b", text: "Datos del cliente, productos, precios, impuestos, total y fecha" },
            { id: "c", text: "Solo el nombre del cliente" },
            { id: "d", text: "Solo la fecha de venta" }
        ],
        correctAnswer: "b"
    },
    {
        id: 14,
        text: "¿Cómo se asegura de que los precios en góndola coincidan con los del sistema?",
        options: [
            { id: "a", text: "Revisión periódica y actualización inmediata de cambios de precios" },
            { id: "b", text: "Preguntando a los clientes" },
            { id: "c", text: "Esperando que los clientes reclamen" },
            { id: "d", text: "No es necesario verificar" }
        ],
        correctAnswer: "a"
    },
    {
        id: 15,
        text: "Explique cómo controlaría los descuentos aplicados por vendedores.",
        options: [
            { id: "a", text: "Dejando que cada vendedor decida libremente" },
            { id: "b", text: "Estableciendo límites de descuento, autorización para montos altos y registro detallado" },
            { id: "c", text: "Prohibiendo todos los descuentos" },
            { id: "d", text: "Solo el gerente puede dar descuentos" }
        ],
        correctAnswer: "b"
    },
    {
        id: 16,
        text: "¿Qué acción tomaría si detecta diferencias entre inventario físico y sistema?",
        options: [
            { id: "a", text: "Ignorar las diferencias" },
            { id: "b", text: "Investigar las causas, ajustar el sistema y implementar controles preventivos" },
            { id: "c", text: "Cambiar todo el inventario" },
            { id: "d", text: "Culpar a los empleados" }
        ],
        correctAnswer: "b"
    },
    {
        id: 17,
        text: "¿Por qué es importante capacitar al personal de ventas?",
        options: [
            { id: "a", text: "Para que trabajen más horas" },
            { id: "b", text: "Para mejorar atención al cliente, conocimiento de productos y técnicas de venta" },
            { id: "c", text: "Para que no renuncien" },
            { id: "d", text: "Para cumplir requisitos legales únicamente" }
        ],
        correctAnswer: "b"
    },
    {
        id: 18,
        text: "¿Qué haría si un cliente solicita un producto agotado en el punto de venta?",
        options: [
            { id: "a", text: "Decirle que no hay y que regrese después" },
            { id: "b", text: "Verificar disponibilidad en otras sucursales, ofrecer productos similares o tomar pedido" },
            { id: "c", text: "Venderle otro producto más caro" },
            { id: "d", text: "Ignorar al cliente" }
        ],
        correctAnswer: "b"
    },
    {
        id: 19,
        text: "¿Cómo garantizaría el cumplimiento de metas de ventas mensuales?",
        options: [
            { id: "a", text: "Amenazando a los empleados" },
            { id: "b", text: "Seguimiento diario, motivación del equipo, estrategias promocionales y análisis de resultados" },
            { id: "c", text: "Bajando los precios de todos los productos" },
            { id: "d", text: "Trabajando solo los fines de semana" }
        ],
        correctAnswer: "b"
    },
    {
        id: 20,
        text: "Mencione dos indicadores claves en la gestión de un punto de venta.",
        options: [
            { id: "a", text: "Ventas por día y rotación de inventario" },
            { id: "b", text: "Número de empleados y color de las paredes" },
            { id: "c", text: "Temperatura del local y música ambiental" },
            { id: "d", text: "Cantidad de sillas y tamaño de la caja" }
        ],
        correctAnswer: "a"
    },

    // B. Ortografía y Redacción (20 preguntas)
    {
        id: 21,
        text: "Señale la palabra correctamente escrita:",
        options: [
            { id: "a", text: "Refirgerador" },
            { id: "b", text: "Refrigerador" },
            { id: "c", text: "Refrijerador" },
            { id: "d", text: "Refriguerador" }
        ],
        correctAnswer: "b"
    },
    {
        id: 22,
        text: "Complete la frase con la forma correcta: 'El cliente ___ pidió un cambio de producto'.",
        options: [
            { id: "a", text: "me" },
            { id: "b", text: "mí" },
            { id: "c", text: "míi" },
            { id: "d", text: "mi" }
        ],
        correctAnswer: "a"
    },
    {
        id: 23,
        text: "Indique cuál de las siguientes frases está bien redactada:",
        options: [
            { id: "a", text: "Los electrodomesticos son de buena calidad." },
            { id: "b", text: "Los electrodomésticos son de buena calidad." },
            { id: "c", text: "Los electro-domesticos son de buena calidad." },
            { id: "d", text: "Los electrodomesticos son de buena calidád." }
        ],
        correctAnswer: "b"
    },
    {
        id: 24,
        text: "Corrija la siguiente frase: 'El servisio al cliente deve ser exelente.'",
        options: [
            { id: "a", text: "El servicio al cliente debe ser excelente." },
            { id: "b", text: "El servisio al cliente debe ser exelente." },
            { id: "c", text: "El servicio al cliente deve ser excelente." },
            { id: "d", text: "El servisio al cliente deve ser excelente." }
        ],
        correctAnswer: "a"
    },
    {
        id: 25,
        text: "Escriba tres palabras con tilde en la última sílaba (agudas):",
        options: [
            { id: "a", text: "Café, sofá, bebé" },
            { id: "b", text: "Casa, mesa, silla" },
            { id: "c", text: "Árbol, fácil, difícil" },
            { id: "d", text: "Teléfono, música, rápido" }
        ],
        correctAnswer: "a"
    },
    {
        id: 26,
        text: "¿Cuál de estas palabras está escrita correctamente?",
        options: [
            { id: "a", text: "Benta" },
            { id: "b", text: "Venta" },
            { id: "c", text: "Vemta" },
            { id: "d", text: "Bemta" }
        ],
        correctAnswer: "b"
    },
    {
        id: 27,
        text: "Escriba correctamente la palabra: 'proseso'.",
        options: [
            { id: "a", text: "Proceso" },
            { id: "b", text: "Proseso" },
            { id: "c", text: "Proceso" },
            { id: "d", text: "Prosesso" }
        ],
        correctAnswer: "c"
    },
    {
        id: 28,
        text: "Marque la opción con ortografía correcta:",
        options: [
            { id: "a", text: "Garanztía" },
            { id: "b", text: "Garantía" },
            { id: "c", text: "Garamtia" },
            { id: "d", text: "Garantia" }
        ],
        correctAnswer: "b"
    },
    {
        id: 29,
        text: "Complete: 'La atención al cliente debe ser ______ y ______.'",
        options: [
            { id: "a", text: "rápida y eficiente" },
            { id: "b", text: "lenta y complicada" },
            { id: "c", text: "cara y difícil" },
            { id: "d", text: "rapida y efisiente" }
        ],
        correctAnswer: "a"
    },
    {
        id: 30,
        text: "Corrija la frase: 'La caja no cuadra por que el cajero cometio un herror.'",
        options: [
            { id: "a", text: "La caja no cuadra porque el cajero cometió un error." },
            { id: "b", text: "La caja no cuadra por que el cajero cometió un herror." },
            { id: "c", text: "La caja no cuadra porque el cajero cometio un error." },
            { id: "d", text: "La caja no cuadra por que el cajero cometio un herror." }
        ],
        correctAnswer: "a"
    },
    {
        id: 31,
        text: "Escriba una oración utilizando correctamente la palabra 'allí'.",
        options: [
            { id: "a", text: "Allí está el producto que busca el cliente." },
            { id: "b", text: "Alli esta el producto que busca el cliente." },
            { id: "c", text: "Ahí está el producto que busca el cliente." },
            { id: "d", text: "Hay está el producto que busca el cliente." }
        ],
        correctAnswer: "a"
    },
    {
        id: 32,
        text: "Identifique el error: 'Se iso el reporte de ventas del mes.'",
        options: [
            { id: "a", text: "Se hizo el reporte de ventas del mes." },
            { id: "b", text: "Se iso el reporte de ventas del mes." },
            { id: "c", text: "Se hiso el reporte de ventas del mes." },
            { id: "d", text: "Se izo el reporte de ventas del mes." }
        ],
        correctAnswer: "a"
    },
    {
        id: 33,
        text: "Escriba tres palabras que lleven 'h' al inicio.",
        options: [
            { id: "a", text: "Hola, hermano, historia" },
            { id: "b", text: "Casa, mesa, silla" },
            { id: "c", text: "Ola, ermano, istoria" },
            { id: "d", text: "Agua, tierra, fuego" }
        ],
        correctAnswer: "a"
    },
    {
        id: 34,
        text: "Marque la frase escrita correctamente:",
        options: [
            { id: "a", text: "El televisor se entrego ayer." },
            { id: "b", text: "El televisor se entregó ayer." },
            { id: "c", text: "El televisor se entrego aller." },
            { id: "d", text: "El televisor se entregó aller." }
        ],
        correctAnswer: "b"
    },
    {
        id: 35,
        text: "Corrija: 'El vendedor bolvio a llamar al cliente.'",
        options: [
            { id: "a", text: "El vendedor volvió a llamar al cliente." },
            { id: "b", text: "El vendedor bolvio a llamar al cliente." },
            { id: "c", text: "El vendedor bolbio a llamar al cliente." },
            { id: "d", text: "El vendedor volvio a llamar al cliente." }
        ],
        correctAnswer: "a"
    },
    {
        id: 36,
        text: "Complete con la palabra correcta: 'El informe está bien ___ (echo/hecho)'.",
        options: [
            { id: "a", text: "echo" },
            { id: "b", text: "hecho" },
            { id: "c", text: "heco" },
            { id: "d", text: "eco" }
        ],
        correctAnswer: "b"
    },
    {
        id: 37,
        text: "Señale la palabra escrita correctamente:",
        options: [
            { id: "a", text: "Empleado" },
            { id: "b", text: "Empleyado" },
            { id: "c", text: "Emplleado" },
            { id: "d", text: "Empleyado" }
        ],
        correctAnswer: "a"
    },
    {
        id: 38,
        text: "Corrija: 'Los clentes estan satisfechos con la atencion.'",
        options: [
            { id: "a", text: "Los clientes están satisfechos con la atención." },
            { id: "b", text: "Los clentes están satisfechos con la atención." },
            { id: "c", text: "Los clientes estan satisfechos con la atencion." },
            { id: "d", text: "Los clentes estan satisfechos con la atencion." }
        ],
        correctAnswer: "a"
    },
    {
        id: 39,
        text: "Escriba una oración con dos palabras esdrújulas.",
        options: [
            { id: "a", text: "El médico revisó el teléfono rápidamente." },
            { id: "b", text: "El doctor reviso el telefono rapido." },
            { id: "c", text: "El medico reviso el telefono rapidamente." },
            { id: "d", text: "El médico reviso el teléfono rapido." }
        ],
        correctAnswer: "a"
    },
    {
        id: 40,
        text: "Complete: 'El cliente solicitó una ______ por la compra realizada.'",
        options: [
            { id: "a", text: "factura" },
            { id: "b", text: "faktura" },
            { id: "c", text: "fatura" },
            { id: "d", text: "facthura" }
        ],
        correctAnswer: "a"
    },

    // C. Atención al Cliente y Casos Prácticos (10 preguntas)
    {
        id: 41,
        text: "Un cliente compra una nevera y al día siguiente llama molesto porque no enfría. ¿Qué procedimiento sigue?",
        options: [
            { id: "a", text: "Decirle que es su problema" },
            { id: "b", text: "Escuchar, disculparse, verificar garantía, coordinar revisión técnica o cambio" },
            { id: "c", text: "Colgar el teléfono" },
            { id: "d", text: "Decirle que lea el manual" }
        ],
        correctAnswer: "b"
    },
    {
        id: 42,
        text: "Si un cliente llega enojado reclamando, ¿cómo debe iniciar la conversación?",
        options: [
            { id: "a", text: "Con una actitud defensiva" },
            { id: "b", text: "Escuchando activamente, mostrando empatía y manteniendo la calma" },
            { id: "c", text: "Gritándole de vuelta" },
            { id: "d", text: "Ignorándolo hasta que se calme" }
        ],
        correctAnswer: "b"
    },
    {
        id: 43,
        text: "¿Qué es más importante en la atención: rapidez, amabilidad o conocimiento del producto? Justifique.",
        options: [
            { id: "a", text: "Solo la rapidez" },
            { id: "b", text: "El equilibrio de los tres: conocimiento para asesorar, amabilidad para generar confianza y rapidez para eficiencia" },
            { id: "c", text: "Solo la amabilidad" },
            { id: "d", text: "Solo el conocimiento" }
        ],
        correctAnswer: "b"
    },
    {
        id: 44,
        text: "En caso de detectar una falta de dinero en caja, ¿cuál es el protocolo?",
        options: [
            { id: "a", text: "Ignorar la diferencia" },
            { id: "b", text: "Reportar inmediatamente, revisar transacciones, investigar causas y documentar" },
            { id: "c", text: "Poner dinero propio" },
            { id: "d", text: "Culpar al cajero anterior" }
        ],
        correctAnswer: "b"
    },
    {
        id: 45,
        text: "Complete: 'Un buen administrador de punto de venta debe ser ____ y ____.'",
        options: [
            { id: "a", text: "organizado y líder" },
            { id: "b", text: "perezoso y descuidado" },
            { id: "c", text: "lento y confuso" },
            { id: "d", text: "desorganizado y autoritario" }
        ],
        correctAnswer: "a"
    },
    {
        id: 46,
        text: "Un cliente pide un producto que está agotado. ¿Qué respuesta adecuada le daría?",
        options: [
            { id: "a", text: "'No hay, váyase'" },
            { id: "b", text: "'Disculpe, ese producto está agotado. Puedo verificar en otras sucursales o sugerirle una alternativa similar'" },
            { id: "c", text: "'Mala suerte'" },
            { id: "d", text: "'Regrese mañana'" }
        ],
        correctAnswer: "b"
    },
    {
        id: 47,
        text: "Explique cómo manejaría una fila de clientes en temporada alta.",
        options: [
            { id: "a", text: "Dejando que esperen sin hacer nada" },
            { id: "b", text: "Abrir más cajas, organizar filas, informar tiempos de espera y ofrecer atención personalizada" },
            { id: "c", text: "Cerrando el local" },
            { id: "d", text: "Atendiendo solo a conocidos" }
        ],
        correctAnswer: "b"
    },
    {
        id: 48,
        text: "¿Qué acciones tomaría si un cliente no recibe la garantía prometida?",
        options: [
            { id: "a", text: "Decirle que no es mi problema" },
            { id: "b", text: "Investigar el caso, contactar al proveedor, ofrecer soluciones y hacer seguimiento" },
            { id: "c", text: "Ignorar la situación" },
            { id: "d", text: "Decirle que hable con el gerente" }
        ],
        correctAnswer: "b"
    },
    {
        id: 49,
        text: "¿Cómo motivaría al equipo de ventas para cumplir metas?",
        options: [
            { id: "a", text: "Con amenazas y castigos" },
            { id: "b", text: "Incentivos, reconocimiento, capacitación, metas claras y ambiente de trabajo positivo" },
            { id: "c", text: "Reduciendo salarios" },
            { id: "d", text: "Trabajando solo" }
        ],
        correctAnswer: "b"
    },
    {
        id: 50,
        text: "¿Qué haría para fidelizar clientes en la distribuidora de electrodomésticos?",
        options: [
            { id: "a", text: "Subir los precios" },
            { id: "b", text: "Excelente servicio, programa de puntos, seguimiento post-venta, ofertas exclusivas y atención personalizada" },
            { id: "c", text: "Ignorar a los clientes" },
            { id: "d", text: "Vender solo productos caros" }
        ],
        correctAnswer: "b"
    }
];