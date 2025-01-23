<template>
	<li>
		<NuxtLink :to="`/projects/${props.new.uid}`">
			<h3>{{ props.new.data.title }}</h3>
			<!-- <PrismicImage
				class="image"
				:field="props.new.data.image" /> -->
		</NuxtLink>
	</li>
</template>

<script setup>
	import { NuxtLink } from '#components';

	const prismic = usePrismic();

	const props = defineProps({
		new: {
			type: Object,
			required: true,
		},
	});
</script>

<style lang="scss" scoped>
	li {
		border: 1px solid red;
		max-width: 25vw;
	}

	.image {
	}
</style>
