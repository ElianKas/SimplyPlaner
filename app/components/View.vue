<template>
	<div>
		<h1>Arbeitszeiten aus PDF exportieren.</h1>
		<form @submit.prevent="handleUpload">
			<input
				@change="file = $event.target.files[0]"
				type="file"
				name="pdf"
				id="pdf"
				accept=".pdf" />
			<input
				type="text"
				name="user"
				id="user"
				v-model="user" />
			<br />
			<br />
			<button type="submit">Upload PDF</button>
		</form>
	</div>
</template>
<script setup>
	const file = ref(null);
	const user = ref('');

	const handleUpload = async (event) => {
		if (file.value && user.value) {
			const formData = new FormData();
			formData.append('file', file.value);
			formData.append('user', user.value);

			const { body } = await $fetch('/api/pdf-extract', {
				method: 'post',
				body: formData,
			});
		} else {
			alert('Datei und Name angeben');
		}
	};
</script>
