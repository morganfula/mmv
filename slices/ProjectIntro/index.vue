<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.ProjectIntroSlice>([
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
			<div class="arrow-wrap">
				<ArrowRight />
			</div>

			<div class="text">
				<h2 class="h1 title">{{ slice.primary.title }}</h2>
				<div class="description p1--grey">
					<PrismicRichText :field="slice.primary.description" />
				</div>

				<div class="details p1--black">
					<div class="detail__title">
						{{ slice.primary.details_title }}
					</div>
					<div class="row">
						<div class="category">Category</div>
						<div class="category">
							{{ context }}
						</div>
					</div>
					<div
						class="detail"
						v-for="(item, i) in slice.primary.items"
						:key="i">
						<div class="row">
							<div class="service__title">
								{{ item.service_title }}
							</div>
							<div class="service__title">
								{{ item.services }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		margin-top: $default-gap;
		min-height: 70svh;

		@include default-grid;
	}

	.text {
		grid-column: 6/12;
	}
	.description {
		margin-top: $default-gap;
	}

	.details {
		margin-top: $default-gap;
	}
	.detail__title {
		margin-bottom: 24px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		padding: 24px 0;
		border-top: 1px solid $color-grey;
	}

	.arrow-wrap {
		@include test;
		height: 60px;
		// width: 70px;
		grid-column: 1 / 2;
	}
</style>
