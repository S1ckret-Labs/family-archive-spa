export type UploadRequest = {
    ObjectId: number,
    ObjectKey: string,
    StatusName: string
}

export async function getUploadRequest(): Promise<UploadRequest[]> {
    const response: Response = await fetch('https://gx9mczg2il.execute-api.us-east-1.amazonaws.com/api/v1/users/1/upload/requests')
    const uploadRequest: UploadRequest[] = await response.json();
    return uploadRequest;
}