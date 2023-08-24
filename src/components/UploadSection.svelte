<script lang="ts">
    import { onMount } from "svelte";
    import {
        getUploadRequest,
        postInsertRequest,
        pushMediaFilesToS3,
        type PostUploadRequestResponse,
        type PostUploadRequestRequest,
        type UploadRequestResponse,
    } from "../lib/server/ApiClient";
    import exifr from "exifr";

    let files = [];
    let uploadedFiles: UploadRequestResponse[];

    onMount(async () => {
        try {
            uploadedFiles = await getUploadRequest();
        } catch (e) {
            console.error(e);
        }
    });

    async function sendFiles() {
        let postRequests: Array<PostUploadRequestRequest> = [];
        let postResponse: PostUploadRequestResponse[];

        for (let i: number = 0; i < files.length; i++) {
            let exifData = null;

            try {
                let exifData = await exifr.parse(files[i]);
            } catch (e) {
                console.error(e);
            }

            let takenAtSec = null;

            if (exifData) {
                takenAtSec = exifData.DateTimeOriginal.valueOf();
            }

            let postRequest: PostUploadRequestRequest = {
                ObjectKey: files[i].name,
                SizeBytes: files[i].size,
                TakenAtSec: takenAtSec,
            };

            postRequests.push(postRequest);
        }
        try {
            postResponse = await postInsertRequest(postRequests);
            const loopTest = [];
            for (let i = 0; i < files.length; i++) {
                loopTest.push(
                    pushMediaFilesToS3(postResponse[i].UploadUrl, files[i])
                );
            }
            await Promise.all(loopTest);
        } catch (e) {
            console.error(e);
        }
    }

    function onFileSelected(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            let image = Array.from(e.target.files);
            files = image;
            console.log(files);
        }
        sendFiles();
    }
</script>

<section class="section">
    <div class="container">
        <div class="box">
            <div class="rows is-centered">
                <div class="row has-text-centered">
                    <div class="columns">
                        <p class="column">Name</p>
                        <p class="column">Size</p>
                        <p class="column">Status</p>
                    </div>
                    {#if uploadedFiles}
                        {#each uploadedFiles as { ObjectKey, StatusName, SizeBytes }}
                            <div class="columns">
                                <p class="column">{ObjectKey}</p>
                                <p class="column">
                                    {(SizeBytes / 1024 ** 2).toFixed(3)} MB
                                </p>
                                <p class="column">{StatusName}</p>
                            </div>
                        {/each}
                    {/if}
                    {#if !files}
                        <p>Files isnt uploaded</p>
                    {:else}
                        {#each files as { name, size }}
                            <div class="columns">
                                <p class="column">{name}</p>
                                <p class="column">
                                    {(size / 1024 ** 2).toFixed(3)} MB
                                </p>
                                <p class="column">Waiting for send</p>
                            </div>
                        {/each}
                    {/if}
                </div>
                <div class="row has-text-centered">
                    <input
                        class="button is-outlined"
                        multiple
                        type="file"
                        name="media_uploads"
                        id="media_uploads"
                        on:input={onFileSelected}
                        accept=".jpg,
                            .gif,
                            .png,
                            .webp,
                            .x-msvideo,
                            .h264,
                            .x-m4v,
                            .mpeg,
                            .mp4,
                            .ogg,
                            .webm"
                    />
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .column {
        border-left: 1px solid black;
        border-right: 1px solid black;
    }
</style>
