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
				<PrismicLink
					class="card"
					v-for="item in slice.primary.items"
					:field="item.team_member.data.linkedin_url">
					<div class="image-wrap">
						<PrismicImage
							class="image"
							:field="item.team_member.data.photo" />
					</div>
					<div class="title p1--black">
						{{ item.team_member.data.name }}
					</div>
					<div class="subtitle p1--black">
						{{ item.team_member.data.job_title }}
					</div>
				</PrismicLink>
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

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
		transition: $default-transition;
	}

	.big-title {
		margin-bottom: $default-gap;
	}
	.title {
		margin-top: ($default-gap / 3);

		@include media('<phone') {
			padding-top: 8px;
		}
	}
	.subtitle {
		padding-top: 8px;
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
		display: block;
		transition: $default-transition;

		@include media('<phone') {
			padding-bottom: 32px;
		}
	}

	// .card:hover {
	// 	transform: translateY(-20px);
	// }

	.image-wrap {
		width: 100%;
		height: 30vw;
		position: relative;
		min-width: 100%;
		min-height: 100%;
		overflow: hidden;

		@include media('<phone') {
			height: 300px;
		}
	}
	.image {
		position: absolute;
		width: 100%;
		min-width: 100%;
		min-height: 100%;
		object-fit: cover;
		will-change: transform;
		transition: $default-transition;
	}

	.card:hover .image {
		transform: scale(1.025);
	}
</style>
