async function carregar() {
    const r = await fetch('/api/postos');
    const postos = await r.json();

    const busca =
        document
            .getElementById('busca')
            .value
            .toLowerCase();

    let concluidos = 0;
    let html = '';

    postos.forEach(p => {

        if (
            !p.nome.toLowerCase().includes(busca) &&
            !p.regiao.toLowerCase().includes(busca) &&
            !p.endereco.toLowerCase().includes(busca)
        ) {
            return;
        }

        if (p.concluido) {
            concluidos++;
        }

        html += `
            <div class="card ${p.concluido ? 'ok' : ''}">

                <h3>${p.id} - ${p.nome}</h3>

                <p>
                    <strong>Região:</strong>
                    ${p.regiao}
                </p>

                <p>
                    <strong>Endereço:</strong><br>
                    ${p.endereco}
                </p>

                <div class="acoes">

                    <button
                        class="btn-concluir"
                        onclick="alt(${p.id}, ${!p.concluido})">

                        ${p.concluido
                            ? '↩ Desfazer'
                            : '✅ Concluir'}

                    </button>

                    <button
                        class="btn-maps"
                        onclick="navegar('${encodeURIComponent(p.endereco)}')">

                        🧭 Navegar

                    </button>

                </div>

            </div>
        `;
    });

    document.getElementById('contador').innerText =
        `${concluidos}/${postos.length}`;

    document.getElementById('lista').innerHTML =
        html;
}

async function alt(id, status) {

    await fetch(`/api/postos/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            concluido: status
        })
    });

    carregar();
}

function navegar(endereco) {

    window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${endereco}`,
        '_blank'
    );
}

document
    .getElementById('busca')
    .addEventListener(
        'keyup',
        carregar
    );

carregar();

setInterval(
    carregar,
    3000
);