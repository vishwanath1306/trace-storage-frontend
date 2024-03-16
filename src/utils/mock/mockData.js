export const sampleAllResponse = [
    {
        "application_name": "ssh",
        "session_name": "first session",
        "embedding_method": "OPenAI",
        "vector_store": "Milvus",
        "status": true,
        "session_id": "u_id_1"
    },
    {
        "application_name": "ssh",
        "session_name": "second session",
        "embedding_method": "Google",
        "vector_store": "Pinecone",
        "status": false,
        "session_id": "u_id_2"
    },
    {
        "application_name": "ssh",
        "session_name": "third session",
        "embedding_method": "JinaEmbeding",
        "vector_store": "Weviate",
        "status": true,
        "session_id": "u_id_3"
    },
    {
        "application_name": "ssh",
        "session_name": "fourth session",
        "embedding_method": "Custom Method",
        "vector_store": "Qdrant",
        "status": false,
        "session_id": "u_id_4"
    },
    {
        "application_name": "ssh",
        "session_name": "first session",
        "embedding_method": "OPenAI",
        "vector_store": "Pinecone",
        "status": true,
        "session_id": "u_id_5"
    },
    {
        "application_name": "ssh",
        "session_name": "second session",
        "embedding_method": "Google",
        "vector_store": "Milvus",
        "status": true,
        "session_id": "u_id_6"
    },
    {
        "application_name": "ssh",
        "session_name": "third session",
        "embedding_method": "JinaEmbeding",
        "vector_store": "Qdrant",
        "status": true,
        "session_id": "u_id_7"
    },
    {
        "application_name": "ssh",
        "session_name": "fourth session",
        "embedding_method": "Custom Method",
        "vector_store": "Qdrant",
        "status": true,
        "session_id": "u_id_8"
    },
    {
        "application_name": "ssh",
        "session_name": "fifth session",
        "embedding_method": "Custom Method",
        "vector_store": "Milvus",
        "status": true,
        "session_id": "u_id_9"
    },
    {
        "application_name": "ssh",
        "session_name": "sixth session",
        "embedding_method": "Google",
        "vector_store": "Weviate",
        "status": true,
        "session_id": "u_id_10"
    },
    {
        "application_name": "ssh",
        "session_name": "seventh session",
        "embedding_method": "OPenAI",
        "vector_store": "Weviate",
        "status": true,
        "session_id": "u_id_11"
    },
    {
        "application_name": "ssh",
        "session_name": "eighth session",
        "embedding_method": "JinaEmbeding",
        "vector_store": "Pinecone",
        "status": true,
        "session_id": "u_id_12"
    }
]

export const sampleDetailsResponse = {
    session_id: "u_id_1",
    status: "Success",
    details: "different information here",
}

export const sampleSubmitResponse = {
    session_id: "u_id_1",
    status: "Success",
}

export const sampleDeleteResponse = {
    session_id: "u_id_1",
    status: "Success",
}

export const sampleErrorResponse = {
    error: "Error message here",
}