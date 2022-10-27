const foods = [
  {
    id: 0,
    name: 'همبرگر مخصوص',
    price: 10000,
    src: './img/hamburger.png',
  },
  {
    id: 1,
    name: 'همبرگر معمولی',
    price: 8000,
    src: './img/hamburger.png',
  },
  {
    id: 2,
    name: 'همبرگر مخصوص با قارچ و پنیر',
    price: 20000,
    src: './img/hamburger.png',
  },
  {
    id: 3,
    name: 'همبرگر معمولی با قارچ و پنیر',
    price: 10000,
    src: './img/hamburger.png',
  },
  {
    id: 4,
    name: 'سیب زمینی سرخ کرده',
    price: 10000,
    src: './img/french_fries.png',
  },
  {
    id: 5,
    name: 'سیب زمینی سرخ کرده ویژه',
    price: 25000,
    src: './img/french_fries.png',
  },
  {
    id: 6,
    name: 'نوشابه',
    price: 5000,
    src: './img/soda.png',
  },
  {
    id: 7,
    name: 'نوشابه رژیمی',
    price: 6000,
    src: './img/soda.png',
  },
  {
    id: 8,
    name: 'سالاد سزار',
    price: 25000,
    src: './img/ceasar.png',
  },
  {
    id: 9,
    name: 'سالاد فصل',
    price: 8000,
    src: './img/salad.png',
  },
];
//
function renderFood(foods) {
  const products = document.querySelector('.products');
  foods.forEach(food => {
    const html = ` <figure class="products__card d-flex gap-0">
    <div class="products__box-img">
      <img class="products__img" src="./Assets/${food.src}" alt="foods" />
    </div>
    <div class="products__detail d-flex flex-dir gap-0.5">
      <p class="products__detail--name">${food.name}</p>
      <p class="products__detail--price">
        <span id="price">${food.price}</span> تومان
      </p>
      <div class="d-flex align-center justify-between">
        <div class="d-flex align-center justify-center">
          <button class="btn btn--add d-flex" onclick="countPlus(this)">
            <ion-icon name="add-outline"></ion-icon>
          </button>
          <span class="num" id="count-${food.id}">0</span>
          <button class="btn btn--minus d-flex" onclick="countMinus(this)">
            <ion-icon name="remove-outline"></ion-icon>
          </button>
        </div>
        <div>
          <p class="products__detail--totalprice">
            <span id="total-${food.id}">0</span> تومان
          </p>
        </div>
      </div>
    </div>
  </figure>`;
    products.insertAdjacentHTML('beforeend', html);
  });
}
renderFood(foods);
const totalCost = [];
const countPlus = function (el) {
  const foodId = +el.parentElement.children[1].id.slice(-1);
  let count = +document.getElementById(`count-${foodId}`).textContent;
  document.getElementById(`count-${foodId}`).textContent = ++count;
  calculateTotal(el, count);
};
const countMinus = function (el) {
  const foodId = +el.parentElement.children[1].id.slice(-1);
  let count = +document.getElementById(`count-${foodId}`).textContent;
  if (count > 0) {
    document.getElementById(`count-${foodId}`).textContent = --count;
    decreaseTotal(el);
  }
};
const calculateTotal = function (el, count) {
  const foodId =
    +el.parentElement.parentElement.childNodes[3].childNodes[1].children[0].id.slice(
      -1
    );
  const total = document.getElementById(`total-${foodId}`);
  const price = foods[foodId].price;
  // const

  total.textContent = price * count;
  setTotalCost(price);
};
const decreaseTotal = el => {
  const foodId =
    +el.parentElement.parentElement.childNodes[3].childNodes[1].children[0].id.slice(
      -1
    );
  const total = document.getElementById(`total-${foodId}`);
  const price = foods[foodId].price;

  total.textContent = total.textContent - price;
  setTotalCosts(price);
};
let t = [];
const setTotalCost = total => {
  const all = document.getElementById('all-price');
  const services = document.getElementById('serves');
  const pay = document.getElementById('pay');
  const totalCost = total;
  t.push(totalCost);
  const totalC = t.reduce((ec, el) => {
    return ec + el;
  }, 0);
  all.textContent = totalC;

  const totalS = (services.textContent = totalC * 0.05);
  const totalPay = (pay.textContent = totalC + totalS);
  setOff(totalPay);
};

// let x = [];
const setTotalCosts = total => {
  const all = document.getElementById('all-price');
  const services = document.getElementById('serves');
  const pay = document.getElementById('pay');
  // x.push(total);
  // const totalC = x.reduce((ec, el) => {
  //   return ec + el;
  // }, 0);
  const m = all.textContent - total;
  t = [];
  t.push(m);
  all.textContent = m;

  console.log(m);
  const totalS = (services.textContent = m * 0.05);
  const totalPay = (pay.textContent = m + totalS);
  setOff(totalPay);
};

const setOff = total => {
  const offValue = document.getElementById('off-input');
  const offCheck = document.getElementById('off-check');
  const off = document.getElementById('off');
  const pay = document.getElementById('pay');
  offCheck.addEventListener('click', e => {
    e.stopPropagation();
    const check = offValue.value;
    if (check == 'gold') {
      off.textContent = 30;
      Math.abs((pay.textContent = total * 0.7));
    } else if (check == 'silver') {
      off.textContent = 20;
      Math.abs((pay.textContent = total * 0.8));
    } else if (check == 'bronze') {
      off.textContent = 10;
      Math.abs((pay.textContent = total * 0.9));
    } else {
      alert('کد اشتباه لطفا با دقت بیشتری کد را وارد کنید');
    }
  });
};
// setOff();
const modal = () => {
  const btnModal = document.querySelector('.btn--order');
  const btnOk = document.querySelector('.btn--ok');
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');

  btnModal.addEventListener('click', () => {
    overlay.className = 'overlay show';
    modal.className = 'show d-flex flex-dir align-center gap-3 pad-4';
  });
  overlay.addEventListener('click', () => {
    overlay.className = 'overlay hide';
    location.reload();
  });
  btnOk.addEventListener('click', () => {
    overlay.className = 'overlay hide';
    modal.className = 'hide d-flex flex-dir align-center gap-3 pad-4';
    location.reload();
  });
};
modal();

// document.querySelector(".btn--order").disabled = true
