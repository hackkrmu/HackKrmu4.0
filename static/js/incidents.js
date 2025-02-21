document.addEventListener('DOMContentLoaded', function () {
  const showMoreLinks = document.querySelectorAll('.show-more-link');

  showMoreLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault();
          const evidenceId = this.getAttribute('data-evidence-id');
          window.location.href = `/evidence/${evidenceId}`;
      });
  });
});
