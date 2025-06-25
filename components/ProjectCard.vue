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

		width: 100%;
	}

	.card:hover .image {
		transform: scale(1.025);
	}

	.card__link {
		display: block;
	}

	.image-wrap {
		position: relative;
		aspect-ratio: 4/5;
		width: 100%;
		overflow: hidden;
		border-radius: 4px;

		@include media('<phone') {
			aspect-ratio: 1/1;
		}
	}

	.image {
		position: absolute;
		// inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: $default-transition;
	}

	.text {
		margin-top: calc($default-gap / 2);

		line-height: 1.2;
		font-size: 1.35vw;
		line-height: 1.4;
		font-variation-settings: 'wght' 480;

		@include media('<phone') {
			font-size: 4vw;
		}
	}

	.category {
		text-transform: uppercase;
	}
</style>
