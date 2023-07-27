<script lang="ts">
    import { onMount } from "svelte";
    import { getUploadRequest } from "../lib/server/ApiCLient";
    import { type UploadRequest } from "../lib/server/ApiCLient";

    let files = [];
    let uploadedFiles: UploadRequest[];

    onMount(async () => {
        try {
            uploadedFiles = await getUploadRequest();
        } catch (e) {
            console.error(e);
        }
    });

    function onFileSelected(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            let image = Array.from(e.target.files);
            files = image;
        }
    }
</script>

<section class="section">
    <div class="container">
        <div class="box">
            <div class="rows is-centered">
                <div class="row has-text-centered">
                    {#if uploadedFiles}
                        {#each uploadedFiles as { ObjectKey }}
                            <p>{ObjectKey}</p>
                        {/each}
                    {/if}
                    {#if !files}
                        <p>Files isnt uploaded</p>
                    {:else}
                        {#each files as { name }}
                            <p>{name}</p>
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
                    <button class="button is-primary is-outlined">Send</button>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
</style>
