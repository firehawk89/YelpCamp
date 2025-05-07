export const getImageEmbedding = async (image: string): Promise<number[]> => {
  const { pipeline } = await import('@xenova/transformers');

  const extractor = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
  const output = await extractor(image);

  return Array.from(output.data);
};
