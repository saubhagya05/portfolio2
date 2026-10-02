/**
 * Open the visitor's mail client with the form contents pre-filled.
 *
 * The site has no backend, so there is nothing to POST a contact form to.
 * Rather than drop the form, submitting it composes a message and hands it to
 * whatever mail app the visitor uses. Nothing is sent without them pressing
 * send, and no third-party service sees the message.
 */
export function openMailDraft({ to, name, email, message }) {
  const subject = `Portfolio enquiry from ${name}`.trim();
  const body = [message, "", "—", name, email].filter(Boolean).join("\n");

  const url =
    `mailto:${encodeURIComponent(to)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = url;
}
