import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    let firstFighterMaxHP = firstFighter.health;
    let secondFighterMaxHP = secondFighter.health;

    firstFighter.cooldown = 0;
    secondFighter.cooldown = 0;

    const keyPressed = new Map();

    document.addEventListener('keydown', (event) => {
      keyPressed.set(event.code, true);

      handleFight(firstFighter, secondFighter, keyPressed, firstFighterMaxHP, secondFighterMaxHP);

      if (firstFighter.health <= 0) {
        resolve(secondFighter);
      }
      if (secondFighter.health <= 0) {
        resolve(firstFighter);
      }
    });

    document.addEventListener('keyup', (event) => {
      keyPressed.delete(event.code);
    });
  });
}

function handleFight(firstFighter, secondFighter, keyMap, maxHP1, maxHP2) {
  const indicator1 = document.getElementById('left-fighter-indicator');
  const indicator2 = document.getElementById('right-fighter-indicator');

  switch (true) {
    case keyMap.has(controls.PlayerOneAttack):
      executeAttack(firstFighter, secondFighter, maxHP2, indicator2, keyMap);
      break;

    case keyMap.has(controls.PlayerTwoAttack):
      executeAttack(secondFighter, firstFighter, maxHP1, indicator1, keyMap);
      break;

    case controls.PlayerOneCriticalHitCombination.every(key => keyMap.has(key)):
      executeCriticalHit(firstFighter, secondFighter, maxHP2, indicator2);
      break;

    case controls.PlayerTwoCriticalHitCombination.every(key => keyMap.has(key)):
      executeCriticalHit(secondFighter, firstFighter, maxHP1, indicator1);
      break;
  }
}

function executeAttack(attacker, defender, maxHP, indicator, keyMap) {
  if (!isDefending(keyMap)) {
    const damage = calculateDamage(attacker, defender);
    defender.health -= damage;
    updateHealthIndicator(defender, indicator, maxHP);
  }
}

function updateHealthIndicator(fighter, indicator, maxHP) {
  const currentHealthRatio = fighter.health / maxHP;
  const widthPercentage = Math.max(0, (currentHealthRatio * 100));
  indicator.style.width = widthPercentage + '%';
}

function isDefending(keyMap) {
  return keyMap.has(controls.PlayerOneBlock) || keyMap.has(controls.PlayerTwoBlock);
}

// Функція критичного удару
function executeCriticalHit(attacker, defender, maxHP, indicator) {
  if (canExecuteCriticalHit(attacker)) {
    defender.health -= attacker.attack * 2.0;
    updateHealthIndicator(defender, indicator, maxHP);
    attacker.cooldown = new Date();
  }
}

function canExecuteCriticalHit(fighter) {
  const now = new Date();
  const timeElapsed = (now - fighter.cooldown) / 1000;
  return timeElapsed > 10;
}

// ФУНКЦІЯ для розрахунку удару (атака - блок)

export function calculateDamage(attacker, defender) {
  const attackPower = calculateAttackPower(attacker);
  const blockPower = calculateBlockPower(defender);
  return Math.max(0, attackPower - blockPower);
}



export function calculateAttackPower(fighter) {
  const criticalHitChance = getRandomNumber();
  return fighter.attack * criticalHitChance;
}

export function calculateBlockPower(fighter) {
  const dodgeChance = getRandomNumber();
  return fighter.defense * dodgeChance;
}

// Функція, для розрахунку рандомного числа, щоб потім її підставити у розрахунок атаки та захисту бійців

export function getRandomNumber() {
  return Math.random() + 1;
}