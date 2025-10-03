// Dados mockados de clientes
const clientsData = [
    {
        id: 1,
        name: "João Silva",
        cpf: "123.456.789-00",
        email: "joao@techsolutions.com",
        phone: "(11) 99999-9999",
        refPhone: "(11) 88888-8888",
        daysOverdue: 15,
        duplicata: "DUP001",
        probability: "boa",
        debt: 5000,
        status: "atrasado",
        purchases: [
            {
                duplicata: "DUP001",
                value: 15000,
                installments: 3,
                date: "15/01/2024",
                company: "Tech Solutions",
                status: "pendente",
                parcelas: [
                    { number: 1, value: 5000, dueDate: "15/02/2024", status: "pago", paidDate: "14/02/2024" },
                    { number: 2, value: 5000, dueDate: "15/03/2024", status: "pago", paidDate: "16/03/2024" },
                    { number: 3, value: 5000, dueDate: "15/04/2024", status: "pendente", paidDate: null }
                ]
            },
            {
                duplicata: "DUP004",
                value: 8500,
                installments: 2,
                date: "20/02/2024",
                company: "Tech Solutions",
                status: "pago",
                parcelas: [
                    { number: 1, value: 4250, dueDate: "20/03/2024", status: "pago", paidDate: "19/03/2024" },
                    { number: 2, value: 4250, dueDate: "20/04/2024", status: "pago", paidDate: "20/04/2024" }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Maria Santos",
        cpf: "987.654.321-00",
        email: "maria@inovacao.com",
        phone: "(11) 88888-8888",
        refPhone: "(11) 77777-7777",
        daysOverdue: 45,
        duplicata: "DUP002",
        probability: "media",
        debt: 25000,
        status: "atrasado",
        purchases: [
            {
                duplicata: "DUP002",
                value: 25000,
                installments: 5,
                date: "10/01/2024",
                company: "Inovação Ltda",
                status: "pendente",
                parcelas: [
                    { number: 1, value: 5000, dueDate: "10/02/2024", status: "pago", paidDate: "10/02/2024" },
                    { number: 2, value: 5000, dueDate: "10/03/2024", status: "pendente", paidDate: null },
                    { number: 3, value: 5000, dueDate: "10/04/2024", status: "pendente", paidDate: null },
                    { number: 4, value: 5000, dueDate: "10/05/2024", status: "pendente", paidDate: null },
                    { number: 5, value: 5000, dueDate: "10/06/2024", status: "pendente", paidDate: null }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Carlos Oliveira",
        cpf: "456.789.123-00",
        email: "carlos@digital.com",
        phone: "(11) 77777-7777",
        refPhone: "(11) 66666-6666",
        daysOverdue: 120,
        duplicata: "DUP003",
        probability: "baixa",
        debt: 35000,
        status: "atrasado",
        purchases: [
            {
                duplicata: "DUP003",
                value: 35000,
                installments: 4,
                date: "05/12/2023",
                company: "Digital Corp",
                status: "pendente",
                parcelas: [
                    { number: 1, value: 8750, dueDate: "05/01/2024", status: "pendente", paidDate: null },
                    { number: 2, value: 8750, dueDate: "05/02/2024", status: "pendente", paidDate: null },
                    { number: 3, value: 8750, dueDate: "05/03/2024", status: "pendente", paidDate: null },
                    { number: 4, value: 8750, dueDate: "05/04/2024", status: "pendente", paidDate: null }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "Ana Costa",
        cpf: "654.321.987-00",
        email: "ana@startup.com",
        phone: "(11) 66666-6666",
        refPhone: "(11) 55555-5555",
        daysOverdue: 7,
        duplicata: "DUP006",
        probability: "boa",
        debt: 18000,
        status: "atrasado",
        purchases: [
            {
                duplicata: "DUP006",
                value: 18000,
                installments: 3,
                date: "01/04/2024",
                company: "Startup Inc",
                status: "pendente",
                parcelas: [
                    { number: 1, value: 6000, dueDate: "01/05/2024", status: "pago", paidDate: "30/04/2024" },
                    { number: 2, value: 6000, dueDate: "01/06/2024", status: "pendente", paidDate: null },
                    { number: 3, value: 6000, dueDate: "01/07/2024", status: "pendente", paidDate: null }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "Pedro Almeida",
        cpf: "321.654.987-00",
        email: "pedro@empresa.com",
        phone: "(11) 55555-5555",
        refPhone: "(11) 44444-4444",
        daysOverdue: 0,
        duplicata: "DUP005",
        probability: "boa",
        debt: 12000,
        status: "em-dia",
        purchases: [
            {
                duplicata: "DUP005",
                value: 12000,
                installments: 2,
                date: "15/03/2024",
                company: "Empresa XYZ",
                status: "pendente",
                parcelas: [
                    { number: 1, value: 6000, dueDate: "15/04/2024", status: "pago", paidDate: "15/04/2024" },
                    { number: 2, value: 6000, dueDate: "15/05/2024", status: "pendente", paidDate: null }
                ]
            }
        ]
    }
];

// Variáveis globais
let currentFilter = '';
let currentStoreFilter = '';
let currentClient = null;
let currentAction = '';
let selectedPurchase = null;
let selectedParcelas = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderClients();
    setupEventListeners();
    drawCharts();
});

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-select');
    const probabilityFilter = document.getElementById('probability-filter');
    
    if (searchInput) searchInput.addEventListener('input', filterClients);
    if (filterSelect) filterSelect.addEventListener('change', filterClients);
    if (probabilityFilter) probabilityFilter.addEventListener('change', filterClients);
}

// Navegação entre seções
function showDashboard() {
    document.getElementById('dashboard-section').style.display = 'block';
    document.getElementById('agenda-section').style.display = 'none';
}

function showAgenda() {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('agenda-section').style.display = 'block';
}

function toggleCharts() {
    const chartsSection = document.getElementById('charts-section');
    if (chartsSection.style.display === 'none' || chartsSection.style.display === '') {
        chartsSection.style.display = 'block';
        drawCharts();
    } else {
        chartsSection.style.display = 'none';
    }
}

// Filtros por cards
function filterByCard(cardType) {
    currentFilter = cardType;
    showAgenda();
    
    const filterInfo = document.getElementById('filter-info');
    const filterText = document.getElementById('filter-info-text');
    
    let filterMessage = '';
    
    switch(cardType) {
        case 'a-receber-mes':
            filterMessage = 'Mostrando clientes com parcelas a receber no mês';
            break;
        case 'a-receber-dia':
            filterMessage = 'Mostrando clientes com parcelas vencendo hoje';
            break;
        case 'recebido-dia':
            filterMessage = 'Mostrando clientes que pagaram hoje';
            break;
        case 'atrasado':
            filterMessage = 'Mostrando clientes em atraso';
            break;
        case 'recebido-atrasado-geral':
            filterMessage = 'Mostrando histórico de recebimentos atrasados';
            break;
        case 'recebido-atrasado-mes':
            filterMessage = 'Mostrando recebimentos atrasados do mês';
            break;
        case 'recebido-atrasado-dia':
            filterMessage = 'Mostrando recebimentos atrasados do dia';
            break;
        case 'renegociacoes-feitas':
            filterMessage = 'Mostrando clientes com renegociações feitas';
            break;
        case 'renegociacoes-quebradas':
            filterMessage = 'Mostrando clientes com renegociações quebradas';
            break;
        case 'renegociacoes-para-receber':
            filterMessage = 'Mostrando renegociações para receber hoje';
            break;
    }
    
    filterText.textContent = filterMessage;
    filterInfo.classList.add('active');
    renderClients();
}

// Filtro por loja
function filterByStore(storeName) {
    currentStoreFilter = storeName;
    showAgenda();
    
    const filterInfo = document.getElementById('filter-info');
    const filterText = document.getElementById('filter-info-text');
    
    filterText.textContent = `Mostrando clientes da ${storeName}`;
    filterInfo.classList.add('active');
    renderClients();
}

// Limpar filtros
function clearFilter() {
    currentFilter = '';
    currentStoreFilter = '';
    document.getElementById('filter-info').classList.remove('active');
    document.getElementById('search-input').value = '';
    document.getElementById('filter-select').value = '';
    document.getElementById('probability-filter').value = '';
    renderClients();
}

// Renderizar clientes - CORRIGIDO
function renderClients() {
    const tbody = document.getElementById('clients-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    let filteredClients = clientsData.filter(client => {
        // Filtro por busca
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        if (searchTerm && !client.name.toLowerCase().includes(searchTerm) && 
            !client.cpf.includes(searchTerm) && !client.duplicata.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Filtro por categoria
        const filterSelect = document.getElementById('filter-select');
        const categoryFilter = filterSelect ? filterSelect.value : '';
        if (categoryFilter) {
            switch(categoryFilter) {
                case '1-parcela':
                    if (client.daysOverdue < 1 || client.daysOverdue > 30) return false;
                    break;
                case '2-parcelas':
                    if (client.daysOverdue < 31 || client.daysOverdue > 60) return false;
                    break;
                case '3-parcelas':
                    if (client.daysOverdue < 61) return false;
                    break;
                case 'em-dia':
                    if (client.daysOverdue > 0) return false;
                    break;
                case 'atrasado-ano':
                    if (client.daysOverdue < 1 || client.daysOverdue > 365) return false;
                    break;
                case 'atrasado-antigo':
                    if (client.daysOverdue <= 365) return false;
                    break;
            }
        }
        
        // Filtro por probabilidade
        const probabilityFilter = document.getElementById('probability-filter');
        const probabilityValue = probabilityFilter ? probabilityFilter.value : '';
        if (probabilityValue && client.probability !== probabilityValue) {
            return false;
        }
        
        // Filtro por card
        if (currentFilter) {
            switch(currentFilter) {
                case 'atrasado':
                    if (client.daysOverdue === 0) return false;
                    break;
                case 'a-receber-dia':
                    // Simular clientes vencendo hoje
                    if (![4, 5].includes(client.id)) return false;
                    break;
                // Adicionar outros filtros conforme necessário
            }
        }
        
        // Filtro por loja
        if (currentStoreFilter) {
            // Como não temos dados de loja nos clientes mockados, 
            // vamos simular que não há clientes para essa loja específica
            return false;
        }
        
        return true;
    });
    
    filteredClients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.cpf}</td>
            <td><span class="badge badge-atraso">${client.daysOverdue} DIAS</span></td>
            <td>${client.duplicata}</td>
            <td><span class="badge badge-${client.probability}">${client.probability.toUpperCase()}</span></td>
            <td>R$ ${client.debt.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td><span class="badge badge-${client.status === 'em-dia' ? 'em-dia' : 'atraso'}">${client.status.toUpperCase()}</span></td>
            <td><button class="action-btn" onclick="showClientDetails(${client.id})">⋯</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Filtrar clientes
function filterClients() {
    renderClients();
}

// Mostrar detalhes do cliente
function showClientDetails(clientId) {
    currentClient = clientsData.find(c => c.id === clientId);
    if (!currentClient) return;
    
    // Preencher informações pessoais
    document.getElementById('client-name').textContent = currentClient.name;
    document.getElementById('client-cpf').textContent = currentClient.cpf;
    document.getElementById('client-email').textContent = currentClient.email;
    document.getElementById('client-phone').textContent = currentClient.phone;
    document.getElementById('client-ref-phone').textContent = currentClient.refPhone;
    
    // Preencher resumo financeiro
    document.getElementById('client-purchases').textContent = currentClient.purchases.length;
    document.getElementById('client-debt').textContent = `R$ ${currentClient.debt.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('client-probability').textContent = currentClient.probability.charAt(0).toUpperCase() + currentClient.probability.slice(1);
    
    // Calcular parcelas em atraso
    let parcelasEmAtraso = 0;
    currentClient.purchases.forEach(purchase => {
        purchase.parcelas.forEach(parcela => {
            if (parcela.status === 'pendente') parcelasEmAtraso++;
        });
    });
    
    document.getElementById('client-overdue-installments').textContent = parcelasEmAtraso;
    document.getElementById('client-status').textContent = currentClient.status.charAt(0).toUpperCase() + currentClient.status.slice(1);
    
    // Preencher histórico de compras
    const purchasesTbody = document.getElementById('purchases-tbody');
    purchasesTbody.innerHTML = '';
    
    currentClient.purchases.forEach(purchase => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${purchase.duplicata}</td>
            <td>R$ ${purchase.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td>${purchase.installments}</td>
            <td>${purchase.date}</td>
            <td>${purchase.company}</td>
            <td><span class="status-badge status-${purchase.status}">${purchase.status.toUpperCase()}</span></td>
        `;
        purchasesTbody.appendChild(row);
    });
    
    document.getElementById('client-modal').style.display = 'block';
}

// Selecionar compra para ação
function selectPurchaseForAction(action) {
    currentAction = action;
    
    if (currentClient.purchases.length === 1) {
        selectedPurchase = currentClient.purchases[0];
        proceedWithSelectedPurchase();
    } else {
        showPurchaseSelection();
    }
}

function showPurchaseSelection() {
    const purchaseList = document.getElementById('purchase-list');
    purchaseList.innerHTML = '';
    
    currentClient.purchases.forEach((purchase, index) => {
        const item = document.createElement('div');
        item.className = 'purchase-item';
        item.onclick = () => togglePurchaseSelection(index);
        
        item.innerHTML = `
            <input type="radio" name="purchase" value="${index}">
            <div class="parcela-info">
                <div class="parcela-valor">${purchase.duplicata} - R$ ${purchase.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                <div class="parcela-vencimento">Data: ${purchase.date} | Empresa: ${purchase.company}</div>
            </div>
        `;
        purchaseList.appendChild(item);
    });
    
    document.getElementById('purchase-selection-modal').style.display = 'block';
}

function togglePurchaseSelection(index) {
    const items = document.querySelectorAll('.purchase-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
            item.querySelector('input[type="radio"]').checked = true;
            selectedPurchase = currentClient.purchases[index];
        } else {
            item.classList.remove('selected');
            item.querySelector('input[type="radio"]').checked = false;
        }
    });
}

function proceedWithSelectedPurchase() {
    if (!selectedPurchase) {
        alert('Por favor, selecione uma compra.');
        return;
    }
    
    document.getElementById('purchase-selection-modal').style.display = 'none';
    
    if (currentAction === 'dar-baixa' || currentAction === 'renegociar' || currentAction === 'antecipar') {
        showParcelaSelection();
    } else if (currentAction === 'pix') {
        alert('PIX gerado com sucesso!');
    } else if (currentAction === 'boleto') {
        alert('Boleto gerado com sucesso!');
    } else if (currentAction === 'contestar') {
        showContestationModal();
    }
}

function showParcelaSelection() {
    const parcelaList = document.getElementById('parcela-list');
    parcelaList.innerHTML = '';
    
    const title = document.getElementById('parcela-selection-title');
    if (currentAction === 'dar-baixa') {
        title.textContent = 'Selecione uma ou mais parcelas para dar baixa:';
    } else if (currentAction === 'renegociar') {
        title.textContent = 'Selecione as parcelas para renegociar:';
    } else if (currentAction === 'antecipar') {
        title.textContent = 'Selecione as parcelas para antecipar:';
    }
    
    selectedPurchase.parcelas.forEach((parcela, index) => {
        const item = document.createElement('div');
        item.className = 'parcela-item';
        item.onclick = () => toggleParcelaSelection(index);
        
        const statusClass = parcela.status === 'pago' ? 'installment-paid' : 
                          parcela.status === 'pendente' ? 'installment-pending' : 'installment-overdue';
        
        item.innerHTML = `
            <input type="checkbox" name="parcela" value="${index}">
            <div class="parcela-info">
                <div class="parcela-valor">Parcela ${parcela.number} - R$ ${parcela.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                <div class="parcela-vencimento">Vencimento: ${parcela.dueDate} | Status: <span class="installment-status ${statusClass}">${parcela.status.toUpperCase()}</span></div>
                ${parcela.paidDate ? `<div class="parcela-vencimento">Pago em: ${parcela.paidDate}</div>` : ''}
            </div>
        `;
        parcelaList.appendChild(item);
    });
    
    document.getElementById('parcela-selection-modal').style.display = 'block';
}

function toggleParcelaSelection(index) {
    const item = document.querySelectorAll('.parcela-item')[index];
    const checkbox = item.querySelector('input[type="checkbox"]');
    
    if (checkbox.checked) {
        checkbox.checked = false;
        item.classList.remove('selected');
        selectedParcelas = selectedParcelas.filter(i => i !== index);
    } else {
        checkbox.checked = true;
        item.classList.add('selected');
        selectedParcelas.push(index);
    }
}

function proceedWithSelectedParcelas() {
    if (selectedParcelas.length === 0) {
        alert('Por favor, selecione pelo menos uma parcela.');
        return;
    }
    
    document.getElementById('parcela-selection-modal').style.display = 'none';
    
    if (currentAction === 'dar-baixa') {
        const securityModal = document.getElementById('security-modal');
        if (securityModal) securityModal.style.display = 'block';
    } else if (currentAction === 'renegociar') {
        showRenegotiationModal();
    } else if (currentAction === 'antecipar') {
        alert('Antecipação processada com sucesso!');
    }
}

// Mostrar histórico de movimentações
function showMovementHistory() {
    document.getElementById('client-modal').style.display = 'none';
    const historyModal = document.getElementById('movement-history-modal');
    if (historyModal) historyModal.style.display = 'block';
}

// Mostrar modal de renegociação
function showRenegotiationModal() {
    const renegModal = document.getElementById('renegociation-modal');
    if (renegModal) {
        renegModal.style.display = 'block';
        calculateRenegotiation();
    }
}

// Calcular renegociação
function calculateRenegotiation() {
    const entradaInput = document.getElementById('entrada-value');
    const parcelasSelect = document.getElementById('parcelas-count');
    
    if (!entradaInput || !parcelasSelect) return;
    
    const entradaValue = parseFloat(entradaInput.value) || 0;
    const parcelasCount = parseInt(parcelasSelect.value);
    const valorTotal = 17250; // Valor com juros
    
    const valorRestante = valorTotal - entradaValue;
    const valorParcela = valorRestante / parcelasCount;
    
    const resumoEntrada = document.getElementById('resumo-entrada');
    const resumoParcelas = document.getElementById('resumo-parcelas');
    const resumoTotal = document.getElementById('resumo-total');
    
    if (resumoEntrada) resumoEntrada.textContent = entradaValue.toLocaleString('pt-BR', {minimumFractionDigits: 2});
    if (resumoParcelas) resumoParcelas.textContent = `${parcelasCount}x de R$ ${valorParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    if (resumoTotal) resumoTotal.textContent = valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2});
}

// Confirmar renegociação
function confirmRenegotiation() {
    const entradaDate = document.getElementById('entrada-date');
    if (!entradaDate || !entradaDate.value) {
        alert('Por favor, informe a data da entrada.');
        return;
    }
    
    document.getElementById('renegociation-modal').style.display = 'none';
    
    // Mostrar modal de boleto gerado
    const boletoVencimento = document.getElementById('boleto-vencimento');
    const boletoModal = document.getElementById('boleto-modal');
    if (boletoVencimento) boletoVencimento.textContent = entradaDate.value;
    if (boletoModal) boletoModal.style.display = 'block';
}

// Mostrar modal de contestação
function showContestationModal() {
    const contestModal = document.getElementById('contestation-modal');
    if (contestModal) contestModal.style.display = 'block';
}

// Confirmar contestação
function confirmContestation() {
    const reason = document.querySelector('input[name="contestation-reason"]:checked');
    if (!reason) {
        alert('Por favor, selecione um motivo para a contestação.');
        return;
    }
    
    alert('Contestação registrada com sucesso!');
    document.getElementById('contestation-modal').style.display = 'none';
}

// Confirmar segurança
function confirmSecurity() {
    const password = document.getElementById('security-password');
    if (!password || password.value.length < 1 || password.value.length > 6) {
        alert('A senha deve ter entre 1 e 6 caracteres.');
        return;
    }
    
    alert('Baixa realizada com sucesso!');
    document.getElementById('security-modal').style.display = 'none';
    
    // Limpar seleções
    selectedParcelas = [];
    selectedPurchase = null;
}

// Imprimir boleto
function printBoleto() {
    window.print();
}

// Fechar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
    
    // Limpar seleções ao fechar modais
    if (modalId === 'purchase-selection-modal' || modalId === 'parcela-selection-modal') {
        selectedParcelas = [];
        selectedPurchase = null;
    }
}

// Desenhar gráficos
function drawCharts() {
    // Gráfico de recebimentos mensais
    const monthlyCtx = document.getElementById('monthlyChart');
    if (monthlyCtx) {
        const ctx = monthlyCtx.getContext('2d');
        ctx.clearRect(0, 0, monthlyCtx.width, monthlyCtx.height);
        
        // Dados mockados
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
        const values = [45000, 52000, 48000, 61000, 55000, 67000];
        const maxValue = Math.max(...values);
        
        // Desenhar barras
        const barWidth = 50;
        const barSpacing = 60;
        const chartHeight = 150;
        
        ctx.fillStyle = '#3b82f6';
        values.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = index * barSpacing + 20;
            const y = 170 - barHeight;
            
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Labels
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(months[index], x + barWidth/2, 190);
            ctx.fillText('R$ ' + (value/1000) + 'k', x + barWidth/2, y - 5);
            ctx.fillStyle = '#3b82f6';
        });
    }
    
    // Gráfico de status (pizza)
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        const ctx = statusCtx.getContext('2d');
        ctx.clearRect(0, 0, statusCtx.width, statusCtx.height);
        
        const centerX = 200;
        const centerY = 100;
        const radius = 80;
        
        const data = [
            { label: 'Em dia', value: 60, color: '#22c55e' },
            { label: 'Atrasado', value: 25, color: '#f59e0b' },
            { label: 'Inadimplente', value: 15, color: '#ef4444' }
        ];
        
        let currentAngle = 0;
        data.forEach(item => {
            const sliceAngle = (item.value / 100) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
        
        // Legenda
        let legendY = 20;
        data.forEach(item => {
            ctx.fillStyle = item.color;
            ctx.fillRect(320, legendY, 15, 15);
            ctx.fillStyle = '#1e293b';
            ctx.font = '12px Arial';
            ctx.fillText(`${item.label}: ${item.value}%`, 340, legendY + 12);
            legendY += 25;
        });
    }
    
    // Gráfico de linha (últimos 7 dias)
    const weeklyCtx = document.getElementById('weeklyChart');
    if (weeklyCtx) {
        const ctx = weeklyCtx.getContext('2d');
        ctx.clearRect(0, 0, weeklyCtx.width, weeklyCtx.height);
        
        const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        const values = [12000, 15000, 8000, 18000, 22000, 16000, 14000];
        const maxValue = Math.max(...values);
        
        const pointSpacing = 50;
        const chartHeight = 150;
        
        // Desenhar linha
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        values.forEach((value, index) => {
            const x = index * pointSpacing + 30;
            const y = 170 - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Pontos
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Labels
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(days[index], x, 190);
        });
        
        ctx.strokeStyle = '#8b5cf6';
        ctx.stroke();
    }
}

// Event listeners para fechar modais clicando fora
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
