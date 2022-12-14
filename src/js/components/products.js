const catalogList = document.querySelector('.catalog-list');
const catalogMore = document.querySelector('.catalog__more');
const prodModal = document.querySelector('[data-graph-target ="prod-modal"] .modal-content');
const prodModalImage = document.querySelector('.modal-image');
const prodModalText = document.querySelector('.modal-text');
const prodModalDescr = document.querySelector('.modal-descr');
const prodModalComposition = document.querySelector('.modal-composition');
//const prodModalCart = document.querySelector('.wrap-cart')
let prodQuantity = 8;
let dataLength = null;

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

if (catalogList) {
  const loadProducts = (quantity = 5 ) => {
  fetch('../data/data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);

      dataLength = data.length;

      catalogList.innerHTML = '';

      for (let i = 0; i < dataLength; i++ ) {
        if (i < quantity) {
        let item = data[i];
        //console.log(item)

        catalogList.innerHTML += `
        <li class="catalog-list__item">
      <article class="product">
        <div class="product__image">
          <img src="${item.mainImage}" alt="${item.title}">

          <button class="product__view  btn-reset product__btn" data-graph-path="prod-modal" data-id="${item.id}" aria-label="показать инфо">
          Быстрый просмотр
    </button>

        </div>

        <div class="product__title">${item.title}</div>
        <div class="product__land">${item.land}</div>
        <div class="product__property">${item.property}</div>


        <div class="add-plus add-plus--none">
  <div class="add-plus__minus">
    <button tabindex="0" type="button" class="add-plus__btn add-plus__btn-plus">
      <span class="add-plus__svg" style="border-radius: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M5 11a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z"></path>
        </svg></span>
    </button>
  </div>
  <span class="add-plus__quantity">1</span>

  <div class="add-plus__plus">
    <button tabindex="0" type="button" class="add-plus__btn add-plus__btn-minus">
      <span class="add-plus__svg" style="border-radius: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 0 0-1-1Z">
          </path>
        </svg>

      </span>
    </button>
  </div>
</div>


        <button class="product__btn add-to-cart-btn"  data-id="${item.id}" aria-label="корзина">в корзину
</button>

      </article>
    </li>`;
        }

      }
    })
.then(() => {
  cartLogic();

  const modal = new GraphModal({
    isOpen: (modal) => {
      const openBtnId = modal.previousActiveElement.dataset.id;
      //console.log(openBtnId)
      loadModalData(openBtnId);
    },
  });
});
};
loadProducts(prodQuantity);

const loadModalData = (id = 1) => {
  fetch(`../data/data.json`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {

prodModalImage.innerHTML = '';
prodModalText.innerHTML = '';
prodModalDescr.innerHTML = '';
prodModalComposition.innerHTML = '';

for (let dataItem of data) {
  if (dataItem.id == id) {
    console.log(dataItem);

    const image = dataItem.mainImage;


    prodModalImage.innerHTML = `
    <img src="${image}" alt="">
    `;


    prodModalText.innerHTML = `
    <h1 class="view-product__name">${dataItem.title}</h1>
    <h2 class="view-product__property">${dataItem.property}
    </h2>
    <div class="view-product__price">${normalPrice(dataItem.price)} р</div>
    <div class="view-product__refine">цена указана за 100 грамм</div>

    `;
    //prodModalCart.innerHTML = `<button class="product__btn modal-to-cart-btn"  data-id="${dataItem.id}" aria-label="корзина">в корзину
    //</button>`;

    prodModalDescr.innerHTML = `
    <button class="details-accordion__control btn-reset" aria-expanded="false">
                <span class="details-accordion__title">${dataItem.title}&nbsp;&mdash; Описание&nbsp;</span>
                <span class="details-accordion__icon"></span>
              </button>
              <div class="details-accordion__content" aria-hidden="true">
  <p>${dataItem.description}</p>
              </div>
    `;
    //cartModalLogic();//чтобы корзина работала в мод.окне быстрого просмотра
    //cartLogic();//чтобы корзина работала в мод.окне быстрого просмотра

    let compositionItems = ``;
          Object.keys(dataItem.composition).forEach(function eachKey(key) {
            compositionItems +=  `<li class="prod-bottom__descr prod-chars__item">${key}: ${dataItem.composition[key]}</li>`;
          });
          prodModalComposition.innerHTML = compositionItems;
   // prodModalComposition.innerHTML = `<h2>kuku</h2><ul>${composition.join('')}</ul>`;


  }
}
//cartLogic();
  });

};


