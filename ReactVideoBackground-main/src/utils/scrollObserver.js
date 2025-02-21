const scrollObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const scrollElements = document.querySelectorAll('.scroll-fade');
    scrollElements.forEach((el) => observer.observe(el));
};

export default scrollObserver;