var goods = []; // 当前页的商品列表
var totItems = 0; // 总商品数
var curPage = 1; // 当前页码
var totPages = 1; // 总页数

var selectTotal = 0; // 选中商品总数
var curSelectGoods = [];  // 选中的商品列表
var selectAllStatus = false;  // 是否全选

const initCurSelectGoods = () => { 
  curSelectGoods = [];
  selectTotal = 0;
  const curSelectBox = document.querySelector('#cur-select');
  curSelectBox.innerHTML = selectTotal;
  const totPriceBox = document.querySelector('#sum');
  totPriceBox.innerHTML = 0;
}

const initPagnation = () => {
  const pagination = document.querySelector('#pagination');
  pagination.innerHTML = '';
  for (let i = 0; i <= totPages + 1; i++) {
    if (i === 0) {
      const prev = document.createElement('i');
      prev.classList.add('fa-solid', 'fa-chevron-left', 'page-prev');
      if (curPage === 1) {
        prev.disabled = true;
      }
      prev.addEventListener('click', () => {
        if (curPage > 1) {
          changePagnation(curPage - 1);
        }
      });
      pagination.appendChild(prev);
      continue;
    }
    else if (i === totPages + 1) {
      const next = document.createElement('i');
      next.classList.add('fa-solid', 'fa-chevron-right', 'page-next');
      if (curPage === totPages) {
        next.disabled = true;
      }
      next.addEventListener('click', () => {
        if (curPage < totPages) {
          changePagnation(curPage + 1);
        }
      });
      pagination.appendChild(next);
      continue;
    }
    const page = document.createElement('div');
    page.innerHTML = i;
    page.classList.add('page');
    if (i === curPage) {
      page.classList.add('active-page');
    }
    page.addEventListener('click', changePage);
    pagination.appendChild(page);
  }
}

const initGoods = () => {
  fetch('cart.json')
    .then(response => response.json())
    .then(data => {
      curPage = data.currentPage;
      totPages = data.totPage;
      totItems = data.totItems;
      initPagnation();
      goods = data.pages[curPage - 1]["items"];
      renderCartList();
    }
  );
};

const renderCartList = () => {
  const goodsContainer = document.querySelector('#container');
  goodsContainer.innerHTML = '';
  if (goods.length === 0 && totItems !== 0) {
    // 如果购物车本页没有商品（通过删除删空的情况或意外情况），应该重新请求数据，初始化购物车
    initGoods();
  }
  else if (totItems === 0) { 
    // 如果购物车没有商品，应该显示空购物车
    goodsContainer.innerHTML = '<div class="empty-cart">购物车为空`(*>﹏<*)′</div>';
    return;
  }
  for (let i = 0; i < goods.length; i++) {
    const good = goods[i];
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('id', "item-" + good["id"]);
    cartItem.innerHTML = `<input type="checkbox" onClick="selectGood(${good["id"]})">
          <img src="${good["image"]}" onerror="onerror=null;src='https://s1.hdslb.com/bfs/static/webssr/article/empty.png'" alt="">
          <div class="item-info">
            <h2>商品名称：${good["name"]}</h2>
            <div class="info">
              <div class="desp">
                商品描述：<span>${good["description"]}</span>
              </div>
              <div class="detail">
                <div class="price">单价：<span><i class="fa-solid fa-yen-sign"></i>
                  <span>${good["price"].toFixed(2)}</span>
                </span></div>
                <div class="price">小计：<span><i class="fa-solid fa-yen-sign"></i>
                  <span class="tot-price">${(good["price"] * good["quantity"]).toFixed(2)}</span>
                </span></div>
                <div class="quantity">
                  数量：
                  <span class="count">
                    <i class="fa-solid fa-circle-minus" onClick="changeQuantity(${good["id"]}, -1)"></i>
                    <span>${good["quantity"]}</span>
                    <i class="fa-solid fa-circle-plus" onClick="changeQuantity(${good["id"]}, 1)"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button class="del-btn" onClick="delItem(${good["id"]})">删除</button>`;
    goodsContainer.appendChild(cartItem);
  }
}

const delItem = (id) => {
  const item = document.querySelector('#item-' + id);
  item.remove();
  // 这里应该发送请求删除数据，这里只是模拟，直接删除
  goods = goods.filter(good => good["id"] !== id);
  renderCartList();
  if (curSelectGoods.find(good => good["id"] === id)) {
    selectTotal -= parseInt(item.querySelector('.count span').innerHTML);
    curSelectGoods = curSelectGoods.filter(good => good["id"] !== id);
    updateTotalCount();
  }
}

