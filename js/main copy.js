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
            this.restore += Math.round(((this.restore) / 2) * 0.35);
            this.life = this.restore;
            this.stage++;
            this.mainEnemy();
            if (this.stage == 50) { 
                this.restore *= 2;
            }
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
        this.dmg += Math.round((Math.pow(this.lvl , 2 )));

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
        if (this.lvl == 2) {
        this.dmg = this.dmg * 2;

        newPlayer.gold -= this.price;
        this.gold = this.gold * 2;
        this.price = this.price * 3;
        }
        newPlayer.mainPlayer();
        this.mainHelper();
    }
    static helperLoop () {
        for (let i = 0; i < 4; i++) {
            array[i].mainHelper();
        }
    }
    static helperTickDmg () {
        for (let i = 0; i < 4; i++) {
            if (array[i].lvl > 0) {
                newEnemy.life -= array[i].dmg;
                newPlayer.gold += array[i].gold;
                newPlayer.mainPlayer();
                newEnemy.mainEnemy();
            }
        }
        Helper.helperLoop();
    }
}

class Buff {
    constructor (price,timer) {
        this.price = price;
        this.timer = timer;
    }
    buffMain () {
        const buffTimer = document.getElementById("sTime0");
            buffTimer.textContent = "Duration " + this.timer;
    }
    buffDmg () {
        let previousPlayerDmg = newPlayer.dmg;
        let a,b,c,d = "";
        let previousHelperDmg = [a,b,c,d]
        for (let i = 0; i < 4; i++) {
            previousHelperDmg[i] = array[i].dmg;
            array[i].dmg = array[i].dmg * 2;
        }

        newPlayer.dmg = newPlayer.dmg * 2;
        newPlayer.mainPlayer();
        Helper.helperLoop();

        setTimeout(rollback, 30000);
    
        function rollback() {
            newPlayer.dmg = previousPlayerDmg;
            newPlayer.mainPlayer();
            for (let i = 0; i < 4; i++) {
                array[i].dmg = previousHelperDmg[i];
                Helper.helperLoop();
            }
        }
    }
    buffGold () {

    }
    buffAuto () {

    }
    buffDuration () {

    }
}

const newEnemy = new Enemy (100 , 0 , 100);
newEnemy.mainEnemy();

const newPlayer = new Player (1, 1, 1000, 10);
newPlayer.mainPlayer();

const newHelper = function a () {for (let i = 0; i < 4; i++) {
    new Helper (0, 125, 50 , 1000, i);
    let standbyDmg = document.getElementById('hPrice'+i);
    standbyDmg.addEventListener('click', helperLvlUp);

    function helperLvlUp () {
        array[i].helperBoost();
    }
} }
/*
const newHelper0 = new Helper (0, 125,   50,   1000, 0);
const newHelper1 = new Helper (0, 500,   250,  3000, 1);
const newHelper2 = new Helper (0, 2000,  1000, 6000, 2);
const newHelper3 = new Helper (0, 6000,  3000, 9000, 3);*/

const newBuff = new Buff (1000 , 30);

let clickBuff = document.getElementById('sPrice0');
clickBuff.textContent = "Activate";
clickBuff.addEventListener('click', buffX2);

function buffX2 () {
    newBuff.buffDmg();
}

/*let array = [newHelper0, newHelper1, newHelper2, newHelper3];
Helper.helperLoop();

for (let i = 0; i < 4; i++) {
    let standbyDmg = document.getElementById('hPrice'+i);
    standbyDmg.addEventListener('click', helperLvlUp);

    function helperLvlUp () {
        array[i].helperBoost();
    }
} */

setInterval(helperTick, 1000);

function helperTick () {
    Helper.helperTickDmg();
}

let clickLvlUp = document.getElementById('playerBoost');
clickLvlUp.textContent = "Level up";
clickLvlUp.addEventListener('click', playerLvlUp);

function playerLvlUp () {
    newPlayer.playerBoost();
}

function test () {
    let previousPlayerDmg = newPlayer.dmg;
    let previousHelperDmg = newHelper0.dmg;
    newPlayer.dmg = newPlayer.dmg * 2;
    newPlayer.mainPlayer();

    setTimeout(rollback, 5000);

    function rollback() {
        newPlayer.dmg = previousPlayerDmg;
        newPlayer.mainPlayer();
    }
}


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
/*
const attackButton = document.querySelector('#attack')
  const attackButtonIntervalId = setInterval(() => {
    attackButton.click()
  })
  
  const playerBoost = document.querySelector('#playerBoost')
  const playerBoostButtonIntervalId = setInterval(() => {
    playerBoost.click()
  })*/