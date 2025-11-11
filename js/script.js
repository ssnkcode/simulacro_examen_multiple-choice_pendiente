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
        
        // Banco de preguntas basado en los textos proporcionados
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
            
            const optionLetters = ['A', 'B', 'C', 'D'];
            
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