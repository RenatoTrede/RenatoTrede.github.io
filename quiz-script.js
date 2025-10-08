document.addEventListener('DOMContentLoaded', () => {
    
    // --- PASSO 1: COLE A NOVA URL DO SEU SCRIPT DO GOOGLE AQUI ---
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5OGvyXtx-PB5RHkSWaU1nkA10jR5bHNGlcgt5-Zh4OJW4qqUr6LZhIBSgvZUn3mJp/exec';
    
    
    // --- PASSO 2: TODO O CONTEÚDO DO QUIZ ---
    const quizData = [
        {
            question: "De acordo com o material, qual é a melhor analogia para a relação entre Inteligência Artificial (IA), Machine Learning (ML) e Deep Learning (DL)?",
            options: [
                "IA, ML e DL são três campos completamente separados, mas que colaboram entre si.",
                "São como bonecas russas: a IA é a maior, contendo o ML, que por sua vez contém o DL.",
                "São sinônimos para a mesma tecnologia, mas usados em contextos diferentes.",
                "IA é a teoria, ML é a aplicação prática e DL é a análise de dados."
            ],
            correct: 1, // Índice da resposta correta (começa em 0)
            feedback: [
                "Incorreto. Esta opção contradiz a ideia de hierarquia apresentada no texto, que mostra uma relação de inclusão entre os campos.",
                "Correto! Esta analogia representa perfeitamente a relação hierárquica e de subconjunto descrita no documento.",
                "Incorreto. O texto deixa claro que, embora relacionados, os termos definem escopos diferentes e não são intercambiáveis.",
                "Incorreto. Embora tenha uma lógica aparente, esta opção não descreve a relação de subcampo que o material enfatiza."
            ]
        },
        {
            question: "O que diferencia o Machine Learning (ML) da programação tradicional, segundo a explicação do PDF?",
            options: [
                "O ML utiliza linguagens de programação mais modernas e eficientes.",
                "Na programação tradicional criamos regras, enquanto no ML a máquina 'aprende' as regras a partir dos dados.",
                "O ML é exclusivo para análise de imagens e textos, enquanto a programação tradicional é para cálculos.",
                "A programação tradicional não precisa de dados para funcionar, enquanto o ML sim."
            ],
            correct: 1,
            feedback: [
                "Incorreto. A diferença fundamental não está na linguagem utilizada, mas na forma como a lógica é desenvolvida.",
                "Correto! Esta opção captura a essência da mudança de paradigma: de regras explícitas para o aprendizado baseado em exemplos (dados).",
                "Incorreto. O ML é aplicado em muitas outras áreas além de imagens e textos.",
                "Incorreto. Muitos programas tradicionais também processam e dependem de dados para funcionar."
            ]
        },
        {
            question: "Qual é a principal capacidade de um Grande Modelo de Linguagem (LLM), como o GPT ou Gemini?",
            options: [
                "Realizar cálculos matemáticos complexos com precisão absoluta.",
                "Armazenar grandes volumes de arquivos como um banco de dados.",
                "Processar, entender e gerar texto de forma coerente e contextual.",
                "Navegar na internet em tempo real para encontrar informações novas."
            ],
            correct: 2,
            feedback: [
                "Incorreto. Embora possam realizar cálculos, a principal força dos LLMs reside na manipulação de linguagem.",
                "Incorreto. LLMs não são sistemas de armazenamento de arquivos; eles processam informações.",
                "Correto! Esta é a definição central da função de um LLM, sua habilidade de trabalhar com a linguagem humana.",
                "Incorreto. Muitos LLMs têm conhecimento limitado a uma data de corte, embora possam ser integrados a sistemas de busca."
            ]
        },
        {
            question: "A capacidade da IA de criar uma imagem a partir de uma descrição em texto é um exemplo de:",
            options: [
                "Machine Learning tradicional",
                "Deep Learning",
                "Engenharia de Prompt",
                "IA Generativa"
            ],
            correct: 3,
            feedback: [
                "Incorreto. Embora use técnicas de ML, a criação de um conteúdo totalmente novo é a marca de um tipo específico de IA.",
                "Incorreto. Deep Learning é a tecnologia subjacente, mas o termo que descreve a capacidade de 'criar' algo novo é mais específico.",
                "Incorreto. A Engenharia de Prompt é o processo de escrever a descrição, não o nome da capacidade da IA.",
                "Correto! Conforme o texto, a IA Generativa é exatamente a capacidade de gerar novos conteúdos, como imagens."
            ]
        },
        {
            question: "O que é 'Engenharia de Prompt'?",
            options: [
                "A programação do modelo de IA para entender novas linguagens.",
                "A habilidade de formular instruções claras e eficazes para guiar a IA a um resultado desejado.",
                "Um campo da engenharia focado em construir o hardware onde a IA executa.",
                "A análise automática que a IA faz para corrigir um prompt mal formulado."
            ],
            correct: 1,
            feedback: [
                "Incorreto. A Engenharia de Prompt não envolve a programação do modelo em si, mas sim a forma como interagimos com ele.",
                "Correto! Esta definição corresponde à analogia do 'briefing bem-feito para um assistente'.",
                "Incorreto. A Engenharia de Prompt é uma habilidade de 'software' (interação), não de hardware.",
                "Incorreto. A responsabilidade de criar um bom prompt é do usuário, não uma função automática da IA."
            ]
        },
        {
            question: "Um sistema de IA que recebe o objetivo 'encontre os 5 artigos mais relevantes sobre meu tema, resuma-os e me envie por e-mail' estaria atuando como um:",
            options: [
                "Grande Modelo de Linguagem (LLM)",
                "Agente de IA",
                "Sistema de Deep Learning",
                "Programa de Vibe Coding"
            ],
            correct: 1,
            feedback: [
                "Incorreto. Um LLM seria parte do sistema, mas o conceito que descreve a execução de múltiplos passos é outro.",
                "Correto! O texto descreve Agentes de IA como sistemas que executam tarefas complexas com múltiplos passos para atingir um objetivo.",
                "Incorreto. Deep Learning é a tecnologia, não o conceito funcional descrito.",
                "Incorreto. Vibe Coding é a forma como o usuário poderia criar o sistema, não o sistema em si."
            ]
        },
        {
            question: "O conceito de 'Vibe Coding' é mais útil para um pesquisador que deseja:",
            options: [
                "Criar um novo modelo de Inteligência Artificial do zero.",
                "Escrever a introdução de seu artigo de forma mais eloquente.",
                "Gerar um script para análise estatística de seus dados usando linguagem natural.",
                "Organizar seus arquivos e referências bibliográficas automaticamente."
            ],
            correct: 2,
            feedback: [
                "Incorreto. A criação de um modelo do zero exige conhecimento técnico profundo em programação.",
                "Incorreto. Para a escrita de textos, a Engenharia de Prompt é mais diretamente aplicável.",
                "Correto! O PDF define Vibe Coding exatamente como a capacidade de 'programar conversando' para gerar scripts.",
                "Incorreto. Para essa tarefa, um Agente de IA seria mais adequado."
            ]
        },
        {
            question: "Qual das seguintes afirmações está CORRETA, com base na hierarquia de conceitos do PDF?",
            options: [
                "Todo sistema de IA utiliza Deep Learning.",
                "Machine Learning é um tipo de Deep Learning.",
                "Todo sistema de Deep Learning é também um sistema de Machine Learning.",
                "IA Generativa e Machine Learning são conceitos independentes."
            ],
            correct: 2,
            feedback: [
                "Incorreto. Existem muitas aplicações de IA que não usam DL.",
                "Incorreto. Esta opção inverte a hierarquia. O Deep Learning é que é um tipo de Machine Learning.",
                "Correto! Como DL é um subconjunto de ML, esta afirmação está correta.",
                "Incorreto. A IA Generativa é construída sobre fundações de Machine Learning."
            ]
        },
        {
            question: "O objetivo principal do material preparatório, segundo a introdução e conclusão, é:",
            options: [
                "Capacitar o aluno a programar seus próprios modelos de IA.",
                "Prover uma base teórica para que o aluno se torne um usuário informado e crítico de IA.",
                "Apresentar um histórico completo da evolução da Inteligência Artificial.",
                "Comparar as diferentes ferramentas de IA do mercado."
            ],
            correct: 1,
            feedback: [
                "Incorreto. O foco do material não é a programação de modelos, mas sim o uso estratégico de ferramentas.",
                "Correto! O texto enfatiza a importância de entender os conceitos para transformar a teoria em habilidades práticas.",
                "Incorreto. O material foca em conceitos atuais e relevantes, não no histórico.",
                "Incorreto. O foco do texto é nos conceitos, e não em uma análise comparativa de produtos."
            ]
        },
        {
            question: "Um pesquisador que descreve detalhadamente o estilo de escrita e a estrutura desejada para um resumo que pede a um LLM está aplicando principalmente qual conceito?",
            options: [
                "Deep Learning",
                "Vibe Coding",
                "Agente de IA",
                "Engenharia de Prompt"
            ],
            correct: 3,
            feedback: [
                "Incorreto. O pesquisador está usando um sistema baseado em Deep Learning, mas a ação que ele está realizando tem um nome específico.",
                "Incorreto. Vibe Coding está mais associado à geração de código, não à formatação de texto.",
                "Incorreto. A tarefa é um comando único e detalhado, não um objetivo que exige múltiplos passos autônomos.",
                "Correto! A ação de detalhar e refinar as instruções é a definição exata de Engenharia de Prompt."
            ]
        }
    ];

    // --- PASSO 3: LÓGICA DO QUIZ (não precisa mexer aqui) ---
    
    // Variáveis de estado
    let currentQuestionIndex = 0;
    let score = 0;
    let studentName = '';
    let answerSelected = false;

    // Elementos da página
    const nameScreen = document.getElementById('name-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const nameForm = document.getElementById('name-form');
    const nameInput = document.getElementById('nome_discente');
    
    const questionCounter = document.getElementById('question-counter');
    const scoreCounter = document.getElementById('score-counter');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const feedbackArea = document.getElementById('feedback-area');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    // Iniciar o quiz após preencher o nome
    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        studentName = nameInput.value.trim();
        if (studentName) {
            nameScreen.classList.remove('active-screen');
            quizScreen.classList.add('active-screen');
            loadQuestion();
        }
    });

    // Carregar uma questão
    function loadQuestion() {
        answerSelected = false;
        feedbackArea.innerHTML = '';
        feedbackArea.className = 'hidden';
        nextQuestionBtn.classList.add('hidden');

        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        answerOptions.innerHTML = '';
        
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.index = index;
            button.addEventListener('click', selectAnswer);
            answerOptions.appendChild(button);
        });
        
        updateHeader();
    }

    // Processar a seleção de uma resposta
    function selectAnswer(e) {
        if (answerSelected) return;
        answerSelected = true;

        const selectedButton = e.target;
        const selectedIndex = parseInt(selectedButton.dataset.index);
        const currentQuestion = quizData[currentQuestionIndex];
        
        const isCorrect = selectedIndex === currentQuestion.correct;
        
        if (isCorrect) {
            score++;
            selectedButton.classList.add('correct');
            feedbackArea.className = 'feedback-area correct';
        } else {
            selectedButton.classList.add('incorrect');
            feedbackArea.className = 'feedback-area incorrect';
        }
        
        feedbackArea.innerHTML = currentQuestion.feedback[selectedIndex];

        // Desabilitar todos os botões e destacar o correto
        Array.from(answerOptions.children).forEach((button, index) => {
            button.disabled = true;
            if (index === currentQuestion.correct) {
                button.classList.add('correct');
            }
        });

        nextQuestionBtn.classList.remove('hidden');
        updateHeader();
    }
    
    // Atualizar cabeçalho e barra de progresso
    function updateHeader() {
        questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
        scoreCounter.textContent = `Pontuação: ${score}`;
        progressBar.style.width = `${((currentQuestionIndex) / quizData.length) * 100}%`;
    }

    // Ir para a próxima questão ou finalizar
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });
    
    // Mostrar resultados finais
    function showResults() {
        quizScreen.classList.remove('active-screen');
        resultScreen.classList.add('active-screen');
        
        const percentage = Math.round((score / quizData.length) * 100);
        
        document.getElementById('result-text').textContent = `${studentName}, sua pontuação final é:`;
        document.getElementById('final-score').textContent = `${score} de ${quizData.length} (${percentage}%)`;
        
        submitScore();
    }
    
    // Enviar pontuação para a planilha
    function submitScore() {
        const submittingText = document.getElementById('submitting-text');
        submittingText.classList.remove('hidden');

        const formData = new FormData();
        formData.append('nome', studentName);
        formData.append('pontuacao', `${score} de ${quizData.length}`);

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                submittingText.textContent = 'Resultado salvo com sucesso!';
            } else {
                throw new Error(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submittingText.textContent = 'Erro ao salvar o resultado. Tente novamente.';
        });
    }

});
