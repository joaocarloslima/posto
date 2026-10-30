// Tela do posto em 3D. Não precisa mexer neste arquivo:
// ele só conversa com o PostoApiController (/api/...).

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------- cena, câmera e luz ----------

const container = document.getElementById('cena');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fd3ee);
scene.fog = new THREE.Fog(0x9fd3ee, 35, 70);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 13, 22);

const controles = new OrbitControls(camera, renderer.domElement);
controles.target.set(0, 0, 1.5);
controles.enablePan = false;
controles.minDistance = 8;
controles.maxDistance = 35;
controles.maxPolarAngle = Math.PI * 0.45;

scene.add(new THREE.HemisphereLight(0xffffff, 0x557755, 1.2));
const sol = new THREE.DirectionalLight(0xffffff, 1.6);
sol.position.set(8, 15, 6);
sol.castShadow = true;
sol.shadow.mapSize.set(2048, 2048);
Object.assign(sol.shadow.camera, { left: -16, right: 16, top: 12, bottom: -12 });
scene.add(sol);

// ---------- peças básicas ----------

function caixa(l, a, p, cor) {
    const malha = new THREE.Mesh(
        new THREE.BoxGeometry(l, a, p),
        new THREE.MeshStandardMaterial({ color: cor, roughness: 0.7 })
    );
    malha.castShadow = true;
    malha.receiveShadow = true;
    return malha;
}

function cilindro(raio, altura, cor) {
    const malha = new THREE.Mesh(
        new THREE.CylinderGeometry(raio, raio, altura, 20),
        new THREE.MeshStandardMaterial({ color: cor, roughness: 0.8 })
    );
    malha.castShadow = true;
    return malha;
}

function em(objeto, x, y, z) {
    objeto.position.set(x, y, z);
    return objeto;
}

// roda deitada, com o eixo apontando para os lados (z)
function roda(raio, largura) {
    const r = cilindro(raio, largura, 0x222222);
    r.rotation.x = Math.PI / 2;
    return r;
}

// ---------- cenário ----------

const grama = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.MeshStandardMaterial({ color: 0x7cb860 })
);
grama.rotation.x = -Math.PI / 2;
grama.receiveShadow = true;
scene.add(grama);

const asfalto = em(caixa(32, 0.05, 18, 0x55595e), 0, 0.02, 1);
asfalto.castShadow = false;
scene.add(asfalto);

// faixas da pista onde fica a fila
for (let x = -14; x <= 14; x += 2.4) {
    const faixa = em(caixa(1.2, 0.06, 0.15, 0xffffff), x, 0.03, 8.6);
    faixa.castShadow = false;
    scene.add(faixa);
}

// cobertura do posto
scene.add(em(caixa(15, 0.4, 6, 0xf5f5f5), 0, 4.4, -2.5));
scene.add(em(caixa(15.2, 0.35, 6.2, 0xc62828), 0, 4.1, -2.5));
for (const x of [-6.5, 6.5]) {
    for (const z of [-5, 0]) {
        scene.add(em(cilindro(0.18, 4, 0xdddddd), x, 2, z));
    }
}

// ilhas
scene.add(em(caixa(3, 0.25, 1.2, 0xbdbdbd), -4, 0.12, -3.4));
scene.add(em(caixa(3, 0.25, 1.2, 0xbdbdbd), 4, 0.12, -3.4));

// bomba de combustível
const bomba = new THREE.Group();
bomba.add(em(caixa(0.9, 1.7, 0.6, 0xffb300), 0, 1.1, 0));
bomba.add(em(caixa(0.6, 0.35, 0.05, 0x263238), 0, 1.55, 0.33));
bomba.add(em(cilindro(0.05, 0.9, 0x111111), 0.5, 0.9, 0.2));
em(bomba, -4, 0, -3.4);
scene.add(bomba);

// carregador elétrico
const carregador = new THREE.Group();
carregador.add(em(caixa(0.7, 1.9, 0.5, 0x43a047), 0, 1.2, 0));
carregador.add(em(caixa(0.45, 0.6, 0.05, 0xf1f8e9), 0, 1.5, 0.28));
carregador.add(em(cilindro(0.04, 0.8, 0x111111), 0.42, 0.9, 0.15));
em(carregador, 4, 0, -3.4);
scene.add(carregador);

