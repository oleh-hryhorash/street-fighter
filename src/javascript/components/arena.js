import { createElement } from '../helpers/domHelper';
import { fight } from './fight';
import { createFighterImage } from './fighterPreview';
import { showWinnerModal } from '../components/modal/winner';

export function renderArena(selectedFighters) {
    const rootElement = document.getElementById('root');
    const arena = initializeArena(selectedFighters);

    rootElement.innerHTML = '';
    rootElement.append(arena);

    // ФУНКЦІЯ запуску битви та показу бійця, який виграв
    fight(...selectedFighters).then(winner => showWinnerModal(winner));
}

function initializeArena(selectedFighters) {
    const arenaContainer = createElement({ tagName: 'div', className: 'arena__root' });
    const healthStatus = createHealthStatus(...selectedFighters);
    const fightersElements = setupFighters(...selectedFighters);

    arenaContainer.append(healthStatus, fightersElements);
    return arenaContainer;
}

function createHealthStatus(leftFighter, rightFighter) {
    const healthStatusContainer = createElement({ tagName: 'div', className: 'arena__health-status' });
    const versusSign = createElement({ tagName: 'div', className: 'arena__versus-sign' });
    const leftHealthIndicator = createHealthBar(leftFighter, 'left');
    const rightHealthIndicator = createHealthBar(rightFighter, 'right');

    healthStatusContainer.append(leftHealthIndicator, versusSign, rightHealthIndicator);
    return healthStatusContainer;
}

function createHealthBar(fighter, position) {
    const { name } = fighter;
    const indicatorContainer = createElement({ tagName: 'div', className: 'arena__fighter-health-indicator' });
    const fighterName = createElement({ tagName: 'span', className: 'arena__fighter-name' });
    const healthIndicator = createElement({ tagName: 'div', className: 'arena__health-indicator' });
    const healthBar = createElement({
        tagName: 'div',
        className: 'arena__health-bar',
        attributes: { id: `${position}-fighter-health-bar` }
    });

    fighterName.innerText = name;
    healthIndicator.append(healthBar);
    indicatorContainer.append(fighterName, healthIndicator);

    return indicatorContainer;
}

function setupFighters(firstFighter, secondFighter) {
    const battlefieldContainer = createElement({ tagName: 'div', className: 'arena__battlefield' });
    const firstFighterElement = createFighterElement(firstFighter, 'left');
    const secondFighterElement = createFighterElement(secondFighter, 'right');

    battlefieldContainer.append(firstFighterElement, secondFighterElement);
    return battlefieldContainer;
}

function createFighterElement(fighter, position) {
    const imageElement = createFighterImage(fighter);
    const positionClass = position === 'right' ? 'arena__fighter--right' : 'arena__fighter--left';
    const fighterContainer = createElement({
        tagName: 'div',
        className: `arena__fighter ${positionClass}`
    });

    fighterContainer.append(imageElement);
    return fighterContainer;
}
