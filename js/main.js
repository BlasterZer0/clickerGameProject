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
            this.restore += Math.round((this.restore / 2) * 0.5);
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
        this.dmg += Math.round((0.5 * (this.lvl / 2 )));

        this.gold += - this.price;
        this.price += Math.round((2 * ((this.lvl * 2))));

        this.mainPlayer();
    }
}

class Helper extends Player{
    constructor (lvl, dmg, gold, price, id) {
        super(lvl,dmg,gold,price);
        this.id = id;
    }
    mainHelper () {
        const helpLvl = document.getElementById("hLvl"+this.id);
            helpLvl.textContent = "Level = " + this.lvl;
        const helpDmg = document.getElementById("hDmg"+this.id);
            helpDmg.textContent = "Damage = " + this.dmg;
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
        this.dmg += Math.round((1.5 * (this.lvl * 2 )));

        newPlayer.gold += - this.price;
        this.price += Math.round((3 * ((this.lvl * 5))));
        
        newPlayer.mainPlayer();
        this.mainHelper();
    }
    static helperLoop () {
        for (let i = 0; i < 4; i++) {
            array[i].mainHelper();
        }
    }
}

const newEnemy = new Enemy (100 , 0 , 100);
newEnemy.mainEnemy();

const newPlayer = new Player (1, 1, 0, 10);
newPlayer.mainPlayer();

const newHelper0 = new Helper (0, 250,   25,  1000, 0);
const newHelper1 = new Helper (0, 1000,  50,  3000, 1);
const newHelper2 = new Helper (0, 4000,  75,  6000, 2);
const newHelper3 = new Helper (0, 12000, 100, 9000, 3);

let array = [newHelper0, newHelper1, newHelper2, newHelper3];
Helper.helperLoop();

for (let i = 0; i < 4; i++) {
    let standbyDmg = document.getElementById('hPrice'+i);
    standbyDmg.addEventListener('click', helperBoost);

    function helperBoost () {
        array[i].helperBoost();
    }
} 

setInterval(helperTick, 10000);

function helperTick () {
    for (let i = 0; i < 4; i++) {
        if (array[i].lvl > 0) {
            newEnemy.life += - array[i].dmg;
            newPlayer.gold += + array[i].gold;
            newPlayer.mainPlayer();
            newEnemy.mainEnemy();
            console.log(newPlayer.gold);
        }
    }
}

let clickDmg = document.getElementById('attack');
clickDmg.addEventListener('click', playerDmg);

function playerDmg () {
    newEnemy.life += - newPlayer.dmg;
    newPlayer.gold += + newPlayer.dmg;
    newPlayer.mainPlayer();
    newEnemy.mainEnemy();
    Helper.helperLoop();
}