fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const categories = {};

    // Produkte nach Kategorie gruppieren
    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });

    const container = document.getElementById('product-list');

    for (const [category, items] of Object.entries(categories)) {
      // Sortieren nach Marke
      items.sort((a, b) => a.brand.localeCompare(b.brand));

      const section = document.createElement('section');
      section.innerHTML = `<h2>${category}</h2><div class="product-grid"></div>`;
      const grid = section.querySelector('.product-grid');

      items.forEach(product => {
        const productHTML = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p>${product.description}</p>
            <p><strong>${product.price.toFixed(2)} €</strong></p>
            <button 
              class="snipcart-add-item"
              data-item-id="${product.id}"
              data-item-name="${product.name}"
              data-item-price="${product.price}"
              data-item-url="/asort/"
              data-item-description="${product.description}">
              In den Warenkorb
            </button>
          </div>
        `;
        grid.innerHTML += productHTML;
      });

      container.appendChild(section);
    }
  });
