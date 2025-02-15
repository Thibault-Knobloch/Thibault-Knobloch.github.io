document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all project elements
    document.querySelectorAll('.project').forEach(project => {
        observer.observe(project);
    });

    // Modal functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalTechnologies = modal.querySelector('.modal-technologies');
    const modalImpact = modal.querySelector('.modal-impact');
    const closeButton = modal.querySelector('.modal-close');

    // Open modal when clicking a project
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('click', () => {
            const projectId = project.dataset.projectId;
            const data = projectData[projectId];
            
            // Populate modal with project data
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            
            // Populate technologies
            modalTechnologies.innerHTML = data.technologies
                .map(tech => `<li>${tech}</li>`)
                .join('');
            
            // Populate impact
            modalImpact.innerHTML = data.impact
                .map(impact => `<li>${impact}</li>`)
                .join('');
            
            // Show modal
            modal.style.display = 'flex';
            modal.offsetHeight; // Force reflow
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking close button or outside
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300); // Match transition duration
    }
}); 