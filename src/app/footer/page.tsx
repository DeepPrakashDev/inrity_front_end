import Image from "next/image";
import React from "react";

const Footer = async () => {
  return (
    <>
      <footer className="w-full  bg-[#2000A0] pt-[30] pb-[15]">
        <div className="container mx-auto">
          <div className="footer-text text-center text-white">
            <h4 className="text-[20px] sm:text-[20px] md:text-[30px] lg:text-[40px] xl:text-[40px] mb-5">
              Aenean morbi semper massa elit sit nullam
            </h4>
            <p className="text-[19px] mb-5 opacity-75">
              Powerful, self-serve team engagement tools and analytics.
              Supercharge your <br />
              managers & keep employees engaged from anywhere.
            </p>
            <p className="mb-5 opacity-75">Trusted by 4,000+ companies</p>
          </div>
          <div className="footer-icons flex flex-wrap justify-center items-center">
            <Image
              src="/assets/images/footer/footer-icon1.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon2.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon3.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon4.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon5.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon6.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon7.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon8.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon9.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
            <Image
              src="/assets/images/footer/footer-icon10.png"
              className="h-full mx-2"
              width={88}
              height={66}
              alt="footer-icon"
            ></Image>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