catalogMore.addEventListener('click', (e) => {
  prodQuantity = prodQuantity + 3;

  loadProducts(prodQuantity);

  if (prodQuantity => dataLength) {
    catalogMore.style.display = 'block';


  }

});

}




//work of cart
let price = 0;

const miniCartList = document.querySelector('.mini-cart__list');
const fullPrice = document.querySelector('.mini-cart__summ');
const cartCount = document.querySelector('.cart__count');
const miniCart = document.querySelector('.mini-cart');

//console.log(miniCartList)
//console.log(fullPrice)


const priceWithoutSpaces = (str) => {
  return str.replace(/\s/g, '');
};

const plusFullPrice = (currentPrice) => {
  return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice;
};

const printFullPrice = () => {
  fullPrice.textContent = `${normalPrice(price)} р`;
};
//изменение цифры в корзине
const printQuantity = (num) => {
  cartCount.textContent = num;
  console.log(cartCount)
};
const loadCartData = (id = 1) => {
  fetch('../data/data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let dataItem of data) {
        if (dataItem.id == id) {
          //console.log(dataItem);
          miniCartList.insertAdjacentHTML('afterbegin', `
            <li class="mini-cart__item" data-id="${dataItem.id}">
              <article class="mini-cart__product mini-product">
                <div class="mini-product__image">
                  <img src="${dataItem.mainImage}" alt="${dataItem.title}">
                </div>
                <div class="mini-product__content">
                  <div class="mini-product__text">
                    <h3 class="mini-product__title">${dataItem.title}</h3>
                    <span class="mini-product__price">${normalPrice(dataItem.price)} р</span>
                  </div>
                  <button class="btn-reset mini-product__delete" aria-label="Удалить товар">
                    Удалить
                    <svg>
                      <use xlink:href="img/sprite.svg#trash"></use>
                    </svg>
                  </button>
                </div>
              </article>
            </li>
          `);

          return dataItem;
        }
      }
    })
    .then((item) => {
      plusFullPrice(item.price);
      printFullPrice();
//подсчитывае просто itemы в корзине без учета какой товар по сколько раз клацнут
//значит на itemы нужно повесить id товара
      let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
      //console.log(num)

      if (num > 0) {
        cartCount.classList.add('cart__count--visible');
      }

      printQuantity(num);
    });
  };



  const cartLogic = () => {
    const productBtn = document.querySelectorAll('.add-to-cart-btn');
   // const buttonPlus = document.querySelectorAll('.add-plus__plus');
    //const buttonMinus = document.querySelectorAll('.add-plus__minus');
//console.log(buttonPlus)
   /* buttonPlus.forEach(el => {
      el.addEventListener('click', (e) => {
        const pl = e.currentTarget;
        const span = pl.previousElementSibling;
       let spanValue = span.textContent;
       let sv = parseInt(spanValue);
       for (i = sv; i < sv; i++) {
          //console.log(i)
          sv += i;
          return sv;}
        console.log(sv);})
    })*/


    productBtn.forEach(el => {
      el.addEventListener('click', (e) => {
        const you = e.target;
        const plus = you.previousElementSibling;
        const id = e.currentTarget.dataset.id;
        loadCartData(id);
        //console.log(id)
        //console.log(you)
        document.querySelector('.cart__btn').classList.remove('cart__btn--inactive');
        e.currentTarget.classList.add('add-to-cart-btn--disabled');
        e.currentTarget.textContent = 'добавлено';
        //plus.classList.remove('add-plus--none');
        //plus.classList.add('add-plus--visibility');


      });
    }
    );
miniCartList.addEventListener('click', (e) => {
  if (e.target.classList.contains('mini-product__delete')) {
    const self = e.target;
        const parent = self.closest('.mini-cart__item');
        const price = parseInt(priceWithoutSpaces(parent.querySelector('.mini-product__price').textContent));
        const id = parent.dataset.id;

        //console.log(document.querySelector(`.product__btn[data-id="${id}"]`))

       // document.querySelector(`.add-to-cart-btn[data-id="${id}"]`).classList.remove('add-to-cart-btn--disabled');

        parent.remove();

        minusFullPrice(price);
        printFullPrice();

        let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;

        if (num == 0) {
          cartCount.classList.remove('cart__count--visible');
          miniCart.classList.remove('mini-cart--visible');
          //document.querySelector('.cart__btn').classList.add('cart__btn--inactive');
        }

        printQuantity(num);
      }
    });

  }
