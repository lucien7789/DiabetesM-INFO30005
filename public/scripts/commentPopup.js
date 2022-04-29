function showComment(e) {
    const button = e.target;

    let message = button.nextElementSibling;

    
    message.classList.add("data-comment-active");
    window.addEventListener("mousedown", () => {
        message.classList.remove("data-comment-active");
        console.log("remove");
    }, { once: true });
};