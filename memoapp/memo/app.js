'use strict';
const account1 = {
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  pin: 1,
  username: 'a',
  movementsDatails: [
    'buy clothes',
    'food',
    'bus',
    'credit card',
    'food',
    'bus',
    'food',
    'bus',
  ],
};
class account {
  username;
  movements;
  pin;
  movementsDatails;
  constructor(username, pin) {
    this.username = username;
    this.pin = pin;
    this.movements = [];
    this.movementsDatails = [];
  }
}

const accounts = [account1];

const Welcome = document.querySelector('.text');
const btToLog = document.querySelector('.toLogin');
const btToLogcan = document.querySelector('.cancellogin');
const menuLog = document.querySelector('.menu_login');
const btToSign = document.querySelector('.toSignup');
const btToSigncan = document.querySelector('.cancelsignin');
const menuSign = document.querySelector('.menu-Register');

const logName = document.querySelector('.logUser');
const logPass = document.querySelector('.logPass');
const signName = document.querySelector('.SignUser');
const signPass = document.querySelector('.SignPass');

const btnLog = document.querySelector('.btn_login');
const mainMenu = document.querySelector('.container');
const historyMovements = document.querySelector('.movements');
const btnLogOut = document.querySelector('.btn_logout');

const incomeMenu = document.querySelector('.income');
const spendMenu = document.querySelector('.spend');
const btnlogOut = document.querySelector('.btn_logout');
const emptymove = document.querySelector('.movements__date');

const register = document.querySelector('.btn_Register');
const sumIn = document.querySelector('.summary_valuein');
const sumOut = document.querySelector('.summary_valueout');

const btnEarn = document.querySelector('.income_earn');
const valueEarn = document.querySelector('.incomecon');
const btnSpend = document.querySelector('.spend_spend');
const valueSpend = document.querySelector('.spendcon');

const textIn = document.querySelector('#detailincome');
const textOut = document.querySelector('#detailspend');
// ------------------------------------------------------------
//显示登录注册画面
btToLog.addEventListener('click', function (e) {
  e.preventDefault();
  menuLog.classList.toggle('hidden');
  menuSign.classList.add('hidden');
});
btToLogcan.addEventListener('click', function (e) {
  e.preventDefault();
  logName.value = logPass.value = '';
  menuLog.classList.toggle('hidden');
});

btToSign.addEventListener('click', function (e) {
  e.preventDefault();
  menuSign.classList.toggle('hidden');
  menuLog.classList.add('hidden');
});
btToSigncan.addEventListener('click', function (e) {
  e.preventDefault();
  signName.value = signPass.value = '';
  menuSign.classList.toggle('hidden');
});
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    logName.value = logPass.value = '';
    menuLog.classList.add('hidden');

    signName.value = signPass.value = '';
    menuSign.classList.add('hidden');
  }
});
// ------------------------------------------------------------
//登录
let currentUser;
btnLog.addEventListener('click', function (user) {
  user.preventDefault();

  currentUser = accounts.find(acc => acc.username === logName.value);
  if (currentUser?.pin === Number(logPass.value)) {
    //更改标题内容
    Welcome.textContent = `Welcome Back ${
      currentUser.username.slice(0, 1)[0].toUpperCase() +
      currentUser.username.slice(1)
    }`;
  }
  //清楚用户名
  logName.value = '';
  logPass.value = '';

  //显示历史记录
  displaymoments(currentUser);
  amountCal(currentUser);

  //隐藏界面
  mainMenu.classList.remove('hidden');
  incomeMenu.classList.remove('hidden');
  spendMenu.classList.remove('hidden');
  btnlogOut.classList.remove('hidden');

  menuSign.classList.add('hidden');
  menuLog.classList.add('hidden');
  btToLog.style.opacity = 0;
  btToSign.style.opacity = 0;
});

