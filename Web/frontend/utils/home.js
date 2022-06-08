window.addEventListener("load", load, false);

function load() {
    let form = document.forms[0];
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        sessionStorage.clear();
        fetch(`${form.action}`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": `application/json`,
            }),
            body: ""
        }).then(response => {
            if (response.status < 400)
                window.location.href = "/index.html";
            else {
                errora();
            }
        }).catch((err) => {
            window.location.href = "/index.html";
        });
    });
}

console.log(sessionStorage.getItem('managerId'));

function errora() {
    alertify.alert('URadio', 'Ocurrió un error, intente de nuevo más tarde', () => {
        alertify.error('Intente máss tarde');
    });
}