import { useActionState } from "react";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// React resets the form after every action, so failed submissions return the
// entered values to repopulate the fields via defaultValue.
async function sendMessage(prevState, formData) {
  const fields = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };
  const { name, email, message } = fields;

  if (!name || !email || !message) {
    return {
      success: false,
      fields,
      message: "Please fill out all fields.",
    };
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return {
      success: false,
      fields,
      message: "Please enter a valid email address.",
    };
  }

  try {
    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;
    formData.append("subject", "New Contact Form Submission from Portfolio");
    formData.append("access_key", apiKey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        message: "Your message has been sent successfully!",
      };
    } else {
      return {
        success: false,
        fields,
        message: "Failed to send your message. Please try again later.",
      };
    }
  } catch {
    return {
      success: false,
      fields,
      message:
        "An error occurred while sending your message. Please try again later.",
    };
  }
}

export default function Contact() {
  const [state, formAction, isPending] = useActionState(sendMessage, null);

  return (
    <section
      id="contact"
      className="flex flex-col justify-center gap-8 bg-transparent px-4 py-20 sm:px-0 md:flex-row"
    >
      <div className="w-full space-y-2 md:w-[30%] md:space-y-4">
        <h2 className="text-foreground font-display text-start text-base font-medium md:text-2xl">
          Get in Touch
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Have a question or want to work together? Fill out the form below and
          I'll get back to you as soon as possible.
        </p>
      </div>
      <form action={formAction} className="flex-1">
        <FieldGroup>
          <Field className="gap-2">
            <FieldLabel htmlFor="contact-name" className="uppercase">
              Name
            </FieldLabel>
            <Input
              type="text"
              id="contact-name"
              name="name"
              defaultValue={state?.fields?.name}
              required
              placeholder="Your name"
              className="rounded-none"
            />
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="contact-email" className="uppercase">
              Email
            </FieldLabel>
            <Input
              type="email"
              id="contact-email"
              name="email"
              defaultValue={state?.fields?.email}
              required
              placeholder="Your email"
              className="rounded-none"
            />
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="contact-message" className="uppercase">
              Message
            </FieldLabel>
            <Textarea
              id="contact-message"
              name="message"
              defaultValue={state?.fields?.message}
              required
              placeholder="Your message..."
              className="rounded-none"
            />
          </Field>
          <Field className="w-40">
            <Button type="submit" disabled={isPending} className="rounded-none">
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </Field>
          {state?.message && (
            <p
              role="status"
              className={
                state.success
                  ? "text-sm text-green-700 dark:text-green-400"
                  : "text-destructive text-sm"
              }
            >
              {state.message}
            </p>
          )}
        </FieldGroup>
      </form>
    </section>
  );
}
