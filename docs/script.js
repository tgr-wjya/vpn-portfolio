/*
  vpn-portfolio showcase scripts
  minimal js, maximum effect
*/

// code copy functionality
document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".code-copy");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const codeId = button.getAttribute("data-code");
      const codeElement = document.getElementById(codeId);

      if (!codeElement) return;

      try {
        await navigator.clipboard.writeText(codeElement.textContent);

        // visual feedback
        const originalText = button.textContent;
        button.textContent = "copied!";
        button.classList.add("copied");

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("failed to copy:", err);
        button.textContent = "failed";
        setTimeout(() => {
          button.textContent = "copy";
        }, 2000);
      }
    });
  });
});

// deployment status simulator
// because why not make it interactive
const deploymentStatuses = [
  { text: "click to simulate deploy", class: "" },
  { text: "terraform init...", class: "deploying" },
  { text: "terraform apply...", class: "deploying" },
  { text: "provisioning ec2...", class: "deploying" },
  { text: "configuring wireguard...", class: "deploying" },
  { text: "deployment complete!", class: "success" },
];

let currentStatusIndex = 0;
let deploymentTimeout = null;

const statusIndicator = document.getElementById("deployStatus");
const statusText = document.getElementById("statusText");
const deploymentStatus = document.querySelector(".deployment-status");

if (deploymentStatus && statusIndicator && statusText) {
  deploymentStatus.addEventListener("click", () => {
    // reset if already completed
    if (currentStatusIndex === deploymentStatuses.length - 1) {
      currentStatusIndex = 0;
      statusIndicator.className = "status-indicator";
      statusText.textContent = deploymentStatuses[0].text;
      return;
    }

    // start deployment simulation
    if (currentStatusIndex === 0) {
      simulateDeployment();
    }
  });
}

function simulateDeployment() {
  currentStatusIndex = 1;

  function nextStatus() {
    if (currentStatusIndex >= deploymentStatuses.length) {
      return;
    }

    const status = deploymentStatuses[currentStatusIndex];
    statusText.textContent = status.text;
    statusIndicator.className = `status-indicator ${status.class}`;

    currentStatusIndex++;

    if (currentStatusIndex < deploymentStatuses.length) {
      const delay =
        currentStatusIndex === deploymentStatuses.length - 1 ? 1500 : 800;
      deploymentTimeout = setTimeout(nextStatus, delay);
    }
  }

  nextStatus();
}

// clean up on page unload
window.addEventListener("beforeunload", () => {
  if (deploymentTimeout) {
    clearTimeout(deploymentTimeout);
  }
});

// subtle scroll animations for flow steps
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// observe flow steps
document.querySelectorAll(".flow-step").forEach((step, index) => {
  step.style.opacity = "0";
  step.style.transform = "translateY(20px)";
  step.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
  observer.observe(step);
});

/*
  that's it. no bloat.

  total js: ~2kb
  total dependencies: 0
  total frameworks: 0
  total unnecessary features: also 0

  keeping it simple.
*/
