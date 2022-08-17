class Enemy {
    constructor (life, stage, restore) {
        this.life = life;
        this.stage = stage;
        this.restore = restore;
    } 
    mainEnemy () {
        const hp = document.getElementById("hp");
        hp.textContent = "HP " + this.life;

        const stage = document.getElementById("stage");
        stage.textContent = "Stage " + this.stage;

        this.restoreLife();
    }
    restoreLife () {
        if (this.life <= 0) {
            this.restore += Math.round(((this.restore) / 2) * 0.55);
            this.life = this.restore;
            this.stage++;
            this.mainEnemy();
        }
    }
}

class Player {
    constructor (lvl, dmg, gold, price) {
        this.lvl = lvl;
        this.dmg = dmg;
        this.gold = gold;
        this.price = price;
    }
    mainPlayer () {
        const nvl = document.getElementById("lvl");
        nvl.textContent = "Level " + this.lvl;
    
        const click = document.getElementById("dmg");
        click.textContent = "Damage " + this.dmg;

        const money = document.getElementById("gold");
        money.textContent = "Gold " + this.gold;

        const cost = document.getElementById("price");
        cost.textContent = "Price " + this.price;
        
        this.playerButton();
    }
    playerButton() {
        let pButton = document.getElementById("playerBoost");
        if (this.gold >= this.price) {
            pButton.disabled = false;
        } else {
            pButton.disabled = true;
        }
    }
    playerBoost () {
        this.lvl += 1;
        this.dmg = Math.round((Math.pow( this.lvl , 4 )));

        this.gold -= this.price;
        this.price += Math.round((this.price / 2) * 0.3);

        this.mainPlayer();
        Helper.helperLoop();
    }
}

class Helper extends Player{
    constructor (lvl, dmg, gold, price, id) {
        super(lvl,dmg,gold,price);
        this.id = id;
    }
    mainHelper () {
        const helpLvl = document.getElementById("hLvl"+this.id);
            helpLvl.textContent = "Level " + this.lvl;
        const helpDmg = document.getElementById("hDmg"+this.id);
            helpDmg.textContent = "Damage " + this.dmg;
            helpDmg.style.margin = "0";
        const helpGold = document.getElementById("hGold"+this.id);
            helpGold.textContent = "Gold/s " + this.gold;
            helpGold.style.margin = "0";
        const helpPrice = document.getElementById("hPrice"+this.id);
            helpPrice.textContent = "Price " + this.price;
        
        let hButton = helpPrice;
        this.helperButton(hButton);
    }
    helperButton(hButton) {
        if (newPlayer.gold >= this.price) {
            hButton.disabled = false;
        } else {
            hButton.disabled = true;
        }
    }
    helperBoost () {
        this.lvl += 1;
        if (this.lvl > 1) {
        this.dmg = this.dmg * 2;
        }
        newPlayer.gold -= this.price;
        this.gold *= 2;
        this.price *= 3;
        newPlayer.mainPlayer();
        Helper.helperLoop();
    }
    static helperLoop () {
        for (let i = 0; i < 4; i++) {
            newHelper[i].mainHelper();
        }
    }
    static helperTickDmg () {
        for (let i = 0; i < 4; i++) {
            if (newHelper[i].lvl > 0) {
                newEnemy.life -= newHelper[i].dmg;
                newPlayer.gold += newHelper[i].gold;
                newPlayer.mainPlayer();
                newEnemy.mainEnemy();
            }
        }
        Helper.helperLoop();
    }
}

