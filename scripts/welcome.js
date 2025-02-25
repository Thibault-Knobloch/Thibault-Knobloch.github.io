document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('.welcome h1');
    const input = document.querySelector('.welcome .name-input');
    const hasKeyboard = window.matchMedia('(pointer:fine)').matches;

    // Check if it's not a mobile device and has a keyboard
    const isDesktop = hasKeyboard && !(/Mobi|Android/i.test(navigator.userAgent));

    h1.addEventListener('animationend', (e) => {
        if (e.animationName === 'typing' && isDesktop) {
            h1.classList.add('typing-done');
            setTimeout(() => {
                h1.style.display = 'none';
                input.style.display = 'inline-block';
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }, 500); // Small delay after animation ends
        } else if (e.animationName === 'typing') {
            h1.classList.add('typing-done');
        }
    });

    // Sync input width with content
    input.addEventListener('input', () => {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.font = getComputedStyle(input).font;
        tempSpan.textContent = input.value;
        document.body.appendChild(tempSpan);
        input.style.width = `${tempSpan.offsetWidth}px`;
        document.body.removeChild(tempSpan);
    });

    // Initial width setting
    if (isDesktop) {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.font = getComputedStyle(input).font;
        tempSpan.textContent = input.value;
        document.body.appendChild(tempSpan);
        input.style.width = `${tempSpan.offsetWidth}px`;
        document.body.removeChild(tempSpan);
    }
});