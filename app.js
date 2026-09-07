// NexaCapital Demo Platform
// Frontend prototype only — no real-money trading.

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }


  /* =========================
     FOOTER YEAR
  ========================= */

  const yearElements = document.querySelectorAll(".year");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /* =========================
     DEMO MARKET DATA
  ========================= */

  const markets = [
    {
      symbol: "EUR/USD",
      price: 1.17342,
      change: 0.18
    },
    {
      symbol: "GBP/USD",
      price: 1.34681,
      change: 0.09
    },
    {
      symbol: "XAU/USD",
      price: 3648.20,
      change: 0.42
    },
    {
      symbol: "US30",
      price: 45582.10,
      change: -0.12
    },
    {
      symbol: "BTC/USD",
      price: 112540,
      change: 1.24
    }
  ];


  /* =========================
     HOMEPAGE DEMO PRICE
  ========================= */

  const heroPrice = document.getElementById("heroPrice");
  const heroChange = document.getElementById("heroChange");
  const heroBid = document.getElementById("heroBid");
  const heroAsk = document.getElementById("heroAsk");

  if (heroPrice) {

    let eurusd = 1.17342;

    setInterval(function () {

      const movement =
        (Math.random() - 0.5) * 0.00020;

      eurusd += movement;

      const price =
        eurusd.toFixed(5);

      heroPrice.textContent = price;

      if (heroBid) {
        heroBid.textContent =
          (eurusd - 0.00002).toFixed(5);
      }

      if (heroAsk) {
        heroAsk.textContent =
          (eurusd + 0.00002).toFixed(5);
      }

      if (heroChange) {

        const change =
          (Math.random() * 0.4 - 0.2).toFixed(2);

        heroChange.textContent =
          (change >= 0 ? "+" : "") +
          change +
          "%";
      }

    }, 3000);
  }


  /* =========================
     TICKER DEMO MOVEMENT
  ========================= */

  const ticker = document.getElementById("tickerTrack");

  if (ticker) {

    setInterval(function () {

      const spans =
        ticker.querySelectorAll("span");

      spans.forEach(function (item) {

        const number =
          item.querySelector("b");

        if (!number) return;

        const original =
          parseFloat(
            number.textContent.replace(/,/g, "")
          );

        if (isNaN(original)) return;

        const movement =
          original * ((Math.random() - 0.5) * 0.0001);

        const updated =
          original + movement;

        if (original > 10000) {
          number.textContent =
            updated.toFixed(2);
        } else if (original > 100) {
          number.textContent =
            updated.toFixed(2);
        } else {
          number.textContent =
            updated.toFixed(5);
        }

      });

    }, 4000);
  }


  /* =========================
     DEMO REGISTER
  ========================= */

  const registerForm =
    document.getElementById("registerForm");

  if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const name =
        document.getElementById("name")?.value || "";

      const email =
        document.getElementById("email")?.value || "";

      const password =
        document.getElementById("password")?.value || "";

      if (!name || !email || !password) {
        alert("Please complete all fields.");
        return;
      }

      localStorage.setItem(
        "nexaDemoUser",
        JSON.stringify({
          name: name,
          email: email
        })
      );

      alert(
        "Demo account created successfully."
      );

      window.location.href =
        "dashboard.html";
    });
  }


  /* =========================
     DEMO LOGIN
  ========================= */

  const loginForm =
    document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const email =
        document.getElementById("email")?.value || "";

      if (!email) {
        alert("Please enter your email.");
        return;
      }

      localStorage.setItem(
        "nexaDemoUser",
        JSON.stringify({
          name: "NexaCapital User",
          email: email
        })
      );

      window.location.href =
        "dashboard.html";
    });
  }


  /* =========================
     DASHBOARD USER
  ========================= */

  const dashboardUser =
    document.getElementById("dashboardUser");

  if (dashboardUser) {

    const savedUser =
      localStorage.getItem("nexaDemoUser");

    if (savedUser) {

      try {

        const user =
          JSON.parse(savedUser);

        dashboardUser.textContent =
          user.name || "NexaCapital User";

      } catch (error) {

        dashboardUser.textContent =
          "NexaCapital User";
      }

    } else {

      dashboardUser.textContent =
        "NexaCapital User";
    }
  }


  /* =========================
     DEMO LOGOUT
  ========================= */

  const logoutButtons =
    document.querySelectorAll("[data-logout]");

  logoutButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      localStorage.removeItem(
        "nexaDemoUser"
      );

      window.location.href =
        "index.html";
    });

  });


  /* =========================
     DEMO CONTACT FORM
  ========================= */

  const contactForm =
    document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      alert(
        "Thank you. This contact form is currently a demo."
      );

      contactForm.reset();
    });
  }

});
