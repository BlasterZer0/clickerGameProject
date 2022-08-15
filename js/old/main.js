//Start health bar
let life = 100;
let hp = document.getElementById("hp");
let currentHP = hp.textContent = "HP " + life;
document.body.onload = checkButton;    
//Player Status
let lvl = 1;
let gold = 0;
let dmg = 1;
let price = 10;

//Element
let money = document.getElementById("gold");

let buylvl = document.getElementById('buylvl');
buylvl.addEventListener('click', levelup);

//Player lvl y dmg
function levelup(){
    lvl = lvl + 1;
    let lvlHtml = document.getElementById("lvl");
    lvlHtml.textContent = "Level = " + lvl;

    gold = gold - price;
    money.textContent = "Gold = " + gold;

    dmg = Math.round(dmg + (0.5 * (lvl / 2 )));
    let dmgHtml = document.getElementById("dmg");
    dmgHtml.textContent = "Damage = " + dmg;

    price = Math.round(price + (2 * ((lvl * 2))));
    let priceHtml = document.getElementById("price");
    priceHtml.textContent = "Price = " + price;
    checkButton()
}

//Dmg to enemy
let attack = document.getElementById('attack');
attack.addEventListener('click', dmgDeal);

function dmgDeal() {
    let newLife = life - dmg;
    life = newLife
    hp.textContent = "HP " + life;

    if (life <= 0) {
        restoreLife();
    }

    gold = gold + dmg;
    money.textContent = "Gold = " + gold;
    checkButton()
}

//Restart Life
let restore = 100;
let enemy = 1;
function restoreLife () {
    restore = Math.round(restore + (restore / 2) * 0.5);
    hp.textContent = "HP " + restore;
    life = restore;

    enemy++;
    let enemyHtml = document.getElementById("enemy");
    enemyHtml.textContent = "Enemy " + enemy;
}

//Helpers

let hLvlId = document.getElementById("hLvl");
let hLvl = 0;
const hDmgId = document.getElementById("hDmg");
let hDmg = 100;
const hPriceId = document.getElementById("hPrice");
let hPrice = 1000;
const buyHLvl = document.getElementById("buyHLvl");
buyHLvl.addEventListener('click', helperLvl);

function helperLvl () {
    hLvl = hLvl + 1; 
    hLvlId.textContent = "Level = " + hLvl;
    hDmg = hDmg * 2;
    hDmgId.textContent = "Damage = " + hDmg;
    hPrice = hPrice * 2;
    hPriceId.textContent = "Price = " + hPrice;
    console.log (hPrice);
    gold = gold - hPrice;
    money.textContent = "Gold = " + gold;
    if (hLvl > 0) {
        setInterval(helperTimer, 1000);
    }
    checkButton()
}

function helperTimer(){
    let newLife = life - hDmg;
    life = newLife
    hp.textContent = "HP " + life;

    if (life <= 0) {
        restoreLife();
    }
}

//Level up gold
function checkButton() {
    if (gold >= price) {
        buylvl.disabled = false;
    } else {
        buylvl.disabled = true;
    }
    if (gold >= hPrice) {
        buyHLvl.disabled = false;
    } else {
        buyHLvl.disabled = true;
    }
}