// loja de conveniência
scene.add(em(caixa(9, 3, 4, 0xfff3e0), 0, 1.5, -11));
scene.add(em(caixa(9.4, 0.5, 4.4, 0xc62828), 0, 3.2, -11));
scene.add(em(caixa(2, 2, 0.1, 0x90caf9), -2, 1.2, -8.95));
scene.add(em(caixa(1.2, 2.2, 0.1, 0x6d4c41), 2, 1.1, -8.95));

// árvores
for (const [x, z] of [[-15, -6], [-17, 2], [15, -7], [17, 3], [-12, -12], [12, -13]]) {
    scene.add(em(cilindro(0.25, 1.4, 0x6d4c41), x, 0.7, z));
    const copa = new THREE.Mesh(
        new THREE.ConeGeometry(1.3, 2.8, 10),
        new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
    );
    copa.castShadow = true;
    scene.add(em(copa, x, 2.8, z));
}

// ---------- etiquetas (nome + barras) ----------

function criarEtiqueta() {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    const textura = new THREE.CanvasTexture(canvas);
    textura.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: textura, depthTest: false }));
    sprite.scale.set(2.5, 1.25, 1);
    sprite.renderOrder = 10;

    function barra(y, rotulo, valor, cor) {
        ctx.fillStyle = '#333';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(rotulo, 18, y + 17);
        ctx.fillStyle = '#ddd';
        ctx.fillRect(70, y, 200, 20);
        ctx.fillStyle = cor;
        ctx.fillRect(70, y, 2 * Math.max(0, Math.min(100, valor)), 20);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(70, y, 200, 20);
        ctx.fillStyle = '#333';
        ctx.font = '16px sans-serif';
        ctx.fillText(valor + '%', 276, y + 16);
    }

    function desenhar(dados, selecionado) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const temTanque = dados.tanque !== null && dados.tanque !== undefined;
        const temBateria = dados.bateria !== null && dados.bateria !== undefined;
        const altura = 54 + (temTanque ? 30 : 0) + (temBateria ? 30 : 0);

        ctx.fillStyle = selecionado ? '#fff59d' : 'rgba(255,255,255,0.92)';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(4, 4, canvas.width - 8, altura, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#222';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(dados.icone + ' ' + dados.nome, 16, 38);

        let y = 56;
        if (temTanque) { barra(y, '⛽', dados.tanque, '#ffb300'); y += 30; }
        if (temBateria) { barra(y, '🔌', dados.bateria, '#43a047'); }
        textura.needsUpdate = true;
    }

    return { sprite, desenhar };
}

function textoFlutuante(alvo, texto, cor) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 90px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = cor;
    ctx.fillText(texto, 64, 96);
    const material = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), depthTest: false, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1.2, 1.2, 1);
    sprite.renderOrder = 11;
    const inicio = alvo.grupo.position.clone().add(new THREE.Vector3(0, 2, 0));
    sprite.position.copy(inicio);
    scene.add(sprite);
    animar(1.4, k => {
        sprite.position.y = inicio.y + k * 1.5;
        material.opacity = 1 - k;
    }).then(() => scene.remove(sprite));
}

// ---------- modelos de cada tipo ----------

function modeloCarro(cor) {
    const g = new THREE.Group();
    g.add(em(caixa(2.0, 0.55, 1.05, cor), 0, 0.55, 0));
    g.add(em(caixa(1.05, 0.45, 0.95, cor), -0.15, 1.02, 0));
    g.add(em(caixa(0.06, 0.35, 0.85, 0xbbdefb), 0.4, 1.02, 0));
    for (const x of [-0.65, 0.65]) {
        for (const z of [-0.5, 0.5]) {
            g.add(em(roda(0.3, 0.2), x, 0.3, z));
        }
    }
    return g;
}

function modeloMoto(cor) {
    const g = new THREE.Group();
    g.add(em(caixa(1.1, 0.35, 0.3, cor), 0, 0.7, 0));
    g.add(em(caixa(0.5, 0.12, 0.32, 0x222222), -0.2, 0.93, 0));
    g.add(em(caixa(0.06, 0.06, 0.7, 0x555555), 0.5, 1.05, 0));
    g.add(em(roda(0.32, 0.12), -0.55, 0.32, 0));
    g.add(em(roda(0.32, 0.12), 0.55, 0.32, 0));
    return g;
}

