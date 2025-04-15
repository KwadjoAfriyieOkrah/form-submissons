document.addEventListener("DOMContentLoaded", () => {
  const toggleIcon = document.querySelector(".toggle-icon");
  const form = document.querySelector(".collapsible-form");
  const submitButton = document.getElementById("submit-button");

  // Fixed URL (removed space)
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzzg45sNLumZPhsZpWKxa2XumgJmqwQuarlJ5Kkd_QjRlgbrQwv4hG8BR68a4nF2Z4dCQ/exec";

  // Toggle form visibility
  toggleIcon.addEventListener("click", () => {
    form.classList.toggle("expanded");
    toggleIcon.classList.toggle("rotated");
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // Create FormData object from the form
    const formData = new FormData(form);

    // Convert FormData to URL-encoded string
    const urlEncodedData = new URLSearchParams(formData).toString();

    // Add timeout
    const timeout = setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Sign Up";
      alert("Server is taking too long to respond. Please try again later.");
    }, 8000);

    fetch(scriptUrl, {
      method: "POST",
      body: urlEncodedData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        clearTimeout(timeout);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.text();
      })
      .then((data) => {
        console.log("Success! Response:", data);
        alert("Thank you! Your information has been submitted successfully.");
        form.reset();
        form.classList.remove("expanded");
        toggleIcon.classList.remove("rotated");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          `Submission failed: ${
            error.message || "Please check your connection and try again."
          }`
        );
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Sign Up";
      });
  });
});