const selectGood = (id) => {
  const item = document.querySelector('#item-' + id);
  const checkbox = item.querySelector('input[type="checkbox"]');
  const price = item.querySelector('.tot-price');
  const quantity = item.querySelector('.count span');
  if(checkbox.checked) {
    selectTotal += parseInt(quantity.innerHTML);
    curSelectGoods.push({ id: id, price: parseFloat(price.innerHTML) });
    updateTotalCount();
  } else {
    selectTotal -= parseInt(quantity.innerHTML);
    curSelectGoods = curSelectGoods.filter(good => good["id"] !== id);
    updateTotalCount();
  }
  if(curSelectGoods.length === goods.length) {
    selectAllStatus = true;
    const selectAll = document.querySelector('#select-all');
    const icon = selectAll.querySelector('i');
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  }
  else {
    selectAllStatus = false;
    const selectAll = document.querySelector('#select-all');
    const icon = selectAll.querySelector('i');
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
}

const updateTotalCount = () => {
  const curSelectBox = document.querySelector('#cur-select');
  if (selectTotal) {
    curSelectBox.innerHTML = selectTotal;
  }
  else {
    curSelectBox.innerHTML = 0;
  }
  const totPriceBox = document.querySelector('#sum');
  if (curSelectGoods.length) {
    totPriceBox.innerHTML = curSelectGoods.reduce((acc, cur) => acc + cur["price"], 0).toFixed(2);
  }
  else {
    totPriceBox.innerHTML = 0;
  }
}

const changePagnation = (pageNo) => {
  const page = document.querySelector('.active-page');
  page.classList.remove('active-page');
  const pageArr = document.querySelectorAll('.page');
  curPage = parseInt(pageNo);
  pageArr[curPage - 1].classList.add('active-page');
  changeCartList();
}

const changeCartList = () => {
  fetch('cart.json')
    .then(response => response.json())
    .then(data => {
      goods = data.pages[curPage - 1]["items"];
      renderCartList();
    }
  );
}

const changePage = (e) => {
  changePagnation(e.target.innerHTML);
  // 按照正常的分页逻辑，这里应该重新请求数据，这里只是模拟，所以直接取数据
  changeCartList();
}

const changeQuantity = (id, cnt) => {
  const item = document.querySelector('#item-' + id);
  const count = item.querySelector('.count span');
  const price = item.querySelector('.tot-price');
  const quantity = parseInt(count.innerHTML);
  if (quantity + cnt <= 0) {
    delItem(id);
    return;
  }
  count.innerHTML = quantity + cnt;
  price.innerHTML = (parseFloat(price.innerHTML) + cnt * goods.find(good => good["id"] === id)["price"]).toFixed(2);
  // 这里应该发送请求修改数据，这里只是模拟，直接修改
  goods = goods.map(good => {
    if (good["id"] === id) {
      good["quantity"] = quantity + cnt;
    }
    return good;
  });
  if (curSelectGoods.find(good => good["id"] === id)) {
    selectTotal += cnt;
    curSelectGoods = curSelectGoods.map(good => {
      if (good["id"] === id) {
        good["price"] = parseFloat(price.innerHTML);
      }
      return good;
    });
    updateTotalCount();
  }
}

const setSelectAll = () => {
  const selectAll = document.querySelector('#select-all');
  selectAll.addEventListener('click', () => {
    const items = document.querySelectorAll('.cart-item');
    if (!selectAllStatus) {
      selectTotal = 0;
      curSelectGoods = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.querySelector('input[type="checkbox"]').checked = true;
        selectTotal += parseInt(item.querySelector('.count span').innerHTML);
        curSelectGoods.push({ id: parseInt(item.getAttribute('id').split('-')[1]), price: parseFloat(item.querySelector('.tot-price').innerHTML) });
      }
      const icon = selectAll.querySelector('i');
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    }
    else {
      for (let i = 0; i < items.length; i++) {
        items[i].querySelector('input[type="checkbox"]').checked = false;
      }
      selectTotal = 0;
      curSelectGoods = [];
      const icon = selectAll.querySelector('i');
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
    updateTotalCount();
    selectAllStatus = !selectAllStatus;
  });
}

const setPay = () => {
  const payBtn = document.querySelector('#pay');
  payBtn.addEventListener('click', () => {
    if (curSelectGoods.length === 0) {
      alert('请选择商品后结算', 'error');
      return;
    }
    // 这里应该发送请求支付，这里只是模拟，直接删除
    goods = goods.filter(good => !curSelectGoods.find(select => select["id"] === good["id"]));
    curSelectGoods = [];
    selectTotal = 0;
    updateTotalCount();
    if (goods.length === 0) {
      initGoods();
    }
    else {
      renderCartList();
    }
    alert('支付成功', 'success');
  });
}

const initPage = () => {
  initCurSelectGoods();
  initGoods();
  setSelectAll();
  setPay();
  setSearch();
}

window.onload =()=>{
  initPage();
}

const alert = (msg, type) => {
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert-box');
  alertBox.innerHTML = msg;
  if (type === 'success') {
    alertBox.classList.add('alert-success');
  }
  else if (type === 'error') {
    alertBox.classList.add('alert-error');
  }
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 2000);
}

const setSearch = () => {
  // 回车搜索
  const searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      search();
    }
  });
}

const search = () => {
  const searchInput = document.querySelector('#search-input');
  const keyword = searchInput.value;
  fetch('cart.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      goods = data.pages[curPage - 1]["items"].filter(good => good["name"].includes(keyword));
      renderCartList();
    }
  );
}

