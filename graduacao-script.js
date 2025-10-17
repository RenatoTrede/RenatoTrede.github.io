document.addEventListener('DOMContentLoaded', () => {
    
    // --- COLE A NOVA URL DO SEU SCRIPT DO GOOGLE AQUI ---
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwisQ6ziOrYlJ_G1WIPhejBG4YQfia0ecUb-SIhRnD1nLdlIodAhflHug22d6KETPKg/exec';

    const form = document.getElementById('survey-form');
    const slides = document.querySelectorAll('.question-slide');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const loadingDiv = document.getElementById('loading');
    const navigationDiv = document.getElementById('navigation');
    const errorDiv = document.getElementById('error-message');

    let currentSlide = 0;
    const totalSlides = slides.length - 1; // Exclui a tela de agradecimento

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
        if (currentSlide === 1) { // Validação do campo de nome
            const nameInput = document.getElementById('nome_discente');
            if (nameInput.value.trim() === '') {
                alert('Por favor, preencha seu nome para continuar.');
                return; 
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
        
        errorDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        navigationDiv.classList.add('hidden');

        const formData = new FormData(form);
        
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        const checkboxData = {};
        checkboxes.forEach(cb => {
            if (!checkboxData[cb.name]) checkboxData[cb.name] = [];
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
        .catch(error => {
            console.error('Error:', error);
            errorDiv.textContent = 'Ocorreu uma falha no envio. Por favor, verifique sua conexão e tente clicar em "Enviar" novamente.';
            errorDiv.classList.remove('hidden');
            loadingDiv.classList.add('hidden');
            navigationDiv.classList.remove('hidden');
        });
    });

    updateNav();
});
