const cur = document.getElementById('cur');
fetch('/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        cur.innerHTML = data.join('<br>');
    });

const name = document.getElementById('name');
const submit = document.querySelector('button');
submit.addEventListener('click', () => {
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
        }),
    })
        .then(response => {
            window.location.reload();
        })
});
