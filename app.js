// NexaCapital — Supabase authentication
// Demo/frontend platform. No real-money trading is performed here.

const SUPABASE_URL = "https://sjwhhszscigffxxqcwpm.supabase.co";

// Paste your Supabase PUBLISHABLE key between the quotes below.
// It starts with: sb_publishable_
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";


/* -----------------------------
   Load Supabase
----------------------------- */

const supabaseScript = document.createElement("script");

supabaseScript.src =
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = startNexaCapital;

document.head.appendChild(supabaseScript);


/* -----------------------------
   Start application
----------------------------- */

function startNexaCapital() {

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


  /* -----------------------------
     Mobile menu
  ----------------------------- */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navLinks =
    document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

  }


  /* -----------------------------
     Footer year
  ----------------------------- */

  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /* -----------------------------
     Homepage demo price
  ----------------------------- */

  const heroPrice =
    document.getElementById("heroPrice");

  const heroChange =
    document.getElementById("heroChange");

  const heroBid =
    document.getElementById("heroBid");

  const heroAsk =
    document.getElementById("heroAsk");

  if (heroPrice) {

    let price = 1.17342;

    setInterval(function () {

      price += (Math.random() - 0.5) * 0.00020;

      heroPrice.textContent =
        price.toFixed(5);

      if (heroBid) {
        heroBid.textContent =
          (price - 0.00002).toFixed(5);
      }

      if (heroAsk) {
        heroAsk.textContent =
          (price + 0.00002).toFixed(5);
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


  /* -----------------------------
     Registration
  ----------------------------- */

  const registerForm =
    document.getElementById("registerForm");

  if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

      event.preventDefault();

      const name =
        document.getElementById("name")?.value.trim();

      const email =
        document.getElementById("email")?.value.trim();

      const password =
        document.getElementById("password")?.value;

      if (!name || !email || !password) {

        alert("Please complete all fields.");

        return;
      }

      if (password.length < 8) {

        alert(
          "Password must contain at least 8 characters."
        );

        return;
      }

      const button =
        registerForm.querySelector("button[type='submit']");

      if (button) {
        button.disabled = true;
        button.textContent = "Creating account...";
      }

      try {

        const { data, error } =
          await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                full_name: name
              }
            }
          });

        if (error) {
          throw error;
        }

        if (data.session) {

          alert("Account created successfully.");

          window.location.href =
            "dashboard.html";

        } else {

          alert(
            "Account created. Please check your email to confirm your account."
          );

          window.location.href =
            "login.html";
        }

      } catch (error) {

        alert(
          "Registration failed: " +
          error.message
        );

      } finally {

        if (button) {
          button.disabled = false;
          button.textContent = "Create account";
        }

      }

    });

  }


  /* -----------------------------
     Login
  ----------------------------- */

  const loginForm =
    document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

      event.preventDefault();

      const email =
        document.getElementById("email")?.value.trim();

      const password =
        document.getElementById("password")?.value;

      if (!email || !password) {

        alert("Please enter your email and password.");

        return;
      }

      const button =
        loginForm.querySelector("button[type='submit']");

      if (button) {
        button.disabled = true;
        button.textContent = "Signing in...";
      }

      try {

        const { error } =
          await supabase.auth.signInWithPassword({
            email: email,
            password: password
          });

        if (error) {
          throw error;
        }

        window.location.href =
          "dashboard.html";

      } catch (error) {

        alert(
          "Login failed: " +
          error.message
        );

      } finally {

        if (button) {
          button.disabled = false;
          button.textContent = "Log in";
        }

      }

    });

  }


  /* -----------------------------
     Dashboard protection
  ----------------------------- */

  if (
    window.location.pathname.endsWith("dashboard.html")
  ) {

    protectDashboard();

  }


  async function protectDashboard() {

    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();

    if (!user) {

      window.location.href =
        "login.html";

      return;
    }

    const dashboardUser =
      document.getElementById("dashboardUser");

    if (dashboardUser) {

      dashboardUser.textContent =
        user.user_metadata?.full_name ||
        user.email ||
        "NexaCapital User";

    }

  }


  /* -----------------------------
     Logout
  ----------------------------- */

  document.querySelectorAll("[data-logout]")
    .forEach(function (button) {

      button.addEventListener("click", async function (event) {

        event.preventDefault();

        await supabase.auth.signOut();

        window.location.href =
          "index.html";

      });

    });

}
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_YOUR_KEY_HERE";
