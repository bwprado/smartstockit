<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import { getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionData } from "./$types.js"

    const toastStore = getToastStore()

    export let form: ActionData

    if (form?.status) {
        toastStore.trigger({
            message: form?.body,
        })
    }
</script>

<form method="post" class="flex flex-col gap-y-4 pt-8 px-4 sm:max-w-sm mx-auto">
    <Input id="email" name="email" label="Email" type="text" />
    <Input id="password" name="password" label="Password" type="password" />
    <Button type="submit" id="login">Login</Button>
</form>
