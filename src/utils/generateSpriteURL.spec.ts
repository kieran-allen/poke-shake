import { generateSpritURL } from "./generateSpriteURL";

describe('generateSpriteURL', () => {
  it('should render the correct url', () => {
    const ID = 1;
    expect(generateSpritURL(ID)).toEqual(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png`)
  });
});