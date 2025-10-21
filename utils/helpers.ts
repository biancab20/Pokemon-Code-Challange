export const extractIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!match) throw new Error(`Cannot extract id from ${url}`);
  return Number(match[1]);
};

export const buildPreviewImageUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const buildDetailPageImageUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;