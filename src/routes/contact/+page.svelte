<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/ui/button.svelte';
  import Input from '$lib/ui/input.svelte';
  import Label from '$lib/ui/label.svelte';
  import Textarea from '$lib/ui/textarea.svelte';

  let submitting = false;
  let status = '';
</script>

<form method="POST" action="/api/contact" use:enhance={({ formElement }) => {
  submitting = true;
  return async ({ result }) => {
    submitting = false;
    status = result.type === 'success' ? 'Inquiry sent!' : 'Error';
  };
}} class="space-y-6">
  <Label for="name">Name</Label>
  <Input id="name" name="name" required />

  <Label for="email">Email</Label>
  <Input id="email" name="email" type="email" required />

  <Label for="service">Service</Label>
  <select name="service" class="border p-2 w-full">
    <option>Select</option>
    <option>Grading</option>
    <option>Hauling</option>
  </select>

  <Label for="message">Message</Label>
  <Textarea id="message" name="message" required />

  <Button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Submit'}</Button>
  {#if status}<p>{status}</p>{/if}
</form>