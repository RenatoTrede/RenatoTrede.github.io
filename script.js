document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: Cole a URL do seu script do Google Apps aqui
    const GOOGLE_SCRIPT_URL = 'URL_DO_SEU_SCRIPT_AQUI';

    const form = document.getElementById('survey-form');
    const slides = document.querySelectorAll('.question-slide');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const loadingDiv = document.getElementById('loading');
    const navigationDiv = document.getElementById('navigation');
    const errorDiv = document.getElementById('error-message'); // <-- NOVO: Pega a div de erro

    let currentSlide = 0;
    const totalSlides = slides.length - 1; 

    function updateNav() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active-slide', index === currentSlide);
        });

        if (currentSlide === 0) {
            backBtn.classList.add('hidden');
            submitBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            nextBtn.textContent = 'Começar';
        } else if (currentSlide === totalSlides - 1) {
            backBtn.classList.remove('hidden');
            submitBtn.classList.remove('hidden');
            nextBtn.classList.add('hidden');
        } else if (currentSlide >= totalSlides) {
            navigationDiv.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            nextBtn.textContent = 'Avançar';
        }
        
        const progress = currentSlide === 0 ? 0 : ((currentSlide) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    nextBtn.addEventListener('click', () => {
        // Validação para campo de nome obrigatório
        if (currentSlide === 1) {
            const nameInput = document.getElementById('nome_discente');
            if (nameInput.value.trim() === '') {
                alert('Por favor, preencha seu nome para continuar.');
                return; // Impede de avançar
            }
        }
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateNav();
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateNav();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // --- NOVO: Esconde a mensagem de erro antiga antes de um novo envio ---
        errorDiv.classList.add('hidden');
        
        loadingDiv.classList.remove('hidden');
        navigationDiv.classList.add('hidden');

        const formData = new FormData(form);
        
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        const checkboxData = {};
        checkboxes.forEach(cb => {
            if (!checkboxData[cb.name]) {
                checkboxData[cb.name] = [];
            }
            checkboxData[cb.name].push(cb.value);
        });

        for (let key in checkboxData) {
            formData.append(key, checkboxData[key].join(', '));
        }
        
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(result => {
            if(result.result === "success"){
                currentSlide = totalSlides;
                updateNav();
                loadingDiv.classList.add('hidden');
            } else {
                throw new Error(result.error || 'Erro desconhecido');
            }
        })
        // --- NOVO: Lógica de erro aprimorada ---
        .catch(error => {
            console.error('Error:', error);
            // Melhora da frase que você pediu e exibição na tela
            errorDiv.textContent = 'Ocorreu uma falha no envio. Por favor, verifique sua conexão e tente clicar em "Enviar" novamente.';
            errorDiv.classList.remove('hidden'); // Mostra a div de erro
            
            loadingDiv.classList.add('hidden'); // Esconde o "Enviando..."
            navigationDiv.classList.remove('hidden'); // Mostra os botões novamente para o usuário tentar de novo
        });
    });

    // Inicializa a navegação
    updateNav();
});
