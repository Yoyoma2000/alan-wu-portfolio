// ── Email copy-to-clipboard ────────────────────────────
const emailBtn = document.querySelector('.contact-email-btn');
if (emailBtn) {
  const label = emailBtn.querySelector('.email-btn-label');
  const original = label.textContent;
  let resetTimer;

  emailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailBtn.dataset.email).then(() => {
      label.textContent = 'Copied!';
      emailBtn.classList.add('copied');
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        label.textContent = original;
        emailBtn.classList.remove('copied');
      }, 2000);
    });
  });
}
