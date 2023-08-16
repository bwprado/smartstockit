<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<form method="post" class="flex flex-col gap-y-4 pt-8">
	<div class="flex flex-col gap-y-1">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
	</div>
	<div class="flex flex-col gap-y-1">
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
	</div>
	<button type="submit" class="rounded-lg bg-blue-600 text-gray-100 font-bold p-3">Login</button>
</form>
