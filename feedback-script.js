document.addEventListener('DOMContentLoaded', () => {
    
    // --- COLE A NOVA URL DO SEU SCRIPT DO GOOGLE AQUI ---
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9KO-O6gg7CMgCs_VAKGPTtkKHUXV5QbIsuxTS-Q4J2u2DprDIdvjKAc8v_LlVNHBnRg/exec';
    
    const form = document.getElementById('feedback-form');
    const statusMessage = document.getElementById('status-message');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitButton.disabled = true;
        statusMessage.textContent = 'Enviando seu feedback...';
        statusMessage.className = 'status-message sending';

        const formData = new FormData(form);

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                document.getElementById('form-screen').classList.remove('active-screen');
                document.getElementById('thank-you-screen').classList.add('active-screen');
            } else {
                throw new Error(data.error || 'Erro desconhecido');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.textContent = 'Ocorreu uma falha no envio. Por favor, verifique sua conexão e tente novamente.';
            statusMessage.className = 'status-message error';
            submitButton.disabled = false;
        });
    });
});
