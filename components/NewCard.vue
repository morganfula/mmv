<template>
	<div class="card">
		<NuxtLink
			class="card__link"
			:to="`/news/${props.new.item.uid}`">
			<img
				class="image"
				:src="props.new.item.data.image.url" />
			<div class="text">
				<div class="date">{{ props.new.item.data.date }}</div>
				<h3>{{ props.new.item.data.title }}</h3>
				<div
					class="category"
					:class="{
						purple: props.new.item.data.category === 'Highlights',
						teal: props.new.item.data.category === 'Network',
						orange: props.new.item.data.category === 'Insights',
					}">
					{{ props.new.item.data.category }}
				</div>
			</div>
		</NuxtLink>
	</div>
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
	.card {
		position: relative;
		// min-height: 450px;
		height: 100%;
		width: 100%;
		// padding-bottom: 100px;
		display: flex;
		flex-direction: column;
	}

	.card__link {
		display: block;
	}

	.image {
		// position: absolute;
		// inset: 0;
		width: 100%;
		object-fit: cover;
	}

	.text {
		margin-top: calc($default-gap / 2);
		bottom: 0;
		// color: white;
		line-height: 1.2;
		font-size: 1.2vw;
		line-height: 1.4;
		font-variation-settings: 'wght' 480;

		@include media('<phone') {
			font-size: 4vw;
		}
	}

	.date {
		color: $color-grey;
	}

	.category {
		text-transform: uppercase;
		position: absolute;
		top: 16px;
		right: 16px;
		color: $color-white;
		font-size: 0.93vw;
		// background: red;
		padding: 8px 20px;
		border-radius: 50px;

		@include media('<phone') {
			font-size: 2.8vw;
		}
	}
</style>
