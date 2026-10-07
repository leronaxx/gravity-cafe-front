function setupNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.mobile-menu');
  const links = mobile ? mobile.querySelectorAll('a') : [];

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll);
  onScroll();

  toggle?.addEventListener('click', () => {
    mobile?.classList.toggle('open');
  });

  links.forEach((link) =>
    link.addEventListener('click', () => {
      mobile?.classList.remove('open');
    }),
  );
}

function animateHeroReveal() {
  const items = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!items.length) return;
  items.forEach((el, index) => {
    setTimeout(() => el.classList.add('show'), 140 * index + 100);
  });
}

function initMenuPage() {
  const grid = document.getElementById('menu-grid');
  const tabContainer = document.getElementById('menu-tabs');
  if (!grid || !tabContainer) return;

  const menuItems = [
    { id: '1', name: 'Капучино', description: 'Классический итальянский кофе с молочной пенкой', price: 250, category: 'drinks', image: 'public/cappuccino-coffee-cup.png', prepTime: 5 },
    { id: '2', name: 'Латте', description: 'Нежный кофе с большим количеством молока', price: 280, category: 'drinks', image: 'public/latte-coffee-art.jpg', prepTime: 5 },
    { id: '3', name: 'Эспрессо', description: 'Крепкий итальянский кофе', price: 200, category: 'drinks', image: 'public/espresso-coffee.jpg', prepTime: 3 },
    { id: '4', name: 'Раф кофе', description: 'Авторский кофе со сливками и ванилью', price: 320, category: 'drinks', image: 'public/raf-coffee-cream.jpg', prepTime: 7 },
    { id: '5', name: 'Матча латте', description: 'Японский зелёный чай с молоком', price: 350, category: 'drinks', image: 'public/matcha-latte-green.jpg', prepTime: 6 },
    { id: '6', name: 'Свежевыжатый сок', description: 'Апельсиновый или грейпфрутовый', price: 300, category: 'drinks', image: 'public/fresh-orange-juice.png', prepTime: 5 },
    { id: '7', name: 'Тирамису', description: 'Классический итальянский десерт с маскарпоне', price: 450, category: 'desserts', image: 'public/classic-tiramisu.png', prepTime: 5 },
    { id: '8', name: 'Чизкейк Нью-Йорк', description: 'Нежный сырный торт с ягодным соусом', price: 480, category: 'desserts', image: 'public/new-york-cheesecake.png', prepTime: 5 },
    { id: '9', name: 'Шоколадный фондан', description: 'Горячий шоколадный десерт с жидкой начинкой', price: 520, category: 'desserts', image: 'public/chocolate-fondant-lava-cake.jpg', prepTime: 15 },
    { id: '10', name: 'Панна котта', description: 'Итальянский десерт с ягодами', price: 420, category: 'desserts', image: 'public/panna-cotta-berries.jpg', prepTime: 5 },
    { id: '11', name: 'Макаронс', description: 'Французское миндальное печенье, 3 шт', price: 380, category: 'desserts', image: 'public/french-macarons-colorful.jpg', prepTime: 3 },
    { id: '12', name: 'Штрудель', description: 'Яблочный штрудель с мороженым', price: 440, category: 'desserts', image: 'public/apple-strudel-ice-cream.jpg', prepTime: 10 },
    { id: '13', name: 'Круассан с лососем', description: 'Свежий круассан с слабосолёным лососем и сливочным сыром', price: 550, category: 'meals', image: 'public/croissant-salmon-cream-cheese.jpg', prepTime: 10 },
    { id: '14', name: 'Авокадо тост', description: 'Тост с авокадо, яйцом пашот и микрозеленью', price: 480, category: 'meals', image: 'public/avocado-toast-poached-egg.png', prepTime: 12 },
    { id: '15', name: 'Паста Карбонара', description: 'Классическая итальянская паста с беконом', price: 680, category: 'meals', image: 'public/pasta-carbonara.png', prepTime: 20 },
    { id: '16', name: 'Цезарь с курицей', description: 'Салат с курицей, пармезаном и соусом цезарь', price: 620, category: 'meals', image: 'public/caesar-salad-chicken.jpg', prepTime: 15 },
    { id: '17', name: 'Бургер с говядиной', description: 'Сочный бургер с мраморной говядиной и картофелем фри', price: 750, category: 'meals', image: 'public/gourmet-beef-burger-fries.jpg', prepTime: 25 },
    { id: '18', name: 'Киш Лорен', description: 'Французский открытый пирог с беконом и сыром', price: 520, category: 'meals', image: 'public/quiche-lorraine.png', prepTime: 15 },
  ];

  const categories = [
    { id: 'drinks', label: 'Напитки', icon: '☕' },
    { id: 'desserts', label: 'Десерты', icon: '🍰' },
    { id: 'meals', label: 'Основные блюда', icon: '🍽️' },
  ];

  const timeSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];
  const areas = [
    { id: 'indoor', name: 'Внутренний зал' },
    { id: 'terrace', name: 'Терраса' },
    { id: 'outdoor', name: 'Открытая площадка' },
  ];

  const state = { active: 'drinks', cart: [], maxPrep: 0 };

  const cartOverlay = document.getElementById('cart-overlay');
  const cartPanel = document.getElementById('cart-panel');
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const prepTime = document.getElementById('prep-time');
  const cartTotal = document.getElementById('cart-total');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const orderForm = document.getElementById('order-form');
  const orderDate = document.getElementById('order-date');
  const orderTime = document.getElementById('order-time');
  const orderArea = document.getElementById('order-area');
  const orderTable = document.getElementById('order-table');
  const orderName = document.getElementById('order-name');
  const orderPhone = document.getElementById('order-phone');
  const confirmation = document.getElementById('order-confirmation');
  const newOrderBtn = document.getElementById('new-order');
  const closeConfirmBtn = document.getElementById('close-confirmation');
  const orderSaveBtn = document.getElementById('order-save');
  const orderSaveNote = document.getElementById('order-save-note');

  if (orderDate) {
    orderDate.min = new Date().toISOString().split('T')[0];
  }

  timeSlots.forEach((slot) => {
    const option = document.createElement('option');
    option.value = slot;
    option.textContent = slot;
    orderTime?.appendChild(option);
  });

  areas.forEach((area) => {
    const option = document.createElement('option');
    option.value = area.id;
    option.textContent = area.name;
    orderArea?.appendChild(option);
  });

  function renderTabs() {
    tabContainer.innerHTML = '';
    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.className = `tab-button ${state.active === cat.id ? 'active' : ''}`;
      btn.textContent = `${cat.icon} ${cat.label}`;
      btn.addEventListener('click', () => {
        state.active = cat.id;
        renderTabs();
        renderMenu();
      });
      tabContainer.appendChild(btn);
    });
  }

  function renderMenu() {
    grid.innerHTML = '';
    menuItems
      .filter((item) => item.category === state.active)
      .forEach((item) => {
        const card = document.createElement('article');
        card.className = 'card menu-card';
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="menu-body">
            <div class="badge">${item.prepTime} мин</div>
            <h3>${item.name}</h3>
            <p class="muted">${item.description}</p>
            <div class="menu-meta">
              <div class="price">${item.price} ₽</div>
              <button class="btn btn-primary" data-id="${item.id}">Добавить</button>
            </div>
          </div>
        `;
        const addBtn = card.querySelector('button');
        addBtn?.addEventListener('click', () => addToCart(item.id));
        grid.appendChild(card);
      });
  }

  function updateCart() {
    const totalItems = state.cart.reduce((sum, entry) => sum + entry.qty, 0);
    cartCount.textContent = String(totalItems);
    cartItems.innerHTML = '';

    if (!state.cart.length) {
      cartEmpty.style.display = 'block';
      prepTime.textContent = '0 минут';
      cartTotal.textContent = '0 ₽';
      return;
    }

    cartEmpty.style.display = 'none';
    let total = 0;
    state.maxPrep = 0;

    state.cart.forEach((entry) => {
      const item = menuItems.find((m) => m.id === entry.id);
      if (!item) return;
      total += item.price * entry.qty;
      state.maxPrep = Math.max(state.maxPrep, item.prepTime);

      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <div class="menu-meta" style="margin-bottom: 6px;">
            <strong>${item.name}</strong>
            <span class="muted small">${item.prepTime} мин</span>
          </div>
          <div class="muted small">${item.price} ₽</div>
        </div>
        <div class="qty">
          <button aria-label="Убрать">-</button>
          <span>${entry.qty}</span>
          <button aria-label="Добавить">+</button>
        </div>
      `;
      const [minus, , plus] = el.querySelectorAll('button');
      minus?.addEventListener('click', () => changeQuantity(entry.id, -1));
      plus?.addEventListener('click', () => changeQuantity(entry.id, 1));
      cartItems.appendChild(el);
    });

    prepTime.textContent = `${state.maxPrep} минут`;
    cartTotal.textContent = `${total} ₽`;
  }

  function addToCart(id) {
    const existing = state.cart.find((c) => c.id === id);
    if (existing) existing.qty += 1;
    else state.cart.push({ id, qty: 1 });
    updateCart();
  }

  function changeQuantity(id, delta) {
    state.cart = state.cart
      .map((entry) => (entry.id === id ? { ...entry, qty: entry.qty + delta } : entry))
      .filter((entry) => entry.qty > 0);
    updateCart();
  }

  function openCart() {
    cartOverlay?.classList.add('open');
    cartPanel?.classList.add('open');
  }

  function closeCart() {
    cartOverlay?.classList.remove('open');
    cartPanel?.classList.remove('open');
  }

  function calcReadyTime(arrival, minutes) {
    if (!arrival || !minutes) return '';
    const [h, m] = arrival.split(':').map(Number);
    let totalMinutes = h * 60 + m - minutes;
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    const readyH = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');
    const readyM = (totalMinutes % 60).toString().padStart(2, '0');
    return `${readyH}:${readyM}`;
  }

  openCartBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);
  orderSaveBtn?.addEventListener('click', () => {
    if (orderSaveNote) {
      orderSaveNote.style.display = 'block';
      setTimeout(() => {
        orderSaveNote.style.display = 'none';
      }, 2400);
    }
  });

  orderForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.cart.length) {
      alert('Добавьте блюда в корзину, чтобы оформить предзаказ.');
      return;
    }

    const name = orderName?.value || '';
    const date = orderDate?.value || '';
    const time = orderTime?.value || '';
    const area = areas.find((a) => a.id === (orderArea?.value || ''))?.name || '';
    const table = orderTable?.value || '';

    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-date').textContent = date;
    document.getElementById('confirm-time').textContent = time;
    document.getElementById('confirm-area').textContent = area;
    document.getElementById('confirm-table').textContent = table;
    document.getElementById('confirm-total').textContent = cartTotal?.textContent || '';
    document.getElementById('confirm-ready').textContent = calcReadyTime(time, state.maxPrep);

    orderForm.style.display = 'none';
    confirmation.style.display = 'block';
  });

  newOrderBtn?.addEventListener('click', () => {
    state.cart = [];
    updateCart();
    orderForm?.reset();
    orderForm.style.display = 'block';
    confirmation.style.display = 'none';
  });

  closeConfirmBtn?.addEventListener('click', () => {
    closeCart();
  });

  renderTabs();
  renderMenu();
  updateCart();
}