function modeloBicicleta() {
    const g = new THREE.Group();
    const aro = () => new THREE.Mesh(
        new THREE.TorusGeometry(0.33, 0.05, 8, 24),
        new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    g.add(em(aro(), -0.5, 0.35, 0));
    g.add(em(aro(), 0.5, 0.35, 0));
    g.add(em(caixa(1.0, 0.06, 0.06, 0x00897b), 0, 0.65, 0));
    g.add(em(caixa(0.06, 0.4, 0.06, 0x00897b), -0.15, 0.5, 0));
    g.add(em(caixa(0.25, 0.06, 0.12, 0x222222), -0.15, 0.73, 0));
    g.add(em(caixa(0.06, 0.06, 0.5, 0x555555), 0.45, 0.85, 0));
    return g;
}

function modeloPatinete(cor) {
    const g = new THREE.Group();
    g.add(em(caixa(0.95, 0.08, 0.25, cor), 0, 0.18, 0));
    g.add(em(caixa(0.06, 1.0, 0.06, 0x555555), 0.42, 0.68, 0));
    g.add(em(caixa(0.06, 0.06, 0.5, 0x555555), 0.42, 1.18, 0));
    g.add(em(roda(0.12, 0.08), -0.4, 0.12, 0));
    g.add(em(roda(0.12, 0.08), 0.4, 0.12, 0));
    return g;
}

function modeloGerador() {
    const g = new THREE.Group();
    g.add(em(caixa(1.0, 0.75, 0.7, 0xfdd835), 0, 0.5, 0));
    g.add(em(caixa(0.3, 0.3, 0.05, 0x263238), 0.25, 0.55, 0.36));
    g.add(em(cilindro(0.12, 0.2, 0xb71c1c), -0.25, 0.97, 0));
    for (const x of [-0.5, 0.5]) {
        g.add(em(caixa(0.06, 0.9, 0.06, 0x222222), x, 0.45, 0.38));
        g.add(em(caixa(0.06, 0.9, 0.06, 0x222222), x, 0.45, -0.38));
    }
    return g;
}

function modeloCortador() {
    const g = new THREE.Group();
    g.add(em(caixa(0.9, 0.3, 0.75, 0x388e3c), 0, 0.3, 0));
    g.add(em(cilindro(0.2, 0.3, 0xd32f2f), 0, 0.6, 0));
    g.add(em(caixa(0.06, 0.06, 0.55, 0x222222), -0.85, 0.95, 0));
    g.add(em(caixa(0.7, 0.05, 0.05, 0x222222), -0.55, 0.7, 0.25));
    g.add(em(caixa(0.7, 0.05, 0.05, 0x222222), -0.55, 0.7, -0.25));
    for (const x of [-0.35, 0.35]) {
        for (const z of [-0.4, 0.4]) {
            g.add(em(roda(0.14, 0.08), x, 0.14, z));
        }
    }
    return g;
}

function criarModelo(tipo) {
    switch (tipo) {
        case 'Carro': return modeloCarro(0xe53935);
        case 'CarroEletrico': return modeloCarro(0x1e88e5);
        case 'CarroHibrido': return modeloCarro(0x26a69a);
        case 'Moto': return modeloMoto(0xfb8c00);
        case 'Bicicleta': return modeloBicicleta();
        case 'PatineteEletrico': return modeloPatinete(0x5e35b1);
        case 'Gerador': return modeloGerador();
        case 'CortadorDeGrama': return modeloCortador();
        default: return em(caixa(1, 1, 1, 0x9e9e9e), 0, 0.5, 0); // tipo novo que alguém criar
    }
}

// ---------- animação ----------

const animacoes = [];

function animar(duracao, aoAtualizar) {
    return new Promise(resolve => animacoes.push({ tempo: 0, duracao, aoAtualizar, resolve }));
}

const suave = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

// o modelo aponta para +x; este ângulo faz ele olhar para (dx, dz)
const direcao = (dx, dz) => Math.atan2(-dz, dx);
const OLHANDO_PARA_O_POSTO = direcao(0, -1);

function girarPara(cliente, angulo, duracao = 0.25) {
    const inicio = cliente.grupo.rotation.y;
    let diferenca = angulo - inicio;
    diferenca = Math.atan2(Math.sin(diferenca), Math.cos(diferenca));
    return animar(duracao, k => { cliente.grupo.rotation.y = inicio + diferenca * suave(k); });
}

async function dirigir(cliente, destino, duracao) {
    const inicio = cliente.grupo.position.clone();
    const dx = destino.x - inicio.x;
    const dz = destino.z - inicio.z;
    if (Math.hypot(dx, dz) < 0.01) return;
    await girarPara(cliente, direcao(dx, dz));
    await animar(duracao, k => {
        const s = suave(k);
        cliente.grupo.position.set(inicio.x + dx * s, Math.sin(k * Math.PI * 6) * 0.03, inicio.z + dz * s);
    });
}

function tremer(cliente) {
    const x = cliente.grupo.position.x;
    return animar(0.5, k => {
        cliente.grupo.position.x = x + Math.sin(k * Math.PI * 8) * 0.15 * (1 - k);
    });
}

// ---------- fila ----------

const BOMBA = new THREE.Vector3(-4, 0, -1.7);
const CARREGADOR = new THREE.Vector3(4, 0, -1.7);
const SAIDA_Z = 3.2;

let clientes = [];
let selecionado = null;
let ocupado = false;

const anel = new THREE.Mesh(
    new THREE.RingGeometry(1.1, 1.3, 32),
    new THREE.MeshBasicMaterial({ color: 0xffeb3b, side: THREE.DoubleSide })
);
anel.rotation.x = -Math.PI / 2;
anel.visible = false;
scene.add(anel);

function posicaoNaFila(indice, total) {
    const espaco = 2.7;
    return new THREE.Vector3((indice - (total - 1) / 2) * espaco, 0, 6.8);
}

async function carregarFila() {
    for (const c of clientes) scene.remove(c.grupo);
    clientes = [];
    selecionado = null;
    atualizarPainel();

    const resposta = await fetch('/api/fila');
    const fila = await resposta.json();

    fila.forEach((dados, i) => {
        const grupo = new THREE.Group();
        const modelo = criarModelo(dados.tipo);
        grupo.add(modelo);
        const etiqueta = criarEtiqueta();
        etiqueta.sprite.position.set(0, 2.4, 0);
        grupo.add(etiqueta.sprite);

        const vaga = posicaoNaFila(i, fila.length);
        grupo.position.copy(vaga);
        grupo.rotation.y = OLHANDO_PARA_O_POSTO;
        scene.add(grupo);

        const cliente = { dados, grupo, modelo, etiqueta, vaga };
        grupo.userData.cliente = cliente;
        etiqueta.desenhar(dados, false);
        clientes.push(cliente);
    });
}

// ---------- painel ----------

const elNome = document.getElementById('nome');
const elTipo = document.getElementById('tipo');
const btAbastecer = document.getElementById('abastecer');
const btRecarregar = document.getElementById('recarregar');
const elLog = document.getElementById('log');

function atualizarPainel() {
    if (selecionado) {
        elNome.textContent = selecionado.dados.icone + ' ' + selecionado.dados.nome;
        elTipo.textContent = selecionado.dados.tipo;
    } else {
        elNome.textContent = 'Escolha um cliente';
        elTipo.textContent = 'Clique em um veículo ou máquina da fila';
    }
    btAbastecer.disabled = !selecionado || ocupado;
    btRecarregar.disabled = !selecionado || ocupado;
}

function registrar(mensagem, atendido) {
    const item = document.createElement('li');
    item.textContent = (atendido ? '✔ ' : '✖ ') + mensagem;
    item.className = atendido ? 'ok' : 'nao';
    elLog.prepend(item);
}

function selecionar(cliente) {
    if (ocupado) return;
    if (selecionado) selecionado.etiqueta.desenhar(selecionado.dados, false);
    selecionado = cliente;
    if (cliente) cliente.etiqueta.desenhar(cliente.dados, true);
    atualizarPainel();
}

// ---------- atendimento ----------

async function atender(acao) {
    if (!selecionado || ocupado) return;
    const cliente = selecionado;
    const estacao = acao === 'abastecer' ? BOMBA : CARREGADOR;
    const campo = acao === 'abastecer' ? 'tanque' : 'bateria';
    ocupado = true;
    atualizarPainel();

    await dirigir(cliente, new THREE.Vector3(cliente.vaga.x, 0, SAIDA_Z), 0.6);
    await dirigir(cliente, estacao, 1.0);
    await girarPara(cliente, OLHANDO_PARA_O_POSTO);

    let resposta;
    try {
        const r = await fetch(`/api/${acao}/${cliente.dados.id}`, { method: 'POST' });
        if (!r.ok) throw new Error(r.status);
        resposta = await r.json();
    } catch (erro) {
        resposta = { atendido: false, mensagem: 'Erro no servidor (veja o console do Spring)', cliente: cliente.dados };
    }

    if (resposta.atendido) {
        const de = cliente.dados[campo] ?? 0;
        const para = resposta.cliente[campo];
        await animar(1.2, k => {
            cliente.etiqueta.desenhar({ ...resposta.cliente, [campo]: Math.round(de + (para - de) * k) }, true);
        });
        textoFlutuante(cliente, '✔', '#2e7d32');
    } else {
        textoFlutuante(cliente, '✖', '#c62828');
        await tremer(cliente);
    }

    cliente.dados = resposta.cliente;
    cliente.etiqueta.desenhar(cliente.dados, selecionado === cliente);
    registrar(resposta.mensagem, resposta.atendido);

    await dirigir(cliente, new THREE.Vector3(estacao.x, 0, SAIDA_Z), 0.8);
    await dirigir(cliente, cliente.vaga, 0.8);
    await girarPara(cliente, OLHANDO_PARA_O_POSTO);

    ocupado = false;
    atualizarPainel();
}

btAbastecer.addEventListener('click', () => atender('abastecer'));
btRecarregar.addEventListener('click', () => atender('recarregar'));
document.getElementById('reiniciar').addEventListener('click', async () => {
    if (ocupado) return;
    await fetch('/api/reiniciar', { method: 'POST' });
    elLog.innerHTML = '';
    await carregarFila();
});

// ---------- clique na cena ----------

const raio = new THREE.Raycaster();
const ponteiro = new THREE.Vector2();
let apertouEm = null;

function clienteSobOPonteiro(evento) {
    ponteiro.x = (evento.clientX / window.innerWidth) * 2 - 1;
    ponteiro.y = -(evento.clientY / window.innerHeight) * 2 + 1;
    raio.setFromCamera(ponteiro, camera);
    const acertos = raio.intersectObjects(clientes.map(c => c.modelo), true);
    if (acertos.length === 0) return null;
    let objeto = acertos[0].object;
    while (objeto && !objeto.userData.cliente) objeto = objeto.parent;
    return objeto ? objeto.userData.cliente : null;
}

renderer.domElement.addEventListener('pointerdown', e => { apertouEm = { x: e.clientX, y: e.clientY }; });
renderer.domElement.addEventListener('pointerup', e => {
    if (!apertouEm) return;
    const arrastou = Math.hypot(e.clientX - apertouEm.x, e.clientY - apertouEm.y) > 5;
    apertouEm = null;
    if (!arrastou) selecionar(clienteSobOPonteiro(e));
});
renderer.domElement.addEventListener('pointermove', e => {
    renderer.domElement.style.cursor = clienteSobOPonteiro(e) ? 'pointer' : 'grab';
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------- laço principal ----------

const relogio = new THREE.Clock();

function quadro() {
    const dt = Math.min(relogio.getDelta(), 0.05);

    for (let i = animacoes.length - 1; i >= 0; i--) {
        const a = animacoes[i];
        a.tempo += dt;
        const k = Math.min(a.tempo / a.duracao, 1);
        a.aoAtualizar(k);
        if (k === 1) {
            animacoes.splice(i, 1);
            a.resolve();
        }
    }

    if (selecionado) {
        anel.visible = true;
        anel.position.set(selecionado.grupo.position.x, 0.06, selecionado.grupo.position.z);
        anel.rotation.z += dt;
    } else {
        anel.visible = false;
    }

    controles.update();
    renderer.render(scene, camera);
    requestAnimationFrame(quadro);
}

carregarFila();
quadro();