class Buff {
    constructor (price,timer,id) {
        this.price = price;
        this.timer = timer;
        this.id = id;
    }
    mainBuffView () {
        let second = this.timer/1000;
        const buffNameDmg = document.getElementById("dmgx2Time");
            buffNameDmg.textContent = "Duration " + second;
        const buffNameGold = document.getElementById("goldx2Time");
            buffNameGold.textContent = "Duration " + second;
        const buffNameAuto = document.getElementById("autox2Time");
            buffNameAuto.textContent = "Duration " + second;
        const buffNameDuration = document.getElementById("durationx2Time");
            buffNameDuration.textContent = "Instant";
    }
    mainBuffButtonView () {   
        const buffPriceDmg = document.getElementById("dmgx2Price");
            buffPriceDmg.textContent = "Price " + this.price;
            buffPriceDmg.addEventListener('click', dmgX2);
        const buffPriceGold = document.getElementById("goldx2Price");
            buffPriceGold.textContent = "Price " + this.price;
            buffPriceGold.addEventListener('click', goldX2);
        const buffPriceAuto = document.getElementById("autox2Price");
            buffPriceAuto.textContent = "Price " + this.price;
            buffPriceAuto.addEventListener('click', autoX2);
        const buffPriceDuration = document.getElementById("durationx2Price");
            buffPriceDuration.textContent = "Price " + this.price;
            buffPriceDuration.addEventListener('click', durationX2);
    }
    mainBuff (active) {
        switch (active) {
            case 1: {
                const buffTimer = document.getElementById("dmgx2Time");
                const buffPrice = document.getElementById("dmgx2Price");
                buffPrice.disabled = true;
                let newBuffCost = this.price * newPlayer.lvl;
                this.mainBuffTimer(buffTimer,buffPrice);
                this.mainBuffButton(buffPrice,newBuffCost);
              break;
            }
            case 2: {
                const buffTimer = document.getElementById("goldx2Time");
                const buffPrice = document.getElementById("goldx2Price");
                buffPrice.disabled = true;
                let newBuffCost = (this.price * newPlayer.lvl) / 2;
                this.mainBuffTimer(buffTimer,buffPrice);
                this.mainBuffButton(buffPrice,newBuffCost);
              break;
            }
            case 3: {
                const buffTimer = document.getElementById("autox2Time");
                const buffPrice = document.getElementById("autox2Price");
                buffPrice.disabled = true;
                let newBuffCost = (this.price * (newPlayer.lvl * 4)) / 2;
                this.mainBuffTimer(buffTimer,buffPrice);
                this.mainBuffButton(buffPrice,newBuffCost);
              break;
            }
            case 4: {
                const buffTimer = document.getElementById("durationx2Price");
                const buffPrice = document.getElementById("durationx2Price");
                buffPrice.disabled = true;
                let newBuffCost = (Math.pow(this.price , 1.18) * newPlayer.lvl);
                this.mainBuffTimer(buffTimer,buffPrice);
                this.mainBuffButton(buffPrice,newBuffCost);
              break;
            }
        }
    }
    mainBuffButton (buffPrice , newBuffCost) {
            let newBuffPrice = this.price;
            newPlayer.gold -= this.price;
            newBuffPrice = Math.round(newBuffCost);
            buffPrice.textContent = "Price " + newBuffPrice;
    }
    buffButton(buffPrice) {
        let timer = setTimeout(function dmgTimer () {
            newBuff.buffButton(buffPrice);
        }, 1000);
        
        if (newPlayer.gold >= this.price) {
            buffPrice.disabled = false;
            clearTimeout(timer);
        } else {
            buffPrice.disabled = true;
        }     
    }
    mainBuffTimer (buffTimer,buffPrice) {
        let second = this.timer/1000;
        let reset = second;
        
        let timer = setInterval(function dmgTimer () {
            second -= 1;
            if (second == 0) {
                clearInterval(timer);
                second = reset;
                newBuff.buffButton(buffPrice);
            }
            buffTimer.textContent = "Duration " + second;
        }, 1000);
    }
    buffDmg () {
        let previousHelperDmg = [];

        newPlayer.dmg *= 2;
        for (let i = 0; i < 4; i++) {
            previousHelperDmg.push(newHelper[i].dmg);
            newHelper[i].dmg *= 2;
        }

        newPlayer.mainPlayer();
        Helper.helperLoop();

        setTimeout(rollback, this.timer);

        function rollback() {
            newPlayer.dmg = Math.round((Math.pow(newPlayer.lvl , 4 )));
            newPlayer.mainPlayer();
            for (let i = 0; i < 4; i++) {
                newHelper[i].dmg = previousHelperDmg[i];
            }
            Helper.helperLoop();
        }
    }
    buffGold () {
        newPlayer.gold *= 2;
        let timer = setInterval(function dmgTimer () {
            newPlayer.gold += newPlayer.dmg;
            newPlayer.mainPlayer();
        }, 1000);

        let previousHelperGold = [];
        for (let i = 0; i < 4; i++) {
            previousHelperGold.push(newHelper[i].gold);
            newHelper[i].gold *= 2;
        }

        newPlayer.mainPlayer();
        Helper.helperLoop();

        setTimeout(rollback, this.timer);

        function rollback() {
            newPlayer.mainPlayer();
            clearInterval(timer);
            for (let i = 0; i < 4; i++) {
                newHelper[i].gold = previousHelperGold[i];
            }
            Helper.helperLoop();
        }
    }
    buffAuto () {
        const attackButton = document.querySelector('#attack')
            const attackButtonIntervalId = setInterval(() => {
                attackButton.click()
            },750);

        setTimeout(rollback, this.timer);

        function rollback() {
            clearInterval(attackButtonIntervalId);
        }
    }
    buffDuration () {
        this.timer *= 2;
        this.mainBuffView();
        newPlayer.mainPlayer();
    }
}

