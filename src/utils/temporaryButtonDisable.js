function temporaryButtonDisable(i, className, duration) {
    const buttons = document.getElementsByClassName(className);
    Array.from(buttons).forEach(button => {
        button.disabled = true;
    });

    setTimeout(() => {
        Array.from(buttons).forEach(button => {
            button.disabled = false;
        });
    }, i * duration);
}

export { temporaryButtonDisable }