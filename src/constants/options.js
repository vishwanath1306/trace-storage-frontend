export const applications = ["SSH", "GUI"].map((item) => ({
    name: item,
    value: item,
}));

export const embeddingMethods = ["OpenAI", "Google", "Jina Embedding", "Custom Method1"].map((item) => ({
    name: item,
    value: item,
    key: item.slice(0, 3).toUpperCase(),
}));

export const vectorStores = ["Milvus", "Pinecone", "Weviate", "Qdrant"].map((item) => ({
    name: item,
    value: item,
    key: item.slice(0, 3).toUpperCase(),

}));
