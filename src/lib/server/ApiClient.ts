export type UploadRequestResponse = {
    ObjectId: number,
    ObjectKey: string,
    StatusName: string,
    SizeBytes: number,
    TakenAtSec: number
}

export type PostUploadRequestRequest = {
    ObjectKey: string,
    SizeBytes: number,
    TakenAtSec: number
}

export type PostUploadRequestResponse = {
    ObjectId: number,
    ObjectKey: string,
    UploadUrl: string
}

export async function getUploadRequest(): Promise<UploadRequestResponse[]> {
    const response: Response = await fetch(import.meta.env.VITE_LINK_GET_UPLOAD_REQUEST)
    const uploadRequest: UploadRequestResponse[] = await response.json();
    return uploadRequest;
}

export async function postInsertRequest(postRequest): Promise<PostUploadRequestResponse[]> {

    const response: Response = await fetch(import.meta.env.VITE_LINK_POST_INSERT_REQUEST,
        {
            method: 'POST',
            body: JSON.stringify(postRequest),
            headers: { 'Content-Type': 'application/json' }
        });


    const postResponse: PostUploadRequestResponse[] = await response.json();
    return postResponse;


}

export async function pushMediaFilesToS3(presignedUrl, uploadMedia) {
    const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: uploadMedia
    });
}