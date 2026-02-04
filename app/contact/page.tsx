import { ContactForm } from "@/components/contact";

const contactInfo = [
  { id: 1, label: "Email", value: "sleeplyteam@gmail.com" },
  { id: 2, label: "Phone", value: "753‑375‑9000" },
  { id: 3, label: "Address", value: "39 Sleeply St, Dream City" },
];

const Contact = () => {
  return (
    <div className="min-h-screen w-full text-gray-800 font-sans mt-16">
      <section className="flex flex-col items-center justify-center text-center py-16 px-8 bg-gray-100 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Contact Sleeply
        </h1>
        <p className="text-lg md:text-xl bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          {" "}
          Have questions or need help? Get in touch with us!
        </p>
      </section>
      {/* Contact Form */}
      <ContactForm />
      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl text-center font-bold mb-8">
          Contact Information
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((contact) => (
            <div key={contact.id}>
              <h3 className="text-xl font-bold mb-2">{contact.label}</h3>
              <p className="text-gray-600">{contact.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
