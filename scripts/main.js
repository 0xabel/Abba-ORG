// Helper function to select element
const select = (selector) => document.querySelector(selector);

// Helper function to load lottie animation
const loadLottie = (container, path, loop = true) => {
  return lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: loop,
    autoplay: true,
    path: path,
  });
};

// Hero slideshow
const heroSlideshow = () => {
  const animationFiles = [
    "../images/lottie/women-tech.json",
    "../images/lottie/women-work.json",
    "../images/lottie/girl-clothes-donation.json",
  ];
  let currentAnimationIndex = 0;

  const heroSlide = () => {
    const container = select(".hero-lottie-container");
    const animation = loadLottie(
      container,
      animationFiles[currentAnimationIndex],
      false
    );

    animation.addEventListener("complete", () => {
      animation.destroy(); // Destroy the current animation
      currentAnimationIndex =
        (currentAnimationIndex + 1) % animationFiles.length;
      heroSlide(); // Load the next animation
    });
  };

  heroSlide();
};

// Typer animation
const typerAnimation = () => {
  const typer = select(".typer");
  const delay = 5000;
  const typerData = [
    "bridge the digital divide.",
    "build futures and breaking barriers.",
    "equip, empower and elevate: the nation forward.",
  ];
  let currentTextIndex = 0;

  const fadeInOut = () => {
    const newText = typerData[currentTextIndex];
    typer.textContent = newText;

    setTimeout(() => {
      currentTextIndex = (currentTextIndex + 1) % typerData.length;
      // Trigger animation
      typer.style.animation = "none";
      void typer.offsetWidth; // Trigger reflow
      typer.style.animation = "";
      fadeInOut();
    }, delay);
  };

  fadeInOut();
};

// Tabs
const tabAnimation = () => {
  const devices = {
    Mobile: {
      title: "Mobile Devices",
      text: "ABBA collects mobile devices to provide essential communication tools to those in need. We ensure that these devices are in good working condition before distributing them.",
      path: "../images/lottie/mobile.json",
    },
    Laptops: {
      title: "Laptops",
      text: "We collect laptops to provide a means of education and access to digital resources. Our goal is to equip individuals with the tools they need to improve their lives.",
      path: "../images/lottie/laptop.json",
    },
    Tablets: {
      title: "Tablets",
      text: "ABBA collects tablets to provide a portable and user-friendly platform for education and digital access. We aim to bridge the digital divide and provide opportunities for learning.",
      path: "../images/lottie/tablet.json",
    },
  };

  const tabBodyHeader = select(".tab-body-header");
  const tabs = document.querySelectorAll(".tab");
  const description = select(".tab-body-description");
  const tabImageContainer = select(".tab-body-img");

  tabBodyHeader.textContent = devices["Mobile"].title;
  description.textContent = devices["Mobile"].text;
  tabs[0].classList.add("active");
  let tabImgAnimation = loadLottie(tabImageContainer, devices["Mobile"].path);

  // Function to change the animation
  function changeAnimation(newPath) {
    // Destroy the current animation
    tabImgAnimation.destroy();

    // Load the new animation
    tabImgAnimation = loadLottie(tabImageContainer, newPath);
  }

  for (let tab of tabs) {
    tab.addEventListener("click", (e) => {
      const { title, text, path } = devices[e.target.innerText];
      tabBodyHeader.textContent = title;
      description.textContent = text;
      changeAnimation(path);
    });
  }
};

// FAQ
const faqAnimation = () => {
  const faqImg = select(".faq-body-img-container");

  const faqAnimation = loadLottie(faqImg, "../images/lottie/faq.json");

  const answers = [
    {
      key: 1,
      text: "ABBA is a start-up NGO dedicated to providing essential resources and education to the most vulnerable in Afghanistan. We collect technologies and donations to support children, the poor, and those in need of basic necessities. Our mission is to help Afghanistan advance towards development and alleviate poverty.",
    },
    {
      key: 2,
      text: "ABBA collects mobile, tablet, and laptop devices to support education and communication in Afghanistan.",
    },
    {
      key: 3,
      text: "You can get involved by donating technologies or financial support. We are currently operating in Ghazni and Paktika provinces, with plans to expand across the country.",
    },
    {
      key: 4,
      text: "ABBA's work has a significant impact on the lives of those in need. By providing essential resources and education, we are helping to alleviate poverty and advance Afghanistan towards development.",
    },
    {
      key: 5,
      text: "You can donate by visiting our website and following the instructions for making a donation. We accept both technological and financial donations.",
    },
    {
      key: 6,
      text: "Our goal is to expand and become a big organization that can have an impactful change on Afghans and the country itself. We are currently operating in Ghazni and Paktika provinces, with plans to expand across the country.",
    },
  ];

  const faqToggles = document.querySelectorAll(".faq-toggle");
  const faqAnswers = document.querySelectorAll(".faq-answer");
  for (let toggle of faqToggles) {
    toggle.addEventListener("click", (e) => {
      const answer = answers.find(
        (obj) => obj.key === parseInt(e.target.getAttribute("data-key"))
      );
      const curFaq = Array.from(faqAnswers).find(
        (el) =>
          el.getAttribute("data-key") === e.target.getAttribute("data-key")
      );
      // Close all open accordion items
      for (let faq of faqAnswers) {
        if (faq !== curFaq && faq.classList.contains("active")) {
          faq.classList.remove("active");
        }
      }
      for (let tgl of faqToggles) {
        if (tgl !== e.target && tgl.classList.contains("active")) {
          tgl.classList.remove("active");
        }
      }

      curFaq.textContent = answer.text;

      // Add or remove the .active class
      curFaq.classList.toggle("active");
      e.target.classList.toggle("active");
    });
  }
};

// Copy

const copyEmail = () => {
  const copyText = select(".copy-text");
  const copyBtn = select(".copy-btn");

  copyBtn.addEventListener("click", () => {
    copyBtn.classList.add("animate");

    setTimeout(() => {
      copyBtn.classList.remove("animate");
    }, 1000);

    navigator.clipboard
      .writeText(copyText.value)
      .then(() => {
        console.log("Text copied to clipboard");
        copyBtn.textContent = "Copied!";

        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 1500);
      })
      .catch((err) => {
        // This can happen if the user denies clipboard permissions:
        console.error("Could not copy text: ", err);
      });
  });
};

// Nav
const navMenu = () => {
  const hamburger = select(".nav-hamburger");
  const menu = select(".menu");
  const close = select(".menu-close");
  const body = document.body;
  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
    body.style.overflow = "hidden";
  });

  close.addEventListener("click", () => {
    menu.classList.remove("active");
    body.style.overflow = "scroll";
  });
};

const navScroll = () => {
  document.querySelectorAll(".nav-main ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.getElementById(this.getAttribute("data-target"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelectorAll(".menu-items ul li a").forEach((anchor) => {
    const menu = select(".menu");

    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      menu.classList.remove("active");
      document.body.style.overflow = "scroll";
      const target = document.getElementById(this.getAttribute("data-target"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  select(".hero-txt-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.getElementById(this.getAttribute("data-target"));
    target.scrollIntoView({ behavior: "smooth" });
  });
};

(() => {
  heroSlideshow();
  typerAnimation();
  tabAnimation();
  faqAnimation();
  navMenu();
  copyEmail();
  navScroll();
})();
