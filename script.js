document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: A sua URL já está correta aqui.
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzFzkgqHiDpeSWEQIdrQmEnQ4ItI_wcqBe7AOsV_9iHtIDsEAkQA83LlguaRkYQ8zkoTw/exec';

    const form = document.getElementById('survey-form');
    const slides = document.querySelectorAll('.question-slide');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const loadingDiv = document.getElementById('loading');
    const navigationDiv = document.getElementById('navigation');

    let currentSlide = 0;
    const totalSlides = slides.length - 1; // Exclui a tela de agradecimento

    function updateNav() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active-slide', index === currentSlide);
        });

        // --- INÍCIO DA CORREÇÃO ---
        // Lógica de navegação corrigida para mostrar/esconder botões
        if (currentSlide === 0) {
            // Tela de boas-vindas
            backBtn.classList.add('hidden');
            submitBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            nextBtn.textContent = 'Começar'; // Melhora a experiência do usuário
        } else if (currentSlide === totalSlides - 1) {
            // Última pergunta
            backBtn.classList.remove('hidden');
            submitBtn.classList.remove('hidden');
            nextBtn.classList.add('hidden');
        } else if (currentSlide >= totalSlides) {
            // Tela de agradecimento (esconde tudo)
            navigationDiv.classList.add('hidden');
        } else {
            // Telas de perguntas intermediárias
            backBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            nextBtn.textContent = 'Avançar';
        }
        // --- FIM DA CORREÇÃO ---
        
        const progress = currentSlide === 0 ? 0 : ((currentSlide) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    nextBtn.addEventListener('click', () => {
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
        
        loadingDiv.classList.remove('hidden');
        navigationDiv.classList.add('hidden');

        const formData = new FormData(form);
        
        // Coletar dados de checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        const checkboxData = {};
        checkboxes.forEach(cb => {
            if (!checkboxData[cb.name]) {
                checkboxData[cb.name] = [];
            }
            checkboxData[cb.name].push(cb.value);
        });

        // Juntar dados de checkboxes com o resto
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
                currentSlide = totalSlides; // Vai para a tela de agradecimento
                updateNav();
                loadingDiv.classList.add('hidden');
            } else {
                throw new Error(result.error || 'Erro desconhecido');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocorreu um erro ao enviar suas respostas. Por favor, tente novamente.');
            loadingDiv.classList.add('hidden');
            navigationDiv.classList.remove('hidden');
        });
    });

    // Inicializa a navegação
    updateNav();
});