// ------------------------------------------------------------
//注册
register.addEventListener('click', function (user) {
  user.preventDefault();

  menuLog.classList.add('hidden');
  const orignalName = signName.value;
  const createUser = orignalName.toLowerCase().trim().split(/\s+/).join('');
  if (orignalName.includes(' ')) {
    alert('用户名输入不正确，已修改');
    signName.value = createUser;
    return;
  } else if (accounts.find(a => a.username === createUser)) {
    alert('用户名重复');
    return;
  }

  const createPin = Number(signPass.value.trim());
  if (isNaN(createPin)) {
    alert('密码必须是数字');
    return;
  }

  const newUser = new account(createUser, createPin);
  accounts.push(newUser);

  //用户更改
  currentUser = newUser;

  Welcome.textContent = `Welcome Back ${
    currentUser.username.slice(0, 1)[0].toUpperCase() +
    currentUser.username.slice(1)
  }`;
  //显示历史记录
  displaymoments(currentUser);
  amountCal(currentUser);
  //界面更新
  mainMenu.classList.remove('hidden');
  incomeMenu.classList.remove('hidden');
  spendMenu.classList.remove('hidden');
  btnlogOut.classList.remove('hidden');
  menuSign.classList.add('hidden');

  btToLog.style.opacity = 0;
  btToSign.style.opacity = 0;

  signName.value = '';
  signPass.value = '';
});
// ------------------------------------------------------------
//placeholder监听
const watchPH = function (btn) {
  //监听锁定焦点事件
  btn.addEventListener('focus', function () {
    this.dataset.placeholder = this.placeholder;
    this.placeholder = '';
  });

  // 监听失去焦点事件
  btn.addEventListener('blur', function () {
    if (this.value === '') {
      this.placeholder = this.dataset.placeholder;
    }
  });
};
watchPH(logName);
watchPH(logPass);
watchPH(signPass);
watchPH(signName);
// ------------------------------------------------------------

const displaymoments = function (user) {
  historyMovements.innerHTML = '';
  const movements = user.movements;
  const movementsDatails = user.movementsDatails;
  if (movements?.length === 0) {
    const empty = `
    <div class="movements__row movements_in ">
                  <div class="movements__type movements__type--in"></div>
                  <div class="movements__date"> 記録なし</div>
                  <div class="movements__value"></div>
                </div>`;
    historyMovements.insertAdjacentHTML('afterbegin', empty);
    return;
  }

  movements.forEach(function (mov, i) {
    console.log(mov);
    const type = mov > 0 ? 'Income 💰' : 'Expenditure 😒';

    const html = `
                  <div class="movements__row movements_${type} ">
                    <div class="movements__type movements__type--${type}">${
      i + 1
    }.  ${type}</div>
                    <div class="movements__date">${
                      user.movementsDatails[i]
                    } </div>
                    <div class="movements__value">${mov}€</div>
                  </div>
                `;
    historyMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// ------------------------------------------------------------
//amount
const amountCal = function (user) {
  sumIn.textContent = user.movements
    .filter(mov => mov > 0)
    .reduce((acc, res) => Math.round(acc + res), 0);

  sumOut.textContent = user.movements
    .filter(mov => mov < 0)
    .reduce((acc, res) => Math.round(acc + res), 0);
};

//logout
btnLogOut.addEventListener('click', function () {
  Welcome.textContent = 'Welcome';
  document.querySelectorAll('.movements__row').forEach(function (mov) {
    mov.remove();
  });
  mainMenu.classList.add('hidden');
  incomeMenu.classList.add('hidden');
  spendMenu.classList.add('hidden');
  btnlogOut.classList.add('hidden');
  menuSign.classList.add('hidden');

  btToLog.style.opacity = 100;
  btToSign.style.opacity = 100;
});

//add money
btnEarn.addEventListener('click', function (user) {
  user.preventDefault();

  const MoneyEarn = Number(valueEarn.value);
  currentUser.movements.push(MoneyEarn);
  const newIn = textIn.value;
  currentUser.movementsDatails.push(newIn);
  updateUI(currentUser);
  valueEarn.value = '';
  textIn.value = '';
});

//spend money
btnSpend.addEventListener('click', function (user) {
  user.preventDefault();

  const moenySpend = Number(valueSpend.value);
  currentUser.movements.push(-moenySpend);
  const newOut = textOut.value;
  currentUser.movementsDatails.push(newOut);
  updateUI(currentUser);
  valueSpend.value = '';
  textOut.value = '';
});

const updateUI = function (user) {
  displaymoments(user);
  amountCal(user);
};
