import createElement from '../helpers/domHelper';
import fighterService from '../services/fightersService';




export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    console.log(fighter)
    if(fighter){
        const img = createFighterImage(fighter)
        const text = createFighterInfo(fighter)

        fighterElement.appendChild(img)
        fighterElement.appendChild(text)
    }

    

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterInfo(fighter) {
    const {name, health, attack, defense} = fighter;

    const infoTextEl = createElement({
        tagName: 'p'
    })
    infoTextEl.innerHTML=`Name: ${name}, health: ${health}, attack: ${attack}, defense: ${defense}`
    return infoTextEl;
    
}