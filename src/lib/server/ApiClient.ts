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
    const response: Response = await fetch('https://gx9mczg2il.execute-api.us-east-1.amazonaws.com/api/v1/users/1/upload/requests')
    const uploadRequest: UploadRequestResponse[] = await response.json();
    return uploadRequest;
}

export async function postInsertRequest(postRequest): Promise<PostUploadRequestResponse[]> {

    const response: Response = await fetch('https://gx9mczg2il.execute-api.us-east-1.amazonaws.com/api/v1/users/1/upload/requests',
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