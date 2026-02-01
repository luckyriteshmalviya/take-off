import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

/* ---------------- VALIDATION ---------------- */

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ---------------- COMPONENT ---------------- */

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  /* -------- NETLIFY ENCODER -------- */
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

  /* -------- FORM SUBMIT -------- */
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...data,
        }),
      });

      setIsSubmitted(true);
      toast({
        title: "Message Sent! 🎉",
        description: "We'll get back to you within 24 hours.",
      });

      reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      toast({
        title: "Something went wrong ❌",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- CONTACT INFO ---------------- */

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: "9111385771",
      href: "tel:9111385771",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@takeoff.org.in",
      href: "mailto:info@takeoff.org.in",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Near Raja Bhoj ITI, Misrod, Bhopal (MP)",
      href: "#map",
    },
  ];

  return (
    <section className="section-padding bg-muted relative overflow-hidden" id="contact">
      {/* Background blobs */}
      <motion.div
        className="absolute top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-4xl mb-4">📧</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Want to book a party? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 shadow-card"
          >
            <h3 className="text-2xl font-heading font-bold mb-6">
              Send Us a Message
            </h3>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Required for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input {...register("name")} placeholder="Your name" />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number</label>
                <Input {...register("phone")} placeholder="10-digit mobile number" />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input {...register("email")} type="email" placeholder="your@email.com" />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea {...register("message")} rows={4} placeholder="Tell us about your enquiry..." />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting || isSubmitted} className="w-full">
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div className="space-y-8">
            <div className="grid gap-4">
              {contactInfo.map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-card" id="map">
              <iframe
                src="https://www.google.com/maps?q=23.16084776391898,77.46618011291046&z=15&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Take Off Trampoline Park Location"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
