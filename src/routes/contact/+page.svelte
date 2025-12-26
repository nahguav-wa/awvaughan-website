<script lang="ts">
  import { enhance } from '$app/forms';
  import { PageHero, Button, Input, Label, Textarea, Card, CardContent, CardHeader } from '$lib';
  import { inView } from '$lib/actions/in-view';
  import { getLinkKey, getMetaKey } from '$lib/seo';

  let { data } = $props();
  const seo = $derived(data.seo);

  let submitting = $state(false);
  let status = $state('');

  const services = [
    'General inquiry',
    'Land clearing',
    'Grading & leveling',
    'Driveway work',
    'Hauling',
    'Other'
  ];
</script>

<svelte:head>
  <title>{seo.title}</title>
  {#each seo.meta as tag (getMetaKey(tag))}
    <meta {...tag} />
  {/each}
  {#each seo.links as link (getLinkKey(link))}
    <link {...link} />
  {/each}
</svelte:head>

<PageHero
  eyebrow="Contact"
  align="center"
  heading="Let's talk about your property"
  description="Have a project in mind? Fill out the form below and I'll get back to you within one business day."
/>

<section class="section-spacing bg-background">
  <div class="content-container">
    <div class="mx-auto max-w-2xl">
      <Card>
        <CardHeader class="space-y-3">
          <h2 class="reveal text-2xl font-semibold" use:inView>Send a message</h2>
          <p class="text-sm text-muted-foreground">
            Share some details about your project and I'll follow up with next steps.
          </p>
        </CardHeader>
        <CardContent>
          <form
            method="POST"
            action="/api/contact"
            use:enhance={() => {
              submitting = true;
              return async ({ result }) => {
                submitting = false;
                status = result.type === 'success' ? "Thanks! I'll be in touch soon." : "Something went wrong. Please try again.";
              };
            }}
            class="space-y-6"
          >
            <div class="grid gap-6 sm:grid-cols-2">
              <div class="space-y-2">
                <Label for="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div class="space-y-2">
                <Label for="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="phone">Phone (optional)</Label>
              <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
            </div>

            <div class="space-y-2">
              <Label for="service">What can I help with?</Label>
              <select
                id="service"
                name="service"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {#each services as service}
                  <option value={service}>{service}</option>
                {/each}
              </select>
            </div>

            <div class="space-y-2">
              <Label for="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project, property, or questions..."
                rows={5}
                required
              />
            </div>

            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={submitting} class="w-full sm:w-auto">
                {submitting ? 'Sending...' : 'Send message'}
              </Button>
              {#if status}
                <p class="text-sm text-muted-foreground">{status}</p>
              {/if}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</section>