/* ---------- Enemy ---------- */
const newEnemy = new Enemy (100 , 0 , 100);
newEnemy.mainEnemy();
/* ---------- Enemy ---------- */

/* ---------- Player ---------- */
const newPlayer = new Player (1, 1, 0, 10);
newPlayer.mainPlayer();

let clickLvlUp = document.getElementById('playerBoost');
clickLvlUp.textContent = "Level up";
clickLvlUp.addEventListener('click', playerLvlUp);

function playerLvlUp () {
    newPlayer.playerBoost();
}

/* Test Zone */
//This Test Code is made by WebWizardX
/*
const attackButton = document.querySelector('#attack')
  const attackButtonIntervalId = setInterval(() => {
    attackButton.click()
})
  
const playerBoost = document.querySelector('#playerBoost')
  const playerBoostButtonIntervalId = setInterval(() => {
    playerBoost.click()
})*/

let clickDmg = document.getElementById('attack');
clickDmg.addEventListener('click', playerDmg);

function playerDmg () {
    newEnemy.life -= newPlayer.dmg;
    newPlayer.gold += newPlayer.dmg;
    newPlayer.mainPlayer();
    newEnemy.mainEnemy();
    Helper.helperLoop();
    if (newEnemy.stage == 100) {
        clearInterval(attackButtonIntervalId)
        clearInterval(playerBoostButtonIntervalId)
    }
}
/* ---------- Player ---------- */

/* ---------- Helper ---------- */
const newHelper = [];
let newHDg = 150;
let newHGl = 25;
let newHPc = 250;
for (let i = 0; i < 4; i++) {
    newHDg *= 3;
    newHGl *= 4;
    newHPc *= 3;
    newHelper.push(new Helper (0,newHDg,newHGl,newHPc,i));
}
Helper.helperLoop();

for (let i = 0; i < 4; i++) {
    let clickHLvlUp = document.getElementById('hPrice'+i);
    clickHLvlUp.addEventListener('click', helperLvlUp);

    function helperLvlUp () {
        newHelper[i].helperBoost();
    }
} 

setInterval(function helperTick () {
    Helper.helperTickDmg();
}, 1000);
/* ---------- Helper ---------- */

/* ---------- Buff ---------- */
const newBuff = new Buff (2500 , 30000);
newBuff.mainBuffView();
newBuff.mainBuffButtonView();
let active = "";

function dmgX2 () {
    active = 1;
    newBuff.mainBuff(active);
    newBuff.buffDmg();
}

function goldX2 () {
    active = 2;
    newBuff.mainBuff(active);
    newBuff.buffGold();
}

function autoX2 () {
    active = 3;
    newBuff.mainBuff(active);
    newBuff.buffAuto();
}

function durationX2 () {
    active = 4;
    newBuff.mainBuff(active);
    newBuff.buffDuration();
}
/* ---------- Buff ---------- */