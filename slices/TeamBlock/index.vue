<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.TeamBlockSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);
</script>

<template>
	<Bounded as="div">
		<section
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<h2 class="big-title">{{ slice.primary.title }}</h2>
			<div class="team-wrap">
				<div
					class="card"
					v-for="item in slice.primary.items">
					<PrismicImage
						class="image"
						:field="item.team_member.data.photo" />
					<div class="title p1--black">
						{{ item.team_member.data.name }}
					</div>
				</div>
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		padding: $default-gap 0;
		padding-bottom: calc($default-gap * 3);
		background-color: $color-white;

		@include media('<phone') {
			padding-bottom: calc($default-gap * 6);
		}
	}
	.big-title {
		margin-bottom: $default-gap;
	}
	.title {
		margin-top: ($default-gap / 3);
	}
	.team-wrap {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: ($default-gap * 2) ($default-gap / 2);

		@include media('<phone') {
			grid-template-columns: 1fr;
			gap: calc($default-gap * 4);
		}
	}

	.card {
	}

	.image {
		width: auto;
		height: auto;
		min-width: 100%;
		min-height: 100%;
		object-fit: cover;
	}
</style>
