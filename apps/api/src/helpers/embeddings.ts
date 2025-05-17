export const getImageEmbedding = async (image: string): Promise<number[]> => {
  const { pipeline } = await import('@xenova/transformers');

  const extractor = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
  const output = await extractor(image);

  return Array.from(output.data);
};

export const getCosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length) {
    throw new Error('Vectors must be of same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};
