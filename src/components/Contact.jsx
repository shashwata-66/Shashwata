import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiSend, FiGithub, FiLinkedin, FiUser, FiMessageSquare, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

const EMAILJS_SERVICE_ID  = "service_35by8p9";
const EMAILJS_TEMPLATE_ID = "template_a1hax0d";
const EMAILJS_PUBLIC_KEY  = "BeiFvSJWdDF21q2go";

const contactInfo = [
  {
    icon: <FiMail size={18} />,
    label: "Email",
    value: "shashwatabarman9@gmail.com",
    href: "mailto:shashwatabarman9@gmail.com",
  },
];

const socialLinks = [
  {
    icon: <FiGithub size={20} />,
    label: "GitHub",
    href: "https://github.com/shashwata-66",
  },
  {
    icon: <FiLinkedin size={20} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shashwata-barman-66-/",
  },
  {
    icon: <SiLeetcode size={20} />,
    label: "LeetCode",
    href: "https://leetcode.com/u/shashwata66/",
  },
];

export default function Contact({ darkMode }) {
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = (field) => `
    w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border
    ${darkMode
      ? `bg-[#13111f] text-white placeholder-gray-600
         ${focusedField === field
           ? "border-purple-500 shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
           : "border-purple-500/10 hover:border-purple-500/25"}`
      : `bg-gray-50 text-gray-900 placeholder-gray-400
         ${focusedField === field
           ? "border-purple-400 shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
           : "border-gray-200 hover:border-purple-300"}`
    }
  `;

  return (
    <section
      id="contact"
      className={`relative py-28 overflow-hidden ${darkMode ? "bg-[#0a0a0f]" : "bg-gray-50"}`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute top-0 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`}
          >
            — Get in touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className={`text-4xl md:text-5xl font-black tracking-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isHeadingInView ? { width: "60px" } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 mt-4 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
          />
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <p className={`text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              I'm currently open to internship opportunities and freelance projects.
              Whether you have a question, a project idea, or just want to say hi —
              my inbox is always open! 🚀
            </p>

            {/* Email */}
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group ${
                  darkMode
                    ? "bg-[#0e0e1a] border-purple-500/10 hover:border-purple-500/25"
                    : "bg-white border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md"
                }`}
              >
                <div className={`p-3 rounded-xl transition-colors duration-200 ${
                  darkMode
                    ? "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20"
                    : "bg-purple-50 text-purple-600 group-hover:bg-purple-100"
                }`}>
                  {info.icon}
                </div>
                <div>
                  <p className={`text-xs font-semibold mb-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {info.label}
                  </p>
                  <p className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <div>
              <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.93 }}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      darkMode
                        ? "border-purple-500/15 text-gray-400 hover:text-purple-300 hover:border-purple-500/35 hover:bg-purple-500/10"
                        : "border-gray-200 text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`p-6 md:p-8 rounded-2xl border ${
                darkMode
                  ? "bg-[#0e0e1a] border-purple-500/10"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              <div className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <FiUser size={12} /> Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    required
                    className={inputClass("name")}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <FiMail size={12} /> Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="john@example.com"
                    required
                    className={inputClass("email")}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <FiMessageSquare size={12} /> Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Hi Shashwata, I'd like to talk about..."
                    required
                    rows={5}
                    className={`${inputClass("message")} resize-none`}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === "sending"
                      ? "opacity-70 cursor-not-allowed bg-gradient-to-r from-purple-700 to-violet-700 text-white"
                      : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.55)]"
                  }`}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={15} /> Send Message
                    </>
                  )}
                </motion.button>

                {/* Status messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium"
                  >
                    <FiCheckCircle size={16} />
                    Message sent! I'll get back to you soon. 🎉
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
                  >
                    <FiAlertCircle size={16} />
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
