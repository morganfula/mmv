<script setup lang="ts">
	import { ref, reactive, watchEffect } from 'vue';
	import { getSliceComponentProps } from '@prismicio/vue';
	import type { Content } from '@prismicio/client';

	const { slice } = defineProps(
		getSliceComponentProps<Content.ContactFormSlice>(['slice'])
	);

	/* ---------------- état du formulaire ---------------- */
	const values = reactive<Record<string, string>>({});
	watchEffect(() => {
		if (slice.primary.fields?.length) {
			slice.primary.fields.forEach(f => {
				if (f.pid) values[f.pid] = '';
			});
		}
	});

	/* ---------------- flags UI ---------------- */
	const busy = ref(false);
	const ok = ref(false);
	const err = ref<string | null>(null);

	/* ---------------- validation simple ------------- */
	function isValid() {
		for (const f of slice.primary.fields) {
			if (f.required && !values[f.pid]) return false;
			if (
				f.type === 'email' &&
				values[f.pid] &&
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[f.pid])
			)
				return false;
		}
		return true;
	}

	/* ---------------- submit ------------------------- */
	async function submit() {
		if (!isValid()) {
			err.value = 'Veuillez remplir tous les champs obligatoires.';
			return;
		}

		busy.value = true;
		err.value = null;
		try {
			const res = await $fetch('/api/contact', {
				method: 'POST',
				body: values,
			});
			if (res && (res as any).ok) ok.value = true;
			else throw new Error('Échec serveur');
		} catch (e: any) {
			err.value = e.message ?? 'Erreur inconnue';
		} finally {
			busy.value = false;
		}
	}
</script>

<template>
	<Bounded
		as="div"
		class="form">
		<section :data-slice-type="slice.slice_type">
			<h2 class="p1--black">{{ slice.primary.title }}</h2>

			<div class="separator"></div>

			<!-- MESSAGE DE SUCCÈS -->
			<div
				v-if="ok"
				class="success big-title">
				<PrismicRichText :field="slice.primary.success_message" />
			</div>

			<!-- FORMULAIRE -->
			<form
				v-else
				@submit.prevent="submit">
				<div
					v-for="f in slice.primary.fields"
					:key="f.pid"
					class="field">
					<label :for="f.pid">
						{{ f.label }} <span v-if="f.required">*</span>
					</label>

					<input
						v-if="f.type !== 'textarea'"
						:id="f.pid"
						:type="f.type"
						v-model="values[f.pid]"
						:placeholder="f.placeholder"
						:required="f.required" />

					<textarea
						v-else
						:id="f.pid"
						v-model="values[f.pid]"
						:placeholder="f.placeholder"
						:required="f.required"
						rows="5"
						class="text-area" />
				</div>

				<button :disabled="busy">{{ busy ? 'Sending…' : 'Submit' }}</button>
				<div
					class="error"
					v-if="err">
					<PrismicRichText :field="slice.primary.error_message" />
				</div>
			</form>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	.form {
		min-height: 80svh;
	}

	form {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;

		> :nth-last-child(-n + 3) {
			grid-column: 1 / -1;
		}
	}

	.separator {
		margin: $default-gap 0;
		background: rgba($color-grey, 0.5);
		height: 1px;
	}
	.field {
		display: grid;
		gap: 0.4rem;
		margin-bottom: 1.4rem;
	}
	input,
	textarea {
		width: 100%;
		padding: 1rem 1.5rem;
		border: 1px solid $color-grey;
		border-radius: 6px;
		font: inherit;
	}
	textarea {
		resize: vertical;
	}

	.text-area {
		grid-column: 1/3;
	}
	button {
		max-width: 300px;
		padding: 0.8rem 2rem;
		border-radius: 30px;
		background: #111;
		color: #fff;
	}

	.success {
		margin-top: calc($default-gap * 2);
		display: flex;
	}
</style>
