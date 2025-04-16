"use client";
import Image from "next/image";
import Link from "next/link";
import whatsappIcon from "../../public/whatsapp11111111.png";

const WhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/923001234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
    >
      <Image
        src={whatsappIcon}
        alt="WhatsApp"
        width={60}
        height={60}
        className="rounded-full shadow-lg hover:scale-110 transition-transform"
      />
    </Link>
  );
};

export default WhatsAppButton;
