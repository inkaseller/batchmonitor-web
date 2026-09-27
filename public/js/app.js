document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('procesosTableBody')) {
        loadProcesos();
        loadCMSAnuncios();
    }

    const cmsForm = document.getElementById('cmsForm');
    if (cmsForm) {
        cmsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                id_usuario: 1, // ID por defecto del Administrador
                titulo: document.getElementById('cmsTitulo').value,
                prioridad: document.getElementById('cmsPrioridad').value,
                contenido: document.getElementById('cmsContenido').value
            };

            const res = await fetch('/api/v1/cms/anuncios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert('¡Anuncio CMS publicado correctamente en la Base de Datos!');
                window.location.href = 'index.html';
            }
        });
    }
});

async function loadProcesos() {
    try {
        const res = await fetch('/api/v1/procesos');
        const result = await res.json();
        const tbody = document.getElementById('procesosTableBody');
        tbody.innerHTML = '';

        result.data.forEach(p => {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${p.codigo_proceso}</strong></td>
                    <td>${p.nombre_proceso}</td>
                    <td><span class="badge bg-info text-dark">${p.frecuencia}</span></td>
                    <td>${p.ultima_ejecucion ? new Date(p.ultima_ejecucion).toLocaleString() : 'Sin registros'}</td>
                    <td><span class="badge bg-success">ACTIVO</span></td>
                </tr>
            `;
        });
    } catch (err) {
        console.error('Error cargando procesos:', err);
    }
}

async function loadCMSAnuncios() {
    try {
        const res = await fetch('/api/v1/cms/anuncios');
        const result = await res.json();
        const container = document.getElementById('cmsContainer');
        
        if (result.data && result.data.length > 0) {
            container.innerHTML = '';
            result.data.forEach(a => {
                const badgeColor = a.prioridad === 'ALTA' ? 'danger' : 'info';
                container.innerHTML += `
                    <div class="alert alert-${badgeColor} mb-2">
                        <span class="badge bg-${badgeColor} me-2">[PRIORIDAD ${a.prioridad}]</span>
                        <strong>${a.titulo}</strong>
                        <p class="mb-0 mt-1">${a.contenido}</p>
                        <small class="text-muted">${new Date(a.fecha_publicacion).toLocaleString()}</small>
                    </div>
                `;
            });
        } else {
            container.innerHTML = '<p class="text-muted mb-0">No hay avisos registrados en el CMS actualmente.</p>';
        }
    } catch (err) {
        console.error('Error cargando CMS:', err);
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}