import { teldaRegex, noTeldaRegex } from 'utils/searchQuery';

function validate(str) {
  return noTeldaRegex.test(str) || teldaRegex.test(str);
}

describe('validation conditions', () => {
  it('should validate noTelda', async () => {
    expect(validate('normalString')).toBe(true);
    expect(validate('normalStrin!gWithWil?dcards')).toBe(true);
    expect(validate('WildcardString?')).toBe(true);
  });

  it('should validate Telda false', async () => {
    expect(validate('~xyz')).toBe(false);
    expect(validate('~with?wildcard')).toBe(false);
    expect(validate('~~doubletelda')).toBe(false);
    expect(validate('middle~telda')).toBe(false);
    expect(validate('middle~telda~')).toBe(false);
    expect(validate('wildcard?telda~')).toBe(false);
    expect(validate('~wildcard?telda')).toBe(false);
  });

  it('should validate Telda true', async () => {
    expect(validate('xyz~')).toBe(true);
    expect(validate('space telda~')).toBe(true);
    expect(validate('numeric 999 telda~')).toBe(true);
    expect(validate('xyz~9')).toBe(true);
    expect(validate('space telda~1')).toBe(true);
    expect(validate('numeric 999 telda~2')).toBe(true);
  });
});
