const container = document.querySelector(".header-tab");

export const hideAlert = () => {
    const alertBlock = document.querySelector(".alert-tep");
    if (alertBlock) {
        alertBlock.remove();
    }
};

export const showAlert = (message, type, timeout = 3000) => {
    const div = document.createElement("div");
    div.className = `alert-tep  alert-${type}`;
    div.append(message);

    container.prepend(div);

    setTimeout(hideAlert, timeout);
};
