<template>
	<div class="card">
		<NuxtLink
			class="card__link"
			:to="`/projects/${props.project.item.uid}`">
			<div class="image-wrap">
				<img
					class="image"
					:src="props.project.item.data.image.url" />
			</div>
			<div class="text">
				<h3>{{ props.project.item.data.title }}</h3>
				<div class="category">{{ props.project.item.data.category }}</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup>
	import { NuxtLink } from '#components';

	const prismic = usePrismic();

	const props = defineProps({
		project: {
			type: Object,
			required: true,
		},
	});
</script>

<style lang="scss" scoped>
	.card {
		position: relative;
		min-height: 100%;
		// height: 800px;
		width: 100%;
		padding-bottom: 100px;
	}

	.card__link {
		display: block;
	}

	.image-wrap {
		position: relative;
		aspect-ratio: 4/5;
		width: 100%;
	}

	.image {
		position: absolute;
		// inset: 0;
		object-fit: cover;
	}

	.text {
		margin-top: calc($default-gap / 2);
		// position: absolute;
		// bottom: 0;
		// color: white;
		line-height: 1.2;
		font-size: 1.35vw;
		line-height: 1.4;
		font-variation-settings: 'wght' 480;
	}

	.category {
		text-transform: uppercase;
	}
</style>
