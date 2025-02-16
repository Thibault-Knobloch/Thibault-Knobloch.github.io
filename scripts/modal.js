// Get all projects and their corresponding modals
document.querySelectorAll('.project').forEach(project => {
    const projectId = project.dataset.projectId;
    const modal = document.getElementById(`modal-${projectId}`);
    const closeButton = modal.querySelector('.modal-close');

    // Open modal on project click
    project.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

function initializeImageSlider(images) {
    const sliderContainer = document.querySelector('.slider-container');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create image elements
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Slide ${index + 1}`;
        img.className = 'slider-image';
        sliderContainer.appendChild(img);

        // Create dot
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Navigation functions
    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % images.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateSlider();
    }

    // Add event listeners for navigation
    const nextButton = document.querySelector('.slider-next');
    const prevButton = document.querySelector('.slider-prev');
    
    // Remove existing event listeners (if any)
    nextButton.replaceWith(nextButton.cloneNode(true));
    prevButton.replaceWith(prevButton.cloneNode(true));
    
    // Add new event listeners
    document.querySelector('.slider-next').addEventListener('click', nextSlide);
    document.querySelector('.slider-prev').addEventListener('click', prevSlide);
}