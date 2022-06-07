alertify.defaults.transition = "slide";
alertify.defaults.theme.ok = "btn btn-bd-primary";
alertify.defaults.theme.cancel = "btn btn-danger";
alertify.defaults.theme.input = "form-control";

window.addEventListener("load", load, false);

function load() {
    let form = document.forms[0];
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        event.stopPropagation();
        let req = { mail: "", pswd: "" },
            next = "/home.html";
        let entry;
        for (let i = 0; i < form.length; i++) {
            entry = form[i];
            if ((entry.type == "text" || entry.type == "password" || entry.type == "email") && entry.value != "") {
                if (entry.name == "mail") req.mail = entry.value;
                else if (entry.name == "pswd") req.pswd = entry.value;
            } else if (entry.type == "text" || entry.type == "password") {
                alertify.alert('URadio', 'Introduce correctamente los datos solicitados', function() {
                    alertify.error('Introduce correctamente tus datos');
                });
                return false;
            }
        }
        fetch(`${form.action}`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": `application/json`,
                }),
                body: JSON.stringify(req)
            })
            .then(response => {
                if (response.status < 400)
                    return response.json();
                else {
                    errora();
                    return null;
                }
            })
            .then(data => {
                if (data)
                    if (data.message == "Success") {
                        alertify.alert('URadio', `Bienvenido`,
                            () => alertify.success('Ok')).set({
                            onshow: null,
                            onclose: function() {
                                sessionStorage.setItem('managerId', data.managerId);
                                window.location.href = next;
                            }
                        })
                    } else if (data.message == "pswd") {
                    alertify.alert('URadio', 'La contraseña es incorrecta',
                        () => alertify.error('La contraseña es incorrecta'));
                    return false;
                } else if (data.message == "mail") {
                    alertify.alert('URadio', 'El usuario no existe',
                        () => alertify.error('El usuario no existe'));
                    return false;
                } else errora();
            })
            .catch(function(err) {
                console.error(err);
            });
        return false;
    });
}

function errora() {
    alertify.alert('URadio', 'Ocurrió un error, intente de nuevo más tarde', () => {
        alertify.error('Intente máss tarde');
    });
}