//eng casrtlogic
//чтобы в мод.окне быстрого просмотра можно было добавлять

  const openOrderModal = document.querySelector('.mini-cart__btn');
  const orderModalList = document.querySelector('.cart-modal-order__list');
  const orderModalQuantity = document.querySelector('.cart-modal-order__quantity span');
  const orderModalSumm = document.querySelector('.cart-modal-order__summ span');
  const orderModalShow = document.querySelector('.cart-modal-order__show');
  openOrderModal.addEventListener('click', () => {
    const productsHtml = document.querySelector('.mini-cart__list').innerHTML;
    orderModalList.innerHTML = productsHtml;

    orderModalQuantity.textContent =  `${document.querySelectorAll('.mini-cart__list .mini-cart__item').length} шт`;
    orderModalSumm.textContent = fullPrice.textContent;

  });
  orderModalShow.addEventListener('click', () => {
    if (orderModalList.classList.contains('cart-modal-order__list--visible')) {
      orderModalList.classList.remove('cart-modal-order__list--visible');
      orderModalShow.classList.remove('cart-modal-order__show--active');
    } else {
      orderModalList.classList.add('cart-modal-order__list--visible');
      orderModalShow.classList.add('cart-modal-order__show--active');
    }


  });
  //remove from modal order

orderModalList.addEventListener('click', (e) => {
  if (e.target.classList.contains('mini-product__delete')) {
    //console.log('asd')
    const self = e.target;
    const parent = self.closest('.mini-cart__item');
    console.log(parent)
    const price = parseInt(priceWithoutSpaces(parent.querySelector('.mini-product__price').textContent));
    const id = parent.dataset.id;

    console.log(document.querySelector(`.product__btn[data-id="${id}"]`))

    document.querySelector(`.add-to-cart-btn[data-id="${id}"]`).classList.remove('product__btn--disabled');

    parent.style.display = 'none';

    //setTimeout(() => {
      parent.remove();

    //}, 100);

    document.querySelector(`.mini-cart__item[data-id="${id}"]`).remove();


    minusFullPrice(price);
    printFullPrice();

    setTimeout(() => {
      let num = document.querySelectorAll('.cart-modal-order__list .mini-cart__item').length;
      console.log(num);

      orderModalQuantity.textContent ='';
      orderModalSumm.textContent = '';
      orderModalQuantity.textContent = `${num} шт`;
      orderModalSumm.textContent = fullPrice.textContent;

      if (num == 0) {
        cartCount.classList.remove('cart__count--visible');
        miniCart.classList.remove('mini-cart--visible');
        document.querySelector('.cart__btn').classList.add('cart__btn--inactive');

        modal.close();
      }

      printQuantity(num);
    }, 300);


  }
});