function initReservationPage() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  const areaButtons = Array.from(document.querySelectorAll('[data-area]'));
  const tableGrid = document.getElementById('table-grid');
  const timeSelect = document.getElementById('res-time');
  const dateInput = document.getElementById('res-date');
  const guestsSelect = document.getElementById('res-guests');
  const successBlock = document.getElementById('reservation-success');
  const newReservationBtn = document.getElementById('new-reservation');

  const successArea = document.getElementById('success-area');
  const successDate = document.getElementById('success-date');
  const successTime = document.getElementById('success-time');
  const successGuests = document.getElementById('success-guests');
  const successTable = document.getElementById('success-table');
  const successPhone = document.getElementById('success-phone');

  const areas = {
    indoor: { name: 'Внутренний зал', tables: [1, 2, 3, 4, 5, 6, 7, 8] },
    terrace: { name: 'Терраса', tables: [9, 10, 11, 12, 13, 14] },
    outdoor: { name: 'Открытая площадка', tables: [15, 16, 17, 18, 19, 20] },
  };

  const timeSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];

  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  timeSlots.forEach((slot) => {
    const option = document.createElement('option');
    option.value = slot;
    option.textContent = slot;
    timeSelect?.appendChild(option);
  });

  let selectedArea = '';
  let selectedTable = null;

  function highlightAreas() {
    areaButtons.forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.area === selectedArea);
    });
  }

  function renderTables() {
    if (!tableGrid) return;
    tableGrid.innerHTML = '';
    if (!selectedArea) return;
    areas[selectedArea].tables.forEach((table) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn ${selectedTable === table ? 'btn-primary' : ''}`;
      btn.textContent = `Столик ${table}`;
      btn.addEventListener('click', () => {
        selectedTable = table;
        renderTables();
      });
      tableGrid.appendChild(btn);
    });
  }

  areaButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedArea = btn.dataset.area || '';
      selectedTable = null;
      highlightAreas();
      renderTables();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value;
    const phone = document.getElementById('res-phone').value;
    const date = dateInput?.value;
    const time = timeSelect?.value;
    const guests = guestsSelect?.value;

    if (!selectedArea || !selectedTable) {
      alert('Пожалуйста, выберите зону и столик.');
      return;
    }

    successArea.textContent = areas[selectedArea].name;
    successDate.textContent = date;
    successTime.textContent = time;
    successGuests.textContent = guests;
    successTable.textContent = selectedTable;
    successPhone.textContent = phone;

    form.style.display = 'none';
    successBlock.style.display = 'block';
  });

  newReservationBtn?.addEventListener('click', () => {
    form.reset();
    selectedArea = '';
    selectedTable = null;
    highlightAreas();
    renderTables();
    form.style.display = 'block';
    successBlock.style.display = 'none';
  });
}

// Init all scripts when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  initMenuPage();
  initReservationPage();
  animateHeroReveal();
});
