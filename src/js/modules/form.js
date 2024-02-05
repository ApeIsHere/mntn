const forms = () => {
    const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        server = 'assets/server.php';

    const message = {
        loading: 'Loading...',
        login: "Log-in success",
        failure: 'Something went wrong...',
        spinner: 'assets/icons/form/spinner.gif',
        ok: 'assets/icons/form/ok.png',
        fail: 'assets/icons/form/fail.png'
    };

    const clearInputs = () => {
        inputs.forEach(input => input.value = '');
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await res.text();
    };

    const animateStatus = (item) => {
        item.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => {
            item.classList.remove('animate__fadeIn');
            item.classList.add('animate__fadeOut');
            setTimeout(() => {
                item.style.display = 'none';
            }, 800);
        }, 3000);
    };

    const showBtnImg = (parent, src, alt) => {
        const img = document.createElement('img');

        img.style.width = '30px';
        img.src = src;
        img.alt = alt;
        parent.innerHTML = '';
        animateStatus(img);
        parent.appendChild(img);
    };

    forms.forEach(form => {
        const button = form.querySelector('button'),
            oldValue = button.innerHTML;
        let modalMessage;


        if (form.closest('.popup')) {
            modalMessage = document.createElement('div');
            modalMessage.classList.add('title');
            modalMessage.style.marginTop = '10px';
            form.appendChild(modalMessage);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            showBtnImg(button, message.spinner, message.loading);
                modalMessage.textContent = message.loading;
                modalMessage.style.display = 'block';

            postData(server, formData)
                .then(res => {
                    showBtnImg(button, message.ok, 'ok');
                        modalMessage.textContent = message.login;
                        modalMessage.style.display = 'block';
                    console.log(res);
                })
                .catch(() => {
                    showBtnImg(button, message.fail, 'fail');
                        modalMessage.textContent = message.failure;
                        modalMessage.style.display = 'block';
                })
                .finally(() => {
                    setTimeout(() => {
                        clearInputs();
                        button.innerHTML = oldValue;
                        modalMessage.style.display = 'none';
                    }, 3800);
                });
        });
    });

};

export default forms;