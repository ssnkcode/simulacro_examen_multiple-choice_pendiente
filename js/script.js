// Variables globales
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime;
let timerInterval;
let examQuestions = [];

// Elementos DOM
const startSection = document.getElementById('start-section');
const examSection = document.getElementById('exam-section');
const resultsSection = document.getElementById('results-section');
const startExamBtn = document.getElementById('start-exam');
const questionsContainer = document.getElementById('questions-container');
const prevQuestionBtn = document.getElementById('prev-question');
const nextQuestionBtn = document.getElementById('next-question');
const finishExamBtn = document.getElementById('finish-exam');
const restartExamBtn = document.getElementById('restart-exam');
const reviewAnswersBtn = document.getElementById('review-answers');
const timerElement = document.getElementById('timer');
const progressElement = document.getElementById('progress');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const percentageElement = document.getElementById('percentage');
const timeTakenElement = document.getElementById('time-taken');
const resultMessage = document.getElementById('result-message');

// Banco de preguntas ampliado con 110 preguntas
const questionBank = [
    {
        text: "¿Qué es un mock en el contexto de testing unitario?",
        options: [
            "Una función que simula el comportamiento de una dependencia real",
            "Un tipo de aserción personalizada",
            "Un framework de testing alternativo a Jest",
            "Una herramienta para medir cobertura de código"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Cuál es la principal diferencia entre un mock y un spy?",
        options: [
            "El mock reemplaza completamente la función, el spy solo la observa",
            "El spy es más rápido que el mock",
            "El mock solo funciona con funciones asíncronas",
            "El spy no puede verificar parámetros de llamada"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué es un stub en testing unitario?",
        options: [
            "Una función que devuelve valores fijos para simular condiciones",
            "Un tipo de error que ocurre durante las pruebas",
            "Una herramienta para generar reportes de cobertura",
            "Un patrón de diseño para organizar tests"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué ventaja principal ofrece TypeScript en el desarrollo?",
        options: [
            "Ejecuta código más rápido que JavaScript",
            "Detecta errores de tipo antes de la ejecución",
            "No requiere transpilación para ejecutarse",
            "Es compatible solo con Node.js"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué es la transpilación?",
        options: [
            "La conversión de código de alto nivel a código máquina",
            "La transformación de un lenguaje a otro del mismo nivel",
            "La optimización de código para mejor rendimiento",
            "La compresión de código para reducir tamaño"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué representa el código de estado HTTP 201?",
        options: [
            "Solicitud procesada correctamente",
            "Recurso creado exitosamente",
            "Error del cliente en la solicitud",
            "Recurso no encontrado"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál es el propósito del método HTTP PUT?",
        options: [
            "Crear un nuevo recurso",
            "Reemplazar completamente un recurso existente",
            "Eliminar un recurso",
            "Consultar información de un recurso"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué característica define a una API REST?",
        options: [
            "Usa únicamente el método POST",
            "Es stateful por naturaleza",
            "Representa recursos con URLs y métodos HTTP",
            "Solo devuelve respuestas en formato XML"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué código HTTP se debe usar cuando un recurso no existe?",
        options: [
            "400 Bad Request",
            "401 Unauthorized",
            "404 Not Found",
            "500 Internal Server Error"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué es el middleware de errores en Express?",
        options: [
            "Una función que convierte excepciones en respuestas HTTP coherentes",
            "Una herramienta para medir el rendimiento de la API",
            "Un tipo de test para verificar endpoints",
            "Un protocolo de seguridad para APIs"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué ventaja ofrecen los tests parametrizados?",
        options: [
            "Ejecutan la misma prueba con múltiples conjuntos de datos",
            "Son más rápidos que los tests normales",
            "No requieren configuración de setup",
            "Solo funcionan con funciones asíncronas"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué representa el código de estado HTTP 422?",
        options: [
            "Error de autenticación",
            "Recurso no encontrado",
            "Regla de negocio violada",
            "Error interno del servidor"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Cuál es el propósito de beforeEach en Jest?",
        options: [
            "Limpiar el entorno después de cada test",
            "Preparar el entorno antes de cada test",
            "Ejecutar código una vez antes de todos los tests",
            "Medir el tiempo de ejecución de los tests"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué indica la cobertura de código?",
        options: [
            "El porcentaje de código ejecutado por las pruebas",
            "La velocidad de ejecución de los tests",
            "La cantidad de asserts en cada test",
            "El número de dependencias mockeadas"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué analogía se usa para explicar una API?",
        options: [
            "El mozo de un restaurante",
            "El conductor de un automóvil",
            "El profesor en un aula",
            "El médico en un consultorio"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué protocolo garantiza que los mensajes HTTP lleguen completos y en orden?",
        options: [
            "TLS",
            "TCP",
            "UDP",
            "SSL"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué característica tiene HTTP como protocolo?",
        options: [
            "Es stateful",
            "Es stateless",
            "Solo funciona con conexiones seguras",
            "No permite métodos diferentes a GET y POST"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué header HTTP se usa para indicar el formato del cuerpo de la respuesta?",
        options: [
            "Authorization",
            "Content-Type",
            "Accept",
            "Cache-Control"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué es el estándar RFC 7807?",
        options: [
            "Un formato común para respuestas de error en APIs",
            "Un protocolo de seguridad para HTTP",
            "Una especificación para testing unitario",
            "Un estándar para documentación de APIs"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué principio ético es importante en el diseño de APIs?",
        options: [
            "Ocultar los errores para no preocupar al usuario",
            "Usar la menor documentación posible",
            "Comunicar con claridad y transparencia",
            "Priorizar la velocidad sobre la claridad"
        ],
        correctAnswer: 2
    },
    
    // Nuevas preguntas sobre Serverless y funciones en la nube (21-30)
    {
        text: "¿Cuál de las siguientes afirmaciones describe correctamente el modelo Serverless?",
        options: [
            "No existen servidores, todo corre directamente en el navegador del usuario",
            "El desarrollador configura manualmente los servidores pero no los paga",
            "El proveedor de nube administra la infraestructura y ejecuta el código bajo demanda",
            "Las funciones serverless mantienen su estado en memoria entre ejecuciones",
            "Es un modelo solo válido para bases de datos relacionales"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Cuál es una consecuencia directa de que una función serverless sea stateless?",
        options: [
            "No puede conectarse a una base de datos externa",
            "Requiere mantener sesiones activas en el servidor",
            "Puede escalar automáticamente, ya que cada ejecución es independiente",
            "Guarda en memoria los datos de usuario entre solicitudes",
            "No puede ser desplegada con TypeScript"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Cuál de las siguientes opciones es una ventaja de Vercel frente a Netlify?",
        options: [
            "Permite configurar manualmente los contenedores de funciones",
            "Tiene soporte automático para TypeScript y mejor integración con frontends dinámicos",
            "No requiere conexión a GitHub para desplegar",
            "No ofrece funciones serverless",
            "Es exclusivamente para proyectos en Python"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué problema específico resuelve principalmente la arquitectura Serverless?",
        options: [
            "Elimina completamente la necesidad de bases de datos",
            "Reduce el costo de infraestructura ociosa mediante pago por uso",
            "Permite ejecutar código sin conexión a internet",
            "Reemplaza todos los frameworks de desarrollo existentes",
            "Elimina la necesidad de testing unitario"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué es un 'cold start' en el contexto de funciones serverless?",
        options: [
            "Un error de compilación en TypeScript",
            "La latencia inicial al invocar una función inactiva",
            "El proceso de apagado automático de servidores no utilizados",
            "Una función que falla en su primera ejecución",
            "El tiempo de configuración inicial de Vercel o Netlify"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Dónde se deben colocar las funciones serverless en un proyecto de Vercel?",
        options: [
            "En la carpeta 'functions/' en la raíz del proyecto",
            "En la carpeta 'api/' dentro del proyecto",
            "En la carpeta 'serverless/' configurada en vercel.json",
            "En cualquier carpeta con extensión .js o .ts",
            "Solo en la carpeta 'pages/api/' de Next.js"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué característica de las funciones serverless permite el escalado automático?",
        options: [
            "Su capacidad de mantener estado entre ejecuciones",
            "Su naturaleza stateless y ejecución efímera",
            "El uso exclusivo de JavaScript",
            "La integración con GitHub",
            "El soporte para bases de datos relacionales"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cómo se maneja la persistencia de datos en una arquitectura serverless?",
        options: [
            "Usando variables globales en las funciones",
            "Almacenando datos en el sistema de archivos local",
            "Utilizando servicios externos como bases de datos en la nube",
            "No es posible mantener datos persistentes",
            "Mediante cookies en el navegador del usuario"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué archivo de configuración se usa en Netlify para definir la ubicación de las funciones?",
        options: [
            "netlify.json",
            "netlify.config.js",
            "netlify.toml",
            "functions.json",
            "build.config.js"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Cuál es la principal limitación de las funciones serverless para procesos continuos?",
        options: [
            "No soportan TypeScript",
            "Tienen timeout de ejecución y no mantienen estado",
            "Son más lentas que los servidores tradicionales",
            "No pueden conectarse a internet",
            "Solo funcionan con métodos HTTP GET"
        ],
        correctAnswer: 1
    },

    // Nuevas preguntas sobre Testing Unitario Avanzado (31-40)
    {
        text: "¿Qué diferencia principal existe entre un mock y un spy en Jest?",
        options: [
            "El mock ejecuta la función real y el spy la reemplaza",
            "El mock sustituye completamente una dependencia; el spy solo observa una función real",
            "Ambos se comportan igual, solo cambia la sintaxis",
            "El spy no permite verificar parámetros",
            "El mock no puede simular valores de retorno"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál de los siguientes ejemplos representa una aserción?",
        options: [
            "Crear un objeto jest.fn() para registrar llamadas",
            "Usar expect(valor).toBe(resultadoEsperado) para comparar el resultado real con el esperado",
            "Ejecutar beforeEach() para inicializar el entorno de prueba",
            "Simular la fecha actual con jest.spyOn()",
            "Llamar a un servicio externo desde el test"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué característica hace que una prueba unitaria sea determinista?",
        options: [
            "Su resultado depende del día y la hora en que se ejecuta",
            "Siempre produce el mismo resultado si el código no cambió",
            "Requiere acceso a la base de datos",
            "Se ejecuta solo una vez en todo el proyecto",
            "Depende de una API externa"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué mide la cobertura de código generada por Jest?",
        options: [
            "La cantidad de líneas eliminadas del código",
            "El porcentaje de código ejecutado por los tests",
            "El número de dependencias externas del proyecto",
            "Los errores detectados en tiempo de compilación",
            "Las funciones con más llamadas en producción"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál es el propósito principal de los tests parametrizados?",
        options: [
            "Ejecutar tests en paralelo para mayor velocidad",
            "Probar la misma lógica con múltiples conjuntos de datos de entrada",
            "Validar el rendimiento del código bajo carga",
            "Verificar la integración entre diferentes módulos",
            "Medir el tiempo de ejecución de cada test"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué función de Jest se utiliza para limpiar mocks después de cada test?",
        options: [
            "jest.resetAll()",
            "jest.cleanup()",
            "jest.clearAllMocks()",
            "jest.removeMocks()",
            "jest.refreshAll()"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Cuál es la ventaja de usar beforeEach() en lugar de configurar el estado dentro de cada test?",
        options: [
            "Hace que los tests sean más lentos",
            "Permite reutilizar la configuración inicial para múltiples tests",
            "Elimina la necesidad de afterEach()",
            "Hace que los tests sean asíncronos",
            "Permite usar variables globales sin declararlas"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué representa un 'stub' en testing unitario?",
        options: [
            "Un test que falla intencionalmente",
            "Una función que simula el comportamiento real con respuestas predefinidas",
            "Un archivo de configuración para Jest",
            "Un tipo de aserción avanzada",
            "Un reporte de cobertura de código"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál es el propósito de describe() en los tests de Jest?",
        options: [
            "Compilar TypeScript a JavaScript",
            "Agrupar tests relacionados y organizar el código de prueba",
            "Ejecutar tests en orden específico",
            "Generar reportes de cobertura",
            "Configurar variables de entorno para testing"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué se verifica con la aserción toHaveBeenCalledWith()?",
        options: [
            "Que una función mock fue llamada con parámetros específicos",
            "Que un test fue ejecutado exitosamente",
            "Que el código tiene la cobertura esperada",
            "Que una función existe en el módulo",
            "Que un objeto tiene una propiedad específica"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Cuál de los siguientes códigos HTTP indica un éxito sin cuerpo de respuesta?",
        options: [
            "200 OK",
            "201 Created",
            "202 Accepted",
            "204 No Content",
            "206 Partial Content"
        ],
        correctAnswer: 3
    },
    {
        text: "¿Qué representa el código 422 Unprocessable Entity en una API?",
        options: [
            "Error de sintaxis en la solicitud",
            "Falta de autenticación",
            "Recurso no encontrado",
            "Datos válidos sintácticamente pero que violan una regla de negocio",
            "Error interno del servidor"
        ],
        correctAnswer: 3
    },
    {
        text: "Según los principios REST y el cierre conceptual de la unidad, una API clara, intuitiva y robusta se caracteriza por:",
        options: [
            "Usar nombres de rutas aleatorios para proteger la seguridad",
            "Ocultar los errores para evitar que el cliente vea fallas",
            "Mantener consistencia en los métodos, códigos y mensajes devueltos",
            "Centralizar toda la lógica del negocio en el cliente",
            "Ignorar las reglas del protocolo HTTP para ganar flexibilidad"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué header HTTP se utiliza para autenticación con tokens Bearer?",
        options: [
            "Content-Type",
            "Accept",
            "Authorization",
            "Cache-Control",
            "User-Agent"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Cuál es el propósito del método HTTP PATCH?",
        options: [
            "Crear un nuevo recurso",
            "Reemplazar completamente un recurso existente",
            "Modificar parcialmente un recurso existente",
            "Eliminar un recurso",
            "Consultar metadatos de un recurso"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué ventaja ofrece el estándar RFC 7807 para manejo de errores en APIs?",
        options: [
            "Define un formato común y estructurado para respuestas de error",
            "Permite ejecutar código JavaScript en el cliente",
            "Elimina la necesidad de códigos de estado HTTP",
            "Automatiza el proceso de testing de APIs",
            "Reduce el tamaño de las respuestas HTTP"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué código HTTP debería devolverse cuando un usuario no tiene permisos para acceder a un recurso?",
        options: [
            "400 Bad Request",
            "401 Unauthorized",
            "403 Forbidden",
            "404 Not Found",
            "409 Conflict"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué principio de REST se refiere a que cada solicitud debe contener toda la información necesaria?",
        options: [
            "Interface uniforme",
            "Stateless",
            "Sistema en capas",
            "Código bajo demanda",
            "Cacheable"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál es el propósito principal del middleware de errores en Express?",
        options: [
            "Convertir excepciones en respuestas HTTP coherentes y estructuradas",
            "Optimizar el rendimiento de la API",
            "Generar documentación automática",
            "Validar esquemas de entrada",
            "Autenticar usuarios automáticamente"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué analogía se utiliza en la unidad para explicar el concepto de API?",
        options: [
            "El conductor de un automóvil",
            "El mozo de un restaurante",
            "El profesor en un aula",
            "El médico en consultorio",
            "El ingeniero en una obra"
        ],
        correctAnswer: 1
    },
    {
    text: "¿Cuál es el propósito principal del testing unitario según la unidad?",
    options: [
        "Verificar que las partes más pequeñas del sistema se comporten como se espera",
        "Probar toda la aplicación en conjunto",
        "Validar la interfaz de usuario",
        "Medir el rendimiento del sistema completo",
        "Automatizar el despliegue en producción"
    ],
    correctAnswer: 0
    },
    {
        text: "En el proyecto GestorDeTareas, ¿qué función cumple la clase Tarea?",
        options: [
            "Gestionar el envío de correos electrónicos",
            "Representar una tarea con título, propietario, estado y fecha límite",
            "Calcular estadísticas de rendimiento",
            "Configurar las dependencias del servicio",
            "Ejecutar los tests automatizados"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué dos dependencias principales usa el ServicioTareas en el método notificarSiVenceHoy?",
        options: [
            "Base de datos y sistema de archivos",
            "Correo y FechaUtils",
            "API externa y cache",
            "Logger y validador",
            "Autenticación y autorización"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué permite controlar un mock en Jest?",
        options: [
            "Solo lo que devuelve la función",
            "Lo que devuelve, cuántas veces fue llamada y con qué parámetros",
            "Únicamente los parámetros de llamada",
            "Solo el número de veces que fue invocada",
            "Exclusivamente los errores que produce"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál es la diferencia principal entre un mock y un spy en Jest?",
        options: [
            "El mock solo observa, el spy reemplaza completamente",
            "El mock reemplaza completamente la función, el spy solo la observa",
            "Ambos funcionan exactamente igual",
            "El spy es más rápido que el mock",
            "El mock solo funciona con funciones asíncronas"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué función de Jest se utiliza para crear un espía que observe un método?",
        options: [
            "jest.fn()",
            "jest.mock()",
            "jest.spyOn()",
            "jest.observe()",
            "jest.watch()"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué es un stub en el contexto de testing unitario?",
        options: [
            "Una función que falla intencionalmente",
            "Una función falsa que devuelve un valor fijo para simular condiciones",
            "Un tipo de aserción avanzada",
            "Un reporte de cobertura de código",
            "Una herramienta para medir performance"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué verifica una aserción en testing unitario?",
        options: [
            "La velocidad de ejecución del código",
            "La cobertura de código alcanzada",
            "La comparación entre resultado obtenido y resultado esperado",
            "La cantidad de memoria utilizada",
            "El número de dependencias del módulo"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué ventaja ofrecen los tests parametrizados?",
        options: [
            "Ejecutar tests en paralelo",
            "Probar la misma lógica con múltiples conjuntos de datos sin repetir código",
            "Validar el rendimiento bajo carga",
            "Generar reportes automáticos",
            "Reducir el tiempo de compilación"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál es el propósito de beforeEach en Jest?",
        options: [
            "Limpiar el entorno después de cada test",
            "Preparar el entorno antes de cada test",
            "Ejecutar código una vez antes de todos los tests",
            "Medir el tiempo de ejecución de los tests",
            "Generar datos aleatorios para testing"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué función se usa para limpiar mocks después de cada test?",
        options: [
            "jest.resetAll()",
            "jest.cleanup()",
            "jest.clearAllMocks()",
            "jest.removeMocks()",
            "jest.refreshAll()"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué indica la cobertura de código generada por Jest?",
        options: [
            "La cantidad de líneas de código del proyecto",
            "El porcentaje de código ejecutado por los tests",
            "El número de tests que pasaron",
            "La velocidad de ejecución de los tests",
            "La complejidad del código"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué se verifica con la aserción toHaveBeenCalledTimes(1)?",
        options: [
            "Que una función fue llamada exactamente una vez",
            "Que una función fue llamada al menos una vez",
            "Que una función fue llamada con un parámetro específico",
            "Que una función existe en el módulo",
            "Que una función devuelve el valor esperado"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué permite mockReturnValue en Jest?",
        options: [
            "Forzar el valor de retorno de una función mockeada o espiada",
            "Cambiar el nombre de una función",
            "Medir el tiempo de retorno de una función",
            "Validar el tipo de retorno de una función",
            "Optimizar el rendimiento de una función"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Cuál es una buena práctica para nombres de tests?",
        options: [
            "Usar nombres cortos y genéricos",
            "Usar nombres descriptivos que indiquen el comportamiento esperado",
            "Usar números secuenciales",
            "Usar nombres técnicos complejos",
            "No poner nombres a los tests"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué función de agrupación se usa en Jest para organizar tests relacionados?",
        options: [
            "group()",
            "describe()",
            "suite()",
            "collection()",
            "batch()"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué ventaja tiene usar afterEach() en los tests?",
        options: [
            "Preparar datos antes de cada test",
            "Limpiar o restablecer el estado después de cada test",
            "Ejecutar código una vez después de todos los tests",
            "Medir el tiempo entre tests",
            "Generar reportes parciales"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué representa una aserción personalizada en Jest?",
        options: [
            "Una verificación extendida creada por el desarrollador para casos específicos",
            "Un tipo de test que falla intencionalmente",
            "Una función que simula comportamiento",
            "Un reporte de cobertura personalizado",
            "Una métrica de performance"
        ],
        correctAnswer: 0
    },
    {
        text: "En el ejemplo del proyecto GestorDeTareas, ¿qué se mockea para evitar depender del reloj real?",
        options: [
            "El servicio de correo",
            "La base de datos",
            "El sistema de archivos",
            "FechaUtils para obtener la fecha actual",
            "El logger de la aplicación"
        ],
        correctAnswer: 3
    },
    {
        text: "¿Qué comando de Jest genera un reporte de cobertura de código?",
        options: [
            "npx jest --test",
            "npx jest --coverage",
            "npx jest --report",
            "npx jest --metrics",
            "npx jest --analyze"
        ],
        correctAnswer: 1
    },
    {
    text: "¿Qué significa realmente el término 'serverless'?",
    options: [
        "No existen servidores, todo corre en el navegador",
        "Los servidores existen pero el desarrollador no los gestiona",
        "Es un modelo solo para aplicaciones pequeñas",
        "Los servidores son gratuitos en este modelo",
        "Significa que el código se ejecuta sin usar HTTP"
    ],
    correctAnswer: 1
    },
    {
        text: "Enumera las tres ventajas principales de una arquitectura serverless.",
        options: [
            "Escalado manual, costo fijo, alta complejidad",
            "Escalado automático, pago por uso, menor complejidad operativa",
            "Mayor control de servidores, costo predecible, configuración simple",
            "Sin límites de tiempo, estado persistente, sin dependencias",
            "Ejecución continua, latencia cero, sin configuración"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuáles son las limitaciones más importantes del modelo serverless?",
        options: [
            "No ideal para procesos continuos, cold start, dependencia del proveedor",
            "No soporta JavaScript, es muy caro, no escala",
            "Requiere gestionar servidores, es lento, complejo de configurar",
            "Solo funciona con Python, sin integración GitHub, sin logs",
            "Sin límites de ejecución, estado persistente, sin cold start"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué problema resuelve el serverless respecto al 'costo de inactividad'?",
        options: [
            "Cobra más cuando no hay uso",
            "Solo se paga cuando hay ejecución efectiva",
            "Requiere pago mensual fijo",
            "Elimina todos los costos de infraestructura",
            "Los servidores son siempre gratuitos"
        ],
        correctAnswer: 1
    },
    {
        text: "Explica con tus palabras qué es FaaS (Functions as a Service).",
        options: [
            "Un modelo donde se mantienen servidores activos permanentemente",
            "Un entorno donde cada bloque de código responde a un evento sin servidor activo",
            "Un servicio para almacenar archivos en la nube",
            "Un tipo de base de datos serverless",
            "Un framework para desarrollo frontend"
        ],
        correctAnswer: 1
    },
    {
        text: "Compara el modelo de despliegue tradicional con el modelo serverless en términos de gestión de servidores.",
        options: [
            "En ambos el desarrollador gestiona los servidores",
            "En tradicional se gestionan servidores, en serverless el proveedor los gestiona",
            "En serverless se gestionan más servidores que en tradicional",
            "No hay diferencia en la gestión de servidores",
            "El tradicional no usa servidores"
        ],
        correctAnswer: 1
    },
    {
        text: "¿En qué se diferencian Vercel y Netlify en su manejo de funciones serverless?",
        options: [
            "Vercel usa carpeta 'api/', Netlify usa 'netlify/functions/'",
            "Ambos usan la misma estructura de carpetas",
            "Vercel no soporta funciones serverless",
            "Netlify no requiere configuración para TypeScript",
            "No hay diferencias significativas"
        ],
        correctAnswer: 0
    },
    {
        text: "Compara la estructura de carpetas para crear una función en Vercel versus Netlify.",
        options: [
            "Vercel: 'api/', Netlify: 'netlify/functions/'",
            "Vercel: 'functions/', Netlify: 'api/'",
            "Ambos usan 'src/functions/'",
            "Vercel: 'server/', Netlify: 'api/'",
            "No usan carpetas específicas"
        ],
        correctAnswer: 0
    },
    {
        text: "Explica la diferencia entre una aplicación stateful y una función stateless. ¿Por qué esta última es crucial para serverless?",
        options: [
            "Stateful mantiene estado, stateless no; crucial para escalabilidad automática",
            "Stateful es más rápida, stateless es más lenta; crucial para rendimiento",
            "Ambas mantienen estado; no hay diferencia para serverless",
            "Stateless mantiene estado entre ejecuciones; crucial para persistencia",
            "Stateful no usa memoria; stateless usa mucha memoria"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué es un 'cold start' y por qué ocurre en las arquitecturas serverless?",
        options: [
            "Error de compilación; ocurre por código TypeScript mal escrito",
            "Latencia inicial al invocar función inactiva; ocurre al inicializar entorno",
            "Apagado de servidores; ocurre por falta de uso prolongado",
            "Fallo de red; ocurre por problemas de conectividad",
            "Tiempo de build; ocurre durante el despliegue"
        ],
        correctAnswer: 1
    },
    {
        text: "Describe los pasos para desplegar una función serverless en Vercel, partiendo desde un repositorio de GitHub.",
        options: [
            "Crear proyecto en GitHub, importar en Vercel, deploy automático",
            "Configurar servidores manualmente, compilar código, subir a Vercel",
            "Solo hacer push a GitHub sin configuración adicional",
            "Contactar soporte de Vercel para cada deploy",
            "Usar FTP para subir archivos a Vercel"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Qué es la 'transpilación' y por qué es necesaria cuando se usa TypeScript en un entorno serverless?",
        options: [
            "Compresión de código; para reducir tamaño",
            "Transformación de TypeScript a JavaScript; para compatibilidad con entornos",
            "Optimización de imágenes; para mejor rendimiento",
            "Encriptación de código; para seguridad",
            "Minificación de CSS; para carga más rápida"
        ],
        correctAnswer: 1
    },
    {
        text: "En Netlify, ¿qué función cumple el archivo netlify.toml?",
        options: [
            "Configuración de build, funciones y opciones de despliegue",
            "Almacenamiento de datos de usuario",
            "Configuración de base de datos",
            "Definición de tipos TypeScript",
            "Gestión de dependencias npm"
        ],
        correctAnswer: 0
    },
    {
        text: "Menciona al menos tres tipos de eventos que pueden disparar la ejecución de una función serverless.",
        options: [
            "Peticiones HTTP, mensajes en cola, cambios en base de datos",
            "Solo peticiones HTTP GET",
            "Eventos de mouse, teclado, touch",
            "Cambios de tiempo meteorológico",
            "Notificaciones de email entrante"
        ],
        correctAnswer: 0
    },
    {
        text: "¿Para qué tipo de proyectos o aplicaciones NO recomendarías una arquitectura serverless? Justifica tu respuesta.",
        options: [
            "Procesos que ejecutan continuamente o tienen alta persistencia en memoria",
            "Aplicaciones web estáticas simples",
            "Sistemas con tráfico variable",
            "Prototipos y proyectos pequeños",
            "APIs con endpoints simples"
        ],
        correctAnswer: 0
    },
    {
        text: "Si una función serverless no puede mantener estado, ¿cómo diseñarías un carrito de compras para una aplicación web usando este paradigma?",
        options: [
            "Usando base de datos externa o almacenamiento para persistir el estado",
            "Almacenando en variables globales de la función",
            "Usando cookies del lado del servidor",
            "No es posible implementar carritos en serverless",
            "Manteniendo el estado en memoria entre ejecuciones"
        ],
        correctAnswer: 0
    },
    {
        text: "Analiza las implicancias de la 'Dependencia del proveedor de nube'. ¿Qué riesgos conlleva y cómo se podrían mitigar?",
        options: [
            "Vendor lock-in; mitigar con diseño multi-cloud o abstracciones",
            "Sin riesgos; no requiere mitigación",
            "Mayor costo fijo; mitigar con contratos largos",
            "Menor seguridad; mitigar con más autenticación",
            "Rendimiento inferior; mitigar con más recursos"
        ],
        correctAnswer: 0
    },
    {
        text: "Imagina que tienes una función que procesa imágenes y tarda 10 minutos en ejecutarse. ¿Es serverless una buena opción? ¿Por qué?",
        options: [
            "No, por límites de timeout de ejecución en funciones serverless",
            "Sí, porque serverless no tiene límites de tiempo",
            "Sí, porque es más barato sin importar el tiempo",
            "No, porque serverless solo funciona con JavaScript",
            "Sí, porque tiene mejor rendimiento para procesos largos"
        ],
        correctAnswer: 0
    },
    {
        text: "Sintetiza las razones por las cuales el paradigma serverless está íntimamente ligado al concepto de stateless.",
        options: [
            "Las funciones son efímeras, se destruyen después de ejecutar, permitiendo escalabilidad",
            "Las funciones mantienen estado permanente para mejor performance",
            "Stateless significa sin servidores, igual que serverless",
            "Ambos conceptos se refieren a falta de base de datos",
            "Serverless requiere estado para funcionar correctamente"
        ],
        correctAnswer: 0
    },
    {
        text: "Evalúa: ¿Crees que las arquitecturas serverless representan el futuro del desarrollo de software o son una moda pasajera? Argumenta a favor o en contra.",
        options: [
            "Representan el futuro para muchos casos por eficiencia de costos y escalabilidad automática",
            "Son una moda pasajera que pronto será reemplazada",
            "Solo sirven para proyectos pequeños sin importancia",
            "No tienen ventajas sobre modelos tradicionales",
            "Son el único modelo válido para todo tipo de aplicaciones"
        ],
        correctAnswer: 0
    },
    {
        text: "Diseña a alto nivel una aplicación simple (ej: un acortador de URLs) utilizando funciones serverless. Describe qué funciones necesitarías y qué servicios externos usarías para manejar el estado.",
        options: [
            "Función para acortar URL, función para redirigir; base de datos para almacenar mappings",
            "Una sola función que todo lo hace en memoria",
            "Solo frontend sin funciones serverless",
            "Usando variables globales para almacenar URLs",
            "Sin necesidad de servicios externos"
        ],
        correctAnswer: 0
    },
    {
        text: "Según la analogía presentada, ¿a qué se compara una API?",
        options: [
            "Al cocinero de un restaurante",
            "Al mozo de un restaurante",
            "Al dueño del restaurante",
            "Al menú del restaurante",
            "A la cocina del restaurante"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué protocolo garantiza que los mensajes HTTP lleguen completos y en orden?",
        options: [
            "TLS",
            "UDP",
            "TCP",
            "SSL",
            "HTTP/2"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué característica fundamental tiene HTTP como protocolo?",
        options: [
            "Es stateful (mantiene estado)",
            "Es stateless (sin estado)",
            "Solo funciona con conexiones seguras",
            "No permite métodos diferentes a GET y POST",
            "Requiere autenticación obligatoria"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué método HTTP se utiliza para crear un nuevo recurso?",
        options: [
            "GET",
            "PUT",
            "POST",
            "PATCH",
            "DELETE"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué código HTTP indica que un recurso fue creado exitosamente?",
        options: [
            "200 OK",
            "201 Created",
            "204 No Content",
            "400 Bad Request",
            "404 Not Found"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué código HTTP se debe usar cuando un usuario no tiene permisos para acceder a un recurso?",
        options: [
            "400 Bad Request",
            "401 Unauthorized",
            "403 Forbidden",
            "404 Not Found",
            "409 Conflict"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué representa el código de estado HTTP 422?",
        options: [
            "Error de sintaxis en la solicitud",
            "Falta de autenticación",
            "Recurso no encontrado",
            "Datos válidos sintácticamente pero que violan una regla de negocio",
            "Error interno del servidor"
        ],
        correctAnswer: 3
    },
    {
        text: "¿Qué header HTTP se utiliza para indicar el formato del cuerpo de la respuesta?",
        options: [
            "Authorization",
            "Content-Type",
            "Accept",
            "Cache-Control",
            "User-Agent"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué header HTTP se utiliza para autenticación con tokens Bearer?",
        options: [
            "Content-Type",
            "Accept",
            "Authorization",
            "Cache-Control",
            "Retry-After"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué estándar propone un formato común para respuestas de error en APIs?",
        options: [
            "RFC 7231",
            "RFC 7807",
            "RFC 6749",
            "RFC 8259",
            "RFC 2616"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Cuál es el propósito principal del middleware de errores en Express?",
        options: [
            "Optimizar el rendimiento de la API",
            "Convertir excepciones en respuestas HTTP coherentes y estructuradas",
            "Generar documentación automática",
            "Validar esquemas de entrada",
            "Autenticar usuarios automáticamente"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué principio de REST se refiere a que cada solicitud debe contener toda la información necesaria?",
        options: [
            "Interface uniforme",
            "Stateless",
            "Sistema en capas",
            "Código bajo demanda",
            "Cacheable"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué método HTTP se utiliza para modificar parcialmente un recurso existente?",
        options: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
        ],
        correctAnswer: 3
    },
    {
        text: "¿Qué código HTTP indica éxito sin cuerpo de respuesta?",
        options: [
            "200 OK",
            "201 Created",
            "202 Accepted",
            "204 No Content",
            "206 Partial Content"
        ],
        correctAnswer: 3
    },
    {
        text: "¿Qué característica define a una API REST según el texto?",
        options: [
            "Usa únicamente el método POST",
            "Es stateful por naturaleza",
            "Representa recursos con URLs y métodos HTTP",
            "Solo devuelve respuestas en formato XML",
            "Requere conexiones WebSocket"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué header HTTP controla el almacenamiento en caché?",
        options: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Retry-After",
            "Accept"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué principio ético es importante en el diseño de APIs según el cierre conceptual?",
        options: [
            "Ocultar los errores para no preocupar al usuario",
            "Usar la menor documentación posible",
            "Comunicar con claridad y transparencia",
            "Priorizar la velocidad sobre la claridad",
            "Minimizar la cantidad de endpoints"
        ],
        correctAnswer: 2
    },
    {
        text: "¿Qué código HTTP indica un conflicto de estado, como dos actualizaciones simultáneas?",
        options: [
            "400 Bad Request",
            "401 Unauthorized",
            "403 Forbidden",
            "409 Conflict",
            "422 Unprocessable Entity"
        ],
        correctAnswer: 3
    },
    {
        text: "¿Qué incluye una solicitud HTTP según el texto?",
        options: [
            "Solo el método y la URL",
            "Método, URL, encabezados y cuerpo opcional",
            "Solo el cuerpo con los datos",
            "Únicamente los encabezados de autenticación",
            "Solo el código de estado"
        ],
        correctAnswer: 1
    },
    {
        text: "¿Qué objetivo principal debe tener una API según la introducción?",
        options: [
            "Ser la más rápida posible",
            "Usar la menor cantidad de recursos",
            "Ser clara, intuitiva y robusta",
            "Tener la mayor cantidad de endpoints",
            "Usar tecnologías de última generación"
        ],
        correctAnswer: 2
    }
];

// Iniciar examen
startExamBtn.addEventListener('click', () => {
    // Seleccionar 20 preguntas aleatorias del banco
    examQuestions = getRandomQuestions(questionBank, 20);
    
    // Inicializar respuestas del usuario
    userAnswers = new Array(examQuestions.length).fill(null);
    
    // Mostrar sección del examen
    startSection.classList.add('hidden');
    examSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    
    // Iniciar temporizador
    startTime = new Date();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    
    // Mostrar primera pregunta
    currentQuestionIndex = 0;
    displayQuestion();
});

// Navegación entre preguntas
prevQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

nextQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

// Finalizar examen
finishExamBtn.addEventListener('click', () => {
    const unanswered = userAnswers.filter(answer => answer === null).length;
    if (unanswered > 0) {
        if (!confirm(`Tienes ${unanswered} pregunta(s) sin responder. ¿Estás seguro de que quieres finalizar el examen?`)) {
            return;
        }
    }
    
    finishExam();
});

// Reiniciar examen
restartExamBtn.addEventListener('click', () => {
    startSection.classList.remove('hidden');
    examSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    clearInterval(timerInterval);
});

// Revisar respuestas
reviewAnswersBtn.addEventListener('click', () => {
    examSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    currentQuestionIndex = 0;
    displayQuestion(true);
});

// Función para obtener preguntas aleatorias
function getRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Función para mostrar la pregunta actual
function displayQuestion(reviewMode = false) {
    questionsContainer.innerHTML = '';
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${examQuestions.length}`;
    
    const question = examQuestions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.className = 'question-container';
    
    const questionHeader = document.createElement('div');
    questionHeader.className = 'question-header';
    
    const questionNumber = document.createElement('div');
    questionNumber.className = 'question-number';
    questionNumber.textContent = currentQuestionIndex + 1;
    questionHeader.appendChild(questionNumber);
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = question.text;
    questionHeader.appendChild(questionText);
    
    questionElement.appendChild(questionHeader);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    const optionLetters = ['A', 'B', 'C', 'D', 'E'];
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        if (reviewMode) {
            if (index === question.correctAnswer) {
                optionElement.classList.add('correct');
            } else if (userAnswers[currentQuestionIndex] === index && index !== question.correctAnswer) {
                optionElement.classList.add('incorrect');
            }
        }
        
        const optionLetter = document.createElement('div');
        optionLetter.className = 'option-letter';
        optionLetter.textContent = optionLetters[index];
        optionElement.appendChild(optionLetter);
        
        const optionText = document.createElement('div');
        optionText.textContent = option;
        optionElement.appendChild(optionText);
        
        if (!reviewMode) {
            optionElement.addEventListener('click', () => {
                // Deseleccionar todas las opciones
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Seleccionar la opción clickeada
                optionElement.classList.add('selected');
                
                // Guardar respuesta del usuario
                userAnswers[currentQuestionIndex] = index;
                
                // Actualizar barra de progreso
                updateProgressBar();
            });
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    questionElement.appendChild(optionsContainer);
    questionsContainer.appendChild(questionElement);
    
    // Actualizar estado de los botones de navegación
    prevQuestionBtn.disabled = currentQuestionIndex === 0;
    nextQuestionBtn.disabled = currentQuestionIndex === examQuestions.length - 1;
    
    // En modo revisión, cambiar el texto del botón
    if (reviewMode) {
        finishExamBtn.textContent = 'Volver a Resultados';
        finishExamBtn.addEventListener('click', () => {
            examSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
        });
    } else {
        finishExamBtn.textContent = 'Finalizar Examen';
        finishExamBtn.addEventListener('click', finishExam);
    }
}

// Función para finalizar el examen y mostrar resultados
function finishExam() {
    clearInterval(timerInterval);
    
    // Calcular puntuación
    let correctAnswers = 0;
    examQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            correctAnswers++;
        }
    });
    
    const score = correctAnswers;
    const total = examQuestions.length;
    const percentage = ((score / total) * 100).toFixed(1);
    
    // Calcular tiempo empleado
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Determinar mensaje basado en la puntuación
    let message = "";
    if (percentage >= 90) {
        message = "¡Excelente! Dominas completamente los temas de Testing Unitario y APIs.";
    } else if (percentage >= 70) {
        message = "¡Buen trabajo! Tienes un buen conocimiento de los temas.";
    } else if (percentage >= 50) {
        message = "Aprobado. Considera repasar algunos conceptos de las unidades.";
    } else {
        message = "Necesitas estudiar más los temas de Testing Unitario y APIs.";
    }
    
    // Mostrar resultados
    scoreElement.textContent = `${score}/${total}`;
    percentageElement.textContent = `${percentage}%`;
    timeTakenElement.textContent = `Tiempo empleado: ${timeString}`;
    resultMessage.textContent = message;
    
    // Cambiar a sección de resultados
    examSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

// Función para actualizar el temporizador
function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerElement.textContent = `Tiempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Función para actualizar la barra de progreso
function updateProgressBar() {
    const answered = userAnswers.filter(answer => answer !== null).length;
    const progress = (answered / examQuestions.length) * 100;
    progressElement.style.width = `${progress}%`;
}