document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slide = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.arrow.prev');
    const nextArrow = document.querySelector('.arrow.next');
    const slideMargin = 10; // Ajusta según el margen agregado en CSS
    let currentIndex = 0; // Empezar desde el primer slide

    const updateSlides = function() {
        const slideWidth = slide[0].clientWidth + slideMargin * 2; // Considerar el margen en ambos lados del slide
        slides.style.transition = 'none'; // Desactivar la transición al principio
        slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

        // Remover la clase 'big' de todos los slides
        slide.forEach(s => s.classList.remove('big'));

        // Calcular el centro del viewport
        const viewportCenterX = window.innerWidth / 2;

        // Encontrar el slide más cercano al centro del viewport
        let closestSlideIndex = 0;
        let minDistance = Infinity;
        slide.forEach((s, index) => {
            const rect = s.getBoundingClientRect();
            const slideCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(viewportCenterX - slideCenterX);
            if (distance < minDistance) {
                minDistance = distance;
                closestSlideIndex = index;
            }
        });

        // Agregar la clase 'big' al slide más cercano al centro del viewport
        slide[closestSlideIndex].classList.add('big');

        // Reactivar la transición después de un breve retraso para evitar el desplazamiento no deseado
        setTimeout(() => {
            slides.style.transition = 'transform 0.5s ease-in-out';
        }, 100);
    };

    const prevSlide = function() {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlides();
    };

    const nextSlide = function() {
        currentIndex = Math.min(currentIndex + 1, slide.length - 1);
        updateSlides();
    };

    prevArrow.addEventListener('click', prevSlide);
    nextArrow.addEventListener('click', nextSlide);

    // Llamar a updateSlides para configurar el estado inicial
    updateSlides();
});