/* =========================
   MENU RESPONSIVO
========================= */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    
    const isActive = navMenu.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isActive);
  });
}

/* =========================
   CARROSSEL PRINCIPAL (HERO)
========================= */
const heroCarousel = document.querySelector('.carousel');

if (heroCarousel) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");

    index = i;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);
}

/* =========================
   CARROSSEL DE NOTÍCIAS
========================= */
const newsTrack = document.querySelector('.news-track');

if (newsTrack) {
  const btnPrev = document.querySelector('.news-btn.prev');
  const btnNext = document.querySelector('.news-btn.next');

  btnNext.addEventListener('click', () => {
    const cardWidth = newsTrack.querySelector('.news-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(newsTrack).gap) || 0;
    newsTrack.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  });

  btnPrev.addEventListener('click', () => {
    const cardWidth = newsTrack.querySelector('.news-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(newsTrack).gap) || 0;
    newsTrack.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
  });
}

/* =========================
   PÁGINA: TRANSPARÊNCIA (FILTRO E TABELA DINÂMICA)
========================= */
const tableBody = document.getElementById("tableBody");

if (tableBody) {
  
  const transparenciaData = [
    { data: "10/03/2026", categoria: "Licitações", descricao: "Pregão Eletrônico 012/2026 - Aquisição de computadores para a rede municipal de ensino", valor: "154.300,00" },
    { data: "08/03/2026", categoria: "Contratos", descricao: "Contrato de prestação de serviços de limpeza urbana (Empresa LixLimp)", valor: "89.000,00" },
    { data: "05/03/2026", categoria: "Despesas", descricao: "Pagamento de folha salarial - Servidores da Saúde", valor: "450.000,00" },
    { data: "02/03/2026", categoria: "Licitações", descricao: "Tomada de Preços 005/2026 - Reforma da Praça Central", valor: "320.000,00" },
    { data: "28/02/2026", categoria: "Despesas", descricao: "Manutenção e abastecimento da frota de ambulâncias", valor: "12.450,00" },
    { data: "25/02/2026", categoria: "Contratos", descricao: "Aditivo de contrato - Fornecimento de merenda escolar", valor: "55.200,00" }
  ];

  const searchInput = document.getElementById("searchInput");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const noResultsMsg = document.getElementById("noResults");

  function renderTable(data) {
    tableBody.innerHTML = ""; 

    if (data.length === 0) {
      noResultsMsg.classList.remove("hidden");
    } else {
      noResultsMsg.classList.add("hidden");
      
      data.forEach(item => {
        const badgeClass = item.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const tr = document.createElement("tr");
        
        tr.innerHTML = `
          <td data-label="Data">${item.data}</td>
          <td data-label="Categoria"><span class="badge ${badgeClass}">${item.categoria}</span></td>
          <td data-label="Descrição">${item.descricao}</td>
          <td data-label="Valor (R$)">R$ ${item.valor}</td>
          <td data-label="Documento"><a href="#" class="doc-link">Ver PDF 📄</a></td>
        `;
        tableBody.appendChild(tr);
      });
    }
  }

  function filterData() {
    const searchText = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector(".filter-btn.active").getAttribute("data-filter");

    const filteredData = transparenciaData.filter(item => {
      const matchesSearch = item.descricao.toLowerCase().includes(searchText) || item.valor.includes(searchText);
      const matchesCategory = activeCategory === "Todos" || item.categoria === activeCategory;

      return matchesSearch && matchesCategory;
    });

    renderTable(filteredData);
  }

  searchInput.addEventListener("input", filterData);

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      filterData();
    });
  });

  renderTable(transparenciaData);
}