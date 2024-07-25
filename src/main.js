let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Fetch the JSON data and generate the shop items
fetch('shopItemsData.json')
  .then(response => response.json())
  .then(data => {
    generateShop(data);
  })
  .catch(error => console.error('Error fetching shop items:', error));

let generateShop = (shopItemsData) => {
  shop.innerHTML = shopItemsData.map((item) => {
    let { id, name, price, desc, img } = item;
    let search = basket.find((x) => x.id === id) || {};
    return `
      <div id="product-id-${id}" class="item">
        <img width="220" src=${img} alt="${name}">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$${price}</h2>
            <div class="buttons">
              <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
              <div id="${id}" class="quantity">
                ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
};

let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({ id, item: 1 });
  } else {
    search.item += 1;
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined || search.item === 0) return;
  search.item -= 1;
  if (search.item === 0) {
    basket = basket.filter((x) => x.id !== id);
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerText = search.item || 0;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerText = